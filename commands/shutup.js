const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('shutup')
		.setDescription('Stops bot from sending alert messages.')
		.addNumberOption(option => option
			.setName('for')
			.setDescription('in hours')
			.setMinValue(0)
			.setRequired(true))
		.setDefaultPermission(false),
	async execute(interaction) {
		const hours = interaction.options.getNumber('for');

		clearTimeout(interaction.client.shutupId || -1);
		interaction.client.shutupId = setTimeout(() => {
			interaction.client.shutupId = null;
		}, 1000 * 60 * 60 * hours);

		await interaction.reply('Ok! I will stop sending alert messages for the next ' + hours + (hours === 1 ? ' hour.' : ' hours.'));
	},
};
