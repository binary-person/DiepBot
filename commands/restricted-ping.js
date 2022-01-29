const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('restricted-ping')
		.setDescription('Replies with Pong!')
		.setDefaultPermission(false),
	async execute(interaction) {
		await interaction.reply('Noot noot.');
	},
};
