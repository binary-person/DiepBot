const { diepServers, partyToProperDiscordLink, unavailableMsg } = require('./getserver');
const convertServerIdToParty = require('../util/convertServerIdToParty');
const DiepServerCollection = require('../util/DiepServerCollection');
const escapeDiscordMessage = require('../util/escapeDiscordMessage');
const formatMS = require('../util/formatMS');

const gamemodeToRealName = {
    'ffa': 'FFA',
    'survival': 'Survival',
    'teams': '2 Teams',
    '4teams': '4 Teams',
    'dom': 'Domination',
    'tag': 'Tag',
    'maze': 'Maze',
    'sandbox': 'Sandbox'
};

module.exports = {
    description: 'Lists out every diep.io server including their uptime given gamemode',
    handler({ msg, args }) {
        if (args.length !== 1) {
            return msg.lineReply('usage: getallservers gamemode');
        }
        const gamemode = DiepServerCollection.findAlias(args[0]) || args[0];
        if (!DiepServerCollection.gamemodes.includes(gamemode)) {
            return msg.lineReply(`invalid gamemode ${escapeDiscordMessage(gamemode)}.\nValid gamemodes are ${DiepServerCollection.gamemodes.join(', ')}`);
        }
        const data = diepServers.data;
        if (Object.keys(data).length === 0 || Object.keys(data[gamemode]).length === 0) {
            return msg.lineReply(unavailableMsg);
        }


        const now = Date.now();
        let returnMsg = `__**All diep.io server links for ${gamemodeToRealName[gamemode]}**__\n\n`;
        for (const region in data[gamemode]) {
            for (const serverId in data[gamemode][region]) {
                returnMsg += `${partyToProperDiscordLink(convertServerIdToParty(serverId))}, ${region}, up for ${formatMS(now - data[gamemode][region][serverId].timeFirstSeen)}\n`;
            }
        }
        msg.lineReplyNoMention(returnMsg);
    }
};
