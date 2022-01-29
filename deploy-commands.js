require('dotenv').config();

const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { guildId } = require('./config.json');
const { token, clientId } = require('./private-config.js');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

if (process.env.D_DEVELOPMENT === '1') {
    console.log('Development flag set. Only setting commands for guild ' + guildId);
    rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
        .then(() => console.log('Successfully registered application commands in guild ' + guildId))
        .catch(console.error);
} else {
    rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands.filter(cmd => cmd.default_permission !== undefined) })
        .then(() => console.log('Successfully registered specific application commands in guild ' + guildId))
        .catch(console.error);
    rest.put(Routes.applicationCommands(clientId), { body: commands.filter(cmd => cmd.default_permission === undefined) })
        .then(() => console.log('Successfully registered global application commands'))
        .catch(console.error);
}
