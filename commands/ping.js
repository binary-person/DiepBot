const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Print bot latency.'),
	async execute(interaction) {
		await interaction.reply(`ping message latency is ${Date.now() - interaction.createdTimestamp}ms. API websocket latency is ${(interaction.client.ws.ping)}ms`);
	},
};
