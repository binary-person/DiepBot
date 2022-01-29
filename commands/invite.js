const { SlashCommandBuilder } = require('@discordjs/builders');
const { clientId } = require('../private-config.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('invite')
		.setDescription('Invite me to your server.'),
	async execute(interaction) {
		await interaction.reply(`<https://discord.com/api/oauth2/authorize?client_id=${clientId}&permissions=0&scope=bot%20applications.commands>`);
	},
};
