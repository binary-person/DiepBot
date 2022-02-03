const { SlashCommandBuilder } = require('@discordjs/builders');
const wordleList = require('../assets/wordleList');

const getRandom = arr => {
    return arr[Math.floor(arr.length * Math.random())];
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('wordle')
        .setDescription('Tools for your wordle fun!')
        .addSubcommand(cmd => cmd
            .setName('random-words')
            .setDescription('Get random words if you are out of ideas.')
            .addStringOption(option => option
                .setName('type')
                .setDescription('Wordlist to choose from')
                .addChoice('all', 'all')
                .addChoice('answer list', 'answer list')
                .addChoice('valid list', 'valid list')
                .setRequired(true))
            .addStringOption(option => option
                .setName('include-only')
                .setDescription('Only include if it contains the characters. ("abc" will only contain words containing a, b, and c)'))
            .addNumberOption(option => option
                .setName('number-of-words')
                .setDescription('Number of random words to get (default: 1, limit: 100)')
                .setMinValue(1)
                .setMaxValue(100)
                .setRequired(false)))
        .addSubcommand(cmd => cmd
            .setName('check-word')
            .setDescription('Checks if the word exists in the wordlists.')
            .addStringOption(option => option
                .setName('word')
                .setDescription('Word to check.')
                .setRequired(true)))
        .addSubcommand(cmd => cmd
            .setName('stats')
            .setDescription('Counts how big the wordlist is.')),
    async execute(interaction) {
        const cmd = interaction.options.getSubcommand();
        switch (cmd) {
            case 'random-words':
                const includeOnly = interaction.options.getString('include-only');
                const type = interaction.options.getString('type');
                let list = type === 'answer list' ? wordleList.answerList : (type === 'valid list' ? wordleList.validList : [...wordleList.answerList, wordleList.validList]);
                if (includeOnly) {
                    list = list.filter(word => {
                        for (const char of includeOnly) {
                            if (!word.includes(char)) return false;
                        }
                        return true;
                    });
                }
                if (list.length !== 0) {
                    await interaction.reply(Array(Math.max(Math.min(interaction.options.getNumber('number-of-words') || 1, 100), 1)).fill().map(e => getRandom(list)).join(', '));
                } else {
                    await interaction.reply('List is empty');
                }
                break;
            case 'check-word':
                const word = interaction.options.getString('word');
                if (wordleList.answerList.includes(word)) {
                    await interaction.reply(word + ' is in the answer list');
                } else if (wordleList.validList.includes(word)) {
                    await interaction.reply(word + ' is in the valid list');
                } else {
                    await interaction.reply('Given word is not in wordlelist.');
                }
                break;
            case 'stats':
                await interaction.reply(`${wordleList.answerList.length} words in the answer list\n${wordleList.validList.length} words in the valid list`);
                break;
            default:
                await interaction.reply(cmd + ' is not a valid subcommand');
        }
    },
};
