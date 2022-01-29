const { SlashCommandBuilder } = require('@discordjs/builders');
const pjson = require('../package.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('version')
		.setDescription('Shows bot current version.'),
	async execute(interaction) {
		await interaction.reply(`DiepBot v${pjson.version}`);
	},
};
