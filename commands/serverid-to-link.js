const { SlashCommandBuilder } = require('@discordjs/builders');
const convertServerIdToParty = require('../util/convertServerIdToParty');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('serverid-to-link')
		.setDescription('Handy dev tool for converting server ids to links.')
		.addStringOption(option => option
			.setName('serverid')
			.setDescription('format: some-id-here')
			.setRequired(true)),
	async execute(interaction) {
		await interaction.reply('party link: ' + convertServerIdToParty(interaction.options.getString('serverid')));
	},
};
