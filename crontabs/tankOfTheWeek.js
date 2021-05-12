const tankImages = require('../assets/tankImages');

module.exports = {
    crontab: '0 0 * * sun', // every Sunday
    runImmediately: true,

    handler: ({ bot, storage, firstRun }) => {
        for (const serverId of storage.iterateServerIds()) {
            const serverData = storage.getServerData(serverId);
            if (serverData.totw && (!firstRun || !serverData.totw.currentTank)) {
                const randomTank = tankImages.randomTank();
                serverData.totw.currentTank = randomTank.name;
                const channel = bot.channels.cache.get(serverData.totw.channelId);
                if (channel) {
                    channel.send(`This weeks Tank of the Week has been randomly selected, & that tank is... **${randomTank.name}!**`, { files: [randomTank.imageUrl] });
                }
                storage.setServerData(serverId, serverData);
            }
        }
    }
};
