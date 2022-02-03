const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('diepstats')
		.setDescription('Get the web app link for DiepStats.'),
	async execute(interaction) {
		await interaction.reply('https://diepstats.binary-person.dev');
	},
};
