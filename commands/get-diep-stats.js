const { SlashCommandBuilder } = require('@discordjs/builders');
const filterLobbies = require('../util/filterLobbies');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('get-diep-stats')
		.setDescription('Get player and server count.'),
	async execute(interaction) {
		const lobbyData = interaction.client.lobbyData;
		if (!lobbyData) {
			await interaction.reply('lobby api endpoint is down. contact my master if this keeps happening for more than a day');
			return;
		}

		const { servers, playerCount } = filterLobbies(lobbyData);

		await interaction.reply(`Total servers: ${servers.length}\nTotal players: ${playerCount}`);
	},
};
