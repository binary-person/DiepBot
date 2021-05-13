const { diepServers, partyToProperDiscordLink } = require('./getserver');
const convertPartyToServerId = require('../util/convertPartyToServerId');
const convertServerIdToParty = require('../util/convertServerIdToParty');
const formatMS = require('../util/formatMS');

const gamemodeToCommonName = {
    teams: '2tdm',
    '4teams': '4tdm'
};

module.exports = {
    description: 'Given a party link, gives you the gamemode, region, and uptime (aka, how long the party link has been active for)',
    handler({ msg, args }) {
        if (args.length !== 1) {
            return msg.lineReply('usage: getserverinfo diep.io/#partylinkhere');
        }
        const serverId = convertPartyToServerId(args[0]);
        if (!serverId) return msg.lineReply('Invalid party link');
        const info = diepServers.getServerInfo(serverId);
        if (!info) return msg.lineReply('Party link does not exist');

        msg.lineReply(`${partyToProperDiscordLink(convertServerIdToParty(serverId))} ${gamemodeToCommonName[info.gamemode] || info.gamemode} ${info.region} has been active for ${formatMS(info.uptime)}`);
    }
};
