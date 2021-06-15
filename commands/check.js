const { diepServers } = require('./getserver');
const convertPartyToServerId = require('../util/convertPartyToServerId');

const idRegex = /^\d{18}$/;
const channelRegex = /<#(\d+)>/;
const emojiRegex = /<a?:.+?:(\d+)>/;

module.exports = {
    description: 'Checks last n messages in a given channel, for diep links that have expired without the given reacted emoji.',

    handler: ({ msg, args }) => {
        if (args.length !== 3) {
            return msg.lineReply('Usage: check last_n_messages \\#channel \\:expired_reaction_emoji\\:');
        }
        const lastN = parseInt(args[0]);
        const channelId = args[1].replace(channelRegex, '$1');
        const emojiId = args[2].replace(emojiRegex, '$1');

        if (isNaN(lastN)) {
            return msg.lineReply('last_n_messages must be a number');
        }
        if (lastN < 1 || lastN > 10) {
            return msg.lineReply('last_n_messages must be between 1 and 10 inclusive');
        }
        if (!idRegex.test(channelId)) return msg.lineReply('Invalid channel id');
        if (!idRegex.test(emojiId)) return msg.lineReply('Invalid emoji id');
        
        const channel = msg.guild.channels.cache.get(channelId);
        if (!channel) {
            return msg.lineReply(`Channel id ${channelId} does not exist`);
        }

        channel.messages.fetch({ limit: lastN }).then(messages => {
            const expiredList = [];
            messages.each(message => {
                if (!message.reactions.cache.get(emojiId)) {
                    const serverId = convertPartyToServerId(message.content);
                    if (serverId && !diepServers.getServerInfo(serverId)) {
                        expiredList.push(message.url);
                    }
                }
            });
            if (expiredList.length) {
                msg.lineReply('List of expired diep links:\n' + expiredList.join('\n'));
            } else {
                msg.lineReply('No expired diep links at the moment');
            }
        }).catch(() => msg.lineReplyNoMention(`An error occurred while tryiing to fetch messages in <#${channelId}>`));
    }
};
