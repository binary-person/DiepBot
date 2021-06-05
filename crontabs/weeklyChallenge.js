const weeklyChallenges = require('../assets/weeklyChallenges');

module.exports = {
    crontab: '0 4 * * sun', // every Sunday 4am utc
    runImmediately: true,

    handler: ({ bot, storage, firstRun }) => {
        for (const serverId of storage.iterateServerIds()) {
            const serverData = storage.getServerData(serverId);
            if (serverData.weeklyChallenge && (!firstRun || !serverData.weeklyChallenge.currentChallenge)) {
                const randomChallenge = weeklyChallenges.pullRandom();
                serverData.weeklyChallenge.currentChallenge = randomChallenge;
                const channel = bot.channels.cache.get(serverData.weeklyChallenge.channelId);
                if (channel) {
                    channel.send(randomChallenge);
                }
                storage.setServerData(serverId, serverData);
            }
        }
    }
};
