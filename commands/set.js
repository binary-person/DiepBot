const idRegex = /^\d{18}$/
const channelRegex = /<#(\d+)>/;

module.exports = {
    adminOnly: true,
    handler: ({msg, args, storage, bot}) => {
        if (args.length === 0) {
            return msg.lineReply('available settings: prefix, alias, totwChannel, weeklyChallengeChannel');
        }
        const serverData = storage.getServerData(msg.guild.id);
        switch(args[0]) {
            case 'prefix':
                if (args.length !== 2) return msg.lineReply('must provide a prefix without spaces');
                serverData.prefix = args[1];
                storage.setServerData(msg.guild.id, serverData);
                msg.lineReply('successfully changed prefix to ' + serverData.prefix);
                break;
            case 'alias':
                if (args.length < 4) return msg.lineReply('must provide three arguments where shouldReply is either true or false: shouldReply aliasCommand message_without_double_spaces' +
                                                            '\nnote that if message_without_double_spaces equals one of the existing commands, it will be an alias for that command instead of sending a message');
                if (args[1] !== 'true' && args[1] !== 'false') return msg.lineReply('shouldReply must be true or false, not ' + args[1]);
                if (!serverData.aliases) serverData.aliases = {};
                const shouldReply = args[1] === 'true';
                const aliasCommand = args[2];
                const message = args.slice(3).join(' '); // only limitation is that messages with double spaces won't work
                if (aliasCommand === 'constructor' || aliasCommand === 'prototype' || aliasCommand === '__proto__') {
                    return msg.lineReply('What do you think you\'re doing >:(');
                }
                serverData.aliases[aliasCommand] = {
                    content: message,
                    reply: shouldReply
                };
                storage.setServerData(msg.guild.id, serverData);
                msg.lineReply('successfully set alias ' + aliasCommand);
                break;
            case 'totwChannel':
                if (args.length !== 2) return msg.lineReply('must provide ID of channel or <#channelid>');
                const totwChannel = args[1].replace(channelRegex, '$1');
                if (!idRegex.test(totwChannel)) return msg.lineReply('Invalid channel id ' + totwChannel);
                if (!msg.guild.channels.cache.find(channel => channel.id === totwChannel)) {
                    return msg.lineReply('Channel does not exist');
                }

                if (!serverData.totw) serverData.totw = {};
                serverData.totw.channelId = totwChannel;
                storage.setServerData(msg.guild.id, serverData);
                msg.lineReply(`successfully set totwChannel to <#${serverData.totw.channelId}>`);
                break;
            case 'weeklyChallengeChannel':
                if (args.length !== 2) return msg.lineReply('must provide ID of channel or <#channelid>');
                const weeklyChallengeChannel = args[1].replace(channelRegex, '$1');
                if (!idRegex.test(weeklyChallengeChannel)) return msg.lineReply('Invalid channel id ' + weeklyChallengeChannel);
                if (!msg.guild.channels.cache.find(channel => channel.id === weeklyChallengeChannel)) {
                    return msg.lineReply('Channel does not exist');
                }

                if (!serverData.weeklyChallenge) serverData.weeklyChallenge = {};
                serverData.weeklyChallenge.channelId = weeklyChallengeChannel;
                storage.setServerData(msg.guild.id, serverData);
                msg.lineReply(`successfully set weeklyChallengeChannel to <#${serverData.weeklyChallenge.channelId}>`);
                break;
            default:
                msg.lineReply('cannot find setting: ' + args[0]);
        }
    }
};
