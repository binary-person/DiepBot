const { SlashCommandBuilder } = require('@discordjs/builders');
const convertPartyToServerId = require('../util/convertPartyToServerId');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('get-diepstats-link')
		.setDescription('Links you to a site that shows you historical lobby data.')
		.addStringOption(option => option
			.setName('link')
			.setDescription('format: diep.io/#1234')
			.setRequired(true)),
	async execute(interaction) {
		const result = convertPartyToServerId(interaction.options.getString('link'));
		if (!result) {
			await interaction.reply('invalid party link');
			return;
		}
		await interaction.reply('DiepStats link: https://diepstats.binary-person.dev/lobbyLookup/' + result);
	},
};
