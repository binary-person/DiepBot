const filterLobbies = require('../util/filterLobbies');
const getExpiredMessages = require('../util/getExpiredMessages');
const { routineCheckNotifyChannel, routineCheckNotifyRole } = require('../config.json');

let alreadyNotified = false;

module.exports = {
    crontab: '0 * * * *', // every hour
    runImmediately: false,

    handler: async ({ client }) => {
        const lobbyData = client.lobbyData;
        if (!lobbyData) return;
        if (interaction.client.shutupId) return;

        const { servers } = filterLobbies(lobbyData);
		const expiredMessages = await getExpiredMessages(client, servers);

        if (expiredMessages.length >= 2) {
            if (!alreadyNotified) {
                alreadyNotified = true;
                await client.channels.cache.get(routineCheckNotifyChannel).send(`Wake up wake up <@&${routineCheckNotifyRole}>! ${expiredMessages.length} server links have expired!\n${expiredMessages.map(msg => msg.url).join('\n')}`);
            }
        } else {
            if (alreadyNotified) {
                alreadyNotified = false;
                await client.channels.cache.get(routineCheckNotifyChannel).send(`It's ok now.`);
            }
        }
    }
};
