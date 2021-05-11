const fs = require('fs');
const path = require('path');
const Discord = require('discord.js');
require('discord-reply');
const Storage = require('./util/Storage');
const config = require('./config.json');

const tokenFilePath = 'TOKEN.txt';
const ownerIdPath = 'OWNER_ID.txt';
const commandDir = 'commands/';
const validCommandRegex = /^[a-z0-9]+$/i;
const defaultPrefix = config.defaultPrefix; // intended to be an ascii representation of a basic tank

const bot = new Discord.Client();
const storage = new Storage();
const token = fs.existsSync(tokenFilePath) ? fs.readFileSync(path.join(__dirname, tokenFilePath), 'utf8').trim() : false;
const ownerId = fs.existsSync(ownerIdPath) ? fs.readFileSync(path.join(__dirname, ownerIdPath), 'utf8').trim() : false;
const commands = Object.create(null);
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
    if (['help'].includes(commandName)) {
      throw new Error(`the ${commandName} command is reserved`);
    }
    if (!commandModule || typeof commandModule.handler !== 'function') {
      throw new Error('module handler must be of type function');
    }
    if (commands[commandName]) {
      throw new Error(`Command ${commandName} already exists`);
    }
    commands[commandName] = commandModule;
  }
}

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

function msgHandler(msg, recursiveCall = false) {
  const serverData = storage.getServerData(msg.guild.id);
  const prefix = serverData.prefix || defaultPrefix;

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
      const commandsToList = Object.keys(commands).filter(cmd => !commands[cmd].adminOnly && !commands[cmd].ownerOnly);
      const replyMsg = '**Commands**\n' + commandsToList.join(', ');
      let descriptionMsg = '';
      for (const cmdToList of commandsToList) {
        if (commands[cmdToList].description) descriptionMsg += `${cmdToList} - ${commands[cmdToList].description}\n`;
      }
      return msg.lineReplyNoMention(replyMsg + (descriptionMsg ? '\n\n**Command descriptions**\n' + descriptionMsg : ''));
    }
    else if (commands[command] &&
      (!commands[command].adminOnly || (msg.member.hasPermission('ADMINISTRATOR') || (msg.author.id === ownerId && viewOwnerAsAdmin))) &&
      (!commands[command].ownerOnly || msg.author.id === ownerId)) {
      commands[command].handler({msg, args, storage, bot});
    }
    else if (serverData.aliases && serverData.aliases[command]) {
      const alias = serverData.aliases[command];
      if (alias.content !== 'prototype' && alias.content !== '__proto__' && alias.content !== 'constructor' && commands[alias.content] && recursiveCall !== true) { // recursiveCall as a precaution
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
