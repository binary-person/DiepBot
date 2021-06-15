const fs = require('fs');
const path = require('path');
const cron = require('node-cron');
const Discord = require('discord.js');
require('discord-reply');
const Storage = require('./util/Storage');
const config = require('./config.json');

const tokenFilePath = 'TOKEN.txt';
const ownerIdPath = 'OWNER_ID.txt';
const commandDir = 'commands/';
const cronDir = 'crontabs/';
const validCommandRegex = /^[a-z0-9]+$/i;
const defaultPrefix = config.defaultPrefix; // intended to be an ascii representation of a basic tank

const bot = new Discord.Client();
const storage = new Storage();
const token = fs.existsSync(tokenFilePath) ? fs.readFileSync(path.join(__dirname, tokenFilePath), 'utf8').trim() : false;
const ownerId = fs.existsSync(ownerIdPath) ? fs.readFileSync(path.join(__dirname, ownerIdPath), 'utf8').trim() : false;
const commands = Object.create(null);
const cronsToRunImmediately = [];
let viewOwnerAsAdmin = false;

if (!token) {
  console.error('Please put your bot token in ' + tokenFilePath);
  process.exit(1);
}

// initialize commands
for (const eachModuleFile of fs.readdirSync(commandDir)) {
  if (eachModuleFile.endsWith('.js') && eachModuleFile !== '.js') {
    const commandModule = require(path.join(__dirname, commandDir, eachModuleFile));
    const commandName = commandModule.name || eachModuleFile.slice(0, -3);
    if (!validCommandRegex.test(commandName)) {
      throw new Error(`Invalid command name ${commandName}. Must match regex ${validCommandRegex}`);
    }
    if (['help', 'helpadmin', 'helpowner'].includes(commandName)) {
      throw new Error(`the ${commandName} command is reserved`);
    }
    if (!commandModule || typeof commandModule.handler !== 'function') {
      throw new Error(`module handler for ${commandName} must be of type function`);
    }
    if (commands[commandName]) {
      throw new Error(`Command ${commandName} already exists`);
    }
    commands[commandName] = commandModule;
  }
}

// initialize crontabs
for (const eachModuleFile of fs.readdirSync(cronDir)) {
  if (eachModuleFile.endsWith('.js') && eachModuleFile !== '.js') {
    const cronModule = require(path.join(__dirname, cronDir, eachModuleFile));
    const cronName = eachModuleFile.slice(0, -3);
    if (!cronModule || typeof cronModule.handler !== 'function') {
      throw new Error(`handler for cron module ${cronName} must be a function`);
    }
    if (!cronModule.crontab) {
      throw new Error(`cron module for ${cronName} must have a crontab`);
    }
    cron.schedule(cronModule.crontab, () => cronModule.handler({bot, storage, firstRun: false}));
    if (cronModule.runImmediately) cronsToRunImmediately.push(() => cronModule.handler({bot, storage, firstRun: true}));
  }
}

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
  for (const eachCron of cronsToRunImmediately) eachCron();
});

function msgHandler(msg, recursiveCall = false) {
  const serverData = storage.getServerData(msg.guild.id);
  const prefix = serverData.prefix || defaultPrefix;

  const isAdmin = () => msg.member.hasPermission('ADMINISTRATOR') || (msg.author.id === ownerId && viewOwnerAsAdmin);
  const isOwner = () => msg.author.id === ownerId;

  // for debugging purposes
  if (msg.content === 'oh bot oh bot oh bot. kneel before me your divine creator.' && msg.author.id === ownerId) {
    viewOwnerAsAdmin = !viewOwnerAsAdmin;
    return msg.lineReply(`I ${viewOwnerAsAdmin ? 'will' : 'will not'} kneel before you`);
  }

  if (msg.content.length > prefix.length && msg.content.startsWith(prefix)) {
    const splitCommand = msg.content.split(' ').filter(e => !!e); // filter to get rid of extra spaces
    const command = splitCommand[0].slice(prefix.length);
    const args = splitCommand.slice(1);
    if (command === 'help') {
      const abilityToListAdminCommands = isAdmin() || isOwner();
      const commandsToList = Object.keys(commands).filter(cmd => {
        switch(abilityToListAdminCommands ? args[0] : '') {
          case 'admin':
            return commands[cmd].adminOnly;
          case 'owner':
            return commands[cmd].ownerOnly;
          default:
            return !commands[cmd].adminOnly && !commands[cmd].ownerOnly;
        }
      });
      const replyMsg = '**Commands**\n' + commandsToList.join(', ');
      let descriptionMsg = '';
      for (const cmdToList of commandsToList) {
        if (commands[cmdToList].description) descriptionMsg += `${cmdToList} - ${commands[cmdToList].description}\n`;
      }
      return msg.lineReplyNoMention(replyMsg + (descriptionMsg ? '\n\n**Command descriptions**\n' + descriptionMsg : ''));
    }
    else if (commands[command] &&
      (!commands[command].adminOnly || isAdmin()) &&
      (!commands[command].ownerOnly || isOwner())) {
      commands[command].handler({msg, args, storage, bot});
    }
    else if (serverData.aliases && serverData.aliases[command]) {
      const alias = serverData.aliases[command];
      if (alias.content !== 'prototype' && alias.content !== '__proto__' && alias.content !== 'constructor' && commands[alias.content.split(' ')[0]] && recursiveCall !== true) { // recursiveCall as a precaution
        // alias command
        msg.content = prefix + alias.content + ' ' + args.join(' ');
        msgHandler(msg, true);
      }
      else {
        // alias message
        if (alias.reply) msg.lineReply(alias.content);
        else msg.channel.send(alias.content);
      }
    }
  }
}

bot.on('message', msgHandler);

bot.login(token);
