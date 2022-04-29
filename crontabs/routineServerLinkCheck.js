const tankImages = require('../assets/tankImages');
const filterLobbies = require('../util/filterLobbies');
const getExpiredMessages = require('../util/getExpiredMessages');
const { routineCheckNotifyChannel, routineCheckNotifyRole } = require('../config.json');

let alreadyNotified = false;

module.exports = {
    crontab: '6 * * * *', // every 6 hour
    runImmediately: false,

    handler: async ({ client }) => {
        const lobbyData = client.lobbyData;
        if (!lobbyData) return;

        const { servers } = filterLobbies(lobbyData);
		const expiredMessages = await getExpiredMessages(client, servers);

        if (expiredMessages.length >= 2 && !alreadyNotified) {
            await client.channels.cache.get(routineCheckNotifyChannel).send(`Wake up wake up <@&${routineCheckNotifyRole}>! ${expiredMessages.length} server links have expired!\n${expiredMessages.map(msg => msg.url).join('\n')}`);
            alreadyNotified = true;
        } else {
            alreadyNotified = false;
        }
    }
};
