const DiepServerCollection = require('../util/DiepServerCollection');
const escapeDiscordMessage = require('../util/escapeDiscordMessage');

const unavailableMsg = `No links at this time. Sorry, I'm currently working really hard to get those party links. If this message still appears after 10 minutes, please contact my master.`;
const diepServers = new DiepServerCollection();

const partyToProperDiscordLink = party => `<https://${party}>`;

module.exports = {
    description: 'Fetches a random or a list of diep servers by gamemode and region',
    handler: ({ msg, args }) => {
        if (args.length !== 3) {
            return msg.lineReply('usage: getserver (all/random) gamemode region');
        }
        const allOrRandom = args[0];
        const gamemode = args[1];
        const region = args[2];
        if (allOrRandom !== 'all' && allOrRandom !== 'random') {
            return msg.lineReply('1st parameter must be either all or random, not ' + escapeDiscordMessage(allOrRandom));
        }
        if (!DiepServerCollection.gamemodes.includes(gamemode)) {
            return msg.lineReply(`invalid gamemode ${escapeDiscordMessage(gamemode)}.\nValid gamemodes are ${DiepServerCollection.gamemodes.join(', ')}`);
        }
        if (!DiepServerCollection.regions.includes(region)) {
            return msg.lineReply(`invalid region ${escapeDiscordMessage(region)}.\nValid regions are ${DiepServerCollection.regions.join(', ')}`);
        }
        if (allOrRandom === 'all') {
            const list = diepServers.getListByRegion(gamemode, region).map(partyToProperDiscordLink);
            msg.lineReply(list.length ? `List of ${gamemode} ${region} diep links:\n` + list.join('\n') : unavailableMsg);
        }
        else if (allOrRandom === 'random') {
            const partyLink = diepServers.pickRandomServer(gamemode, region);
            msg.lineReply(partyLink ? 'Here you go: ' + partyToProperDiscordLink(partyLink) : unavailableMsg);
        }
        else {
            throw new Error('This shouldn\'t be possible. allOrRandom: ' + allOrRandom);
        }
    }
};
