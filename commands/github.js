const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('github')
		.setDescription('Get the public open-source GitHub repo for this bot.'),
	async execute(interaction) {
		await interaction.reply('https://github.com/binary-person/DiepBot');
	},
};
