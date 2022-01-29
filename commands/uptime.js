const { SlashCommandBuilder } = require('@discordjs/builders');
const formatMS = require('../util/formatMS');

const serverStartTime = Date.now();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('uptime')
		.setDescription('Shows bot current uptime.'),
	async execute(interaction) {
		await interaction.reply('Bot uptime: ' + formatMS(Date.now() - serverStartTime));
	},
};
