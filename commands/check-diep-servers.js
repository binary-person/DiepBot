const { SlashCommandBuilder } = require('@discordjs/builders');
const filterLobbies = require('../util/filterLobbies');
const { checkReactEmojiId } = require('../config.json');
const getExpiredMessages = require('../util/getExpiredMessages');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('check-diep-servers')
		.setDescription('Checks the last 10 messages and reacts with a role if it is down.')
		.setDefaultPermission(true), // restrict use only within guildId (deploy-commands.js)
	async execute(interaction) {
		const lobbyData = interaction.client.lobbyData;
		if (!lobbyData) {
			await interaction.reply('lobby api endpoint is down. contact my master if this keeps happening for more than a day');
			return;
		}

		const { servers } = filterLobbies(lobbyData);
		const expiredMessages = await getExpiredMessages(interaction.client, servers);
		expiredMessages.forEach(msg => {
            msg.react(checkReactEmojiId);
		});

		if (expiredMessages.length === 0) {
			await interaction.reply('No expired links at the moment!');
		} else {
			await interaction.reply('List of expired diep links:\n' + expiredMessages.map(msg => msg.url).join('\n'));
		}
	},
};
