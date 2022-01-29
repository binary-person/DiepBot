const { checkChannelId, checkReactEmojiId } = require('../config.json');

module.exports = async function getExpiredMessages(client, servers) {
    const serverExists = partyLink => {
        for (const server of servers) {
            if (partyLink.includes(server.link)) {
                return true;
            }
        }
        return false;
    };

    const expiredMessages = [];
    const messages = await client.channels.cache.get(checkChannelId).messages.fetch({ limit: 10 });
    for (const [,message] of messages) {
        if (!message.reactions.cache.get(checkReactEmojiId) && message.content.includes('diep.io/#') && !serverExists(message.content)) {
            expiredMessages.push(message);
        }
    }

    return expiredMessages;
};
