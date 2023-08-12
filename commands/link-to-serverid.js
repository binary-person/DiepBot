const { SlashCommandBuilder } = require('@discordjs/builders');
const convertPartyToServerId = require('../util/convertPartyToServerId');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('link-to-serverid')
		.setDescription('Handy dev tool for converting links to server ids.')
		.addStringOption(option => option
			.setName('link')
		.setDescription('format: diep.io/?p=1234')
			.setRequired(true)),
	async execute(interaction) {
		const result = convertPartyToServerId(interaction.options.getString('link'));
		if (result && (result.includes('@') || result.includes('#'))) {
			await interaction.reply('what do you think you are doing >:(');
			return;
		}
		await interaction.reply('server id: ' + result);
	},
};
