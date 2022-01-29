const { SlashCommandBuilder } = require('@discordjs/builders');
const { regions, gamemodes } = require('../consts');
const filterLobbies = require('../util/filterLobbies');
const replyLongMessage = require('../util/replyLongMessage');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('get-diep-servers')
		.setDescription('Get server links sorted by player count optionally filtered by region/game mode.')
		.addStringOption(option => option
			.setName('gamemode')
			.setDescription('optionally filter by gamemode. valid values: ' + gamemodes.join(', '))
			.setChoices(gamemodes.map(gamemode => [gamemode, gamemode]))
			.setRequired(false))
		.addStringOption(option => option
			.setName('region')
			.setDescription('optionally filter by region. valid values: ' + regions.join(', '))
			.setChoices(regions.map(region => [region, region]))
			.setRequired(false))
		.addNumberOption(option => option
			.setName('limit')
			.setDescription('limit the servers shown. set to 0 to show all. default is 15')
			.setMinValue(0)
			.setRequired(false)),
	async execute(interaction) {
		const lobbyData = interaction.client.lobbyData;
		if (!lobbyData) {
			await interaction.reply('lobby api endpoint is down. contact my master if this keeps happening for more than a day');
			return;
		}

		const gamemode = interaction.options.getString('gamemode');
		const region = interaction.options.getString('region');
		let limit = interaction.options.getNumber('limit');

		const { servers, playerCount } = filterLobbies(lobbyData, gamemode, region);

		if (servers.length === 0) {
			await interaction.reply('there are strangely no servers currently');
			return;
		}
		if (!limit && limit !== 0) {
			limit = 15;
		}
		if (limit === 0) {
			limit = servers.length;
		}

		await replyLongMessage(servers
			.sort((a, b) => b.playerCount - a.playerCount)
			.slice(0, limit)
			.map(server => `(${server.gamemode} - ${server.region}) ${server.playerCount} players <https://${server.link}>`).join('\n')
			+ `\n\nServer count: ${servers.length}\nPlayer count: ${playerCount}`,
			msg => interaction.reply(msg), msg2 => interaction.followUp(msg2));
	},
};
