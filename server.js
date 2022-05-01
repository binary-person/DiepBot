require('./deploy-commands.js');

const fs = require('fs');
const path = require('path');

const cron = require('node-cron');
const { Client, Collection, Intents } = require('discord.js');

const { token, ownerId } = require('./private-config.js');
const { modRoleId, guildId } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

// initialize crontabs
const cronDir = 'crontabs/';
const cronsToRunImmediately = [];
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
        cron.schedule(cronModule.crontab, () => cronModule.handler({ client, firstRun: false }));
        if (cronModule.runImmediately) cronsToRunImmediately.push(() => cronModule.handler({ client, firstRun: true }));
    }
}

client.once('ready', async () => {
    // console.log('Setting command permissions');
    // const commands = await client.guilds.cache.get(guildId).commands.fetch();
    // for (const [, cmd] of commands) {
    //     if (cmd.defaultPermission === false) {
    //         await cmd.permissions.set({
    //             permissions: [{
    //                 id: modRoleId,
    //                 type: 'ROLE',
    //                 permission: true
    //             }, {
    //                 id: ownerId,
    //                 type: 'USER',
    //                 permission: true
    //             }]
    //         });
    //     }
    // };
    console.log('Running startup crontabs');
    for (const eachCron of cronsToRunImmediately) eachCron();
    console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.deferred || interaction.replied) {
            interaction.editReply('An error occurred while processing this command.');
        } else {
            return interaction.reply('There was an error while executing this command.');
        }
    }
});

client.login(token);
