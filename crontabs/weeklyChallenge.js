const weeklyChallenges = require('../assets/weeklyChallenges');
const { weeklyChallengeChannelId } = require('../config.json');

module.exports = {
    crontab: '0 4 * * sun', // every Sunday 4am utc
    runImmediately: false,

    handler: ({ client }) => {
        const randomChallenge = weeklyChallenges.pullRandom();
        client.channels.cache.get(weeklyChallengeChannelId).send(randomChallenge);
    }
};
