const tankImages = require('../assets/tankImages');
const { tankOfTheWeekChannelId } = require('../config.json');

module.exports = {
    crontab: '0 4 * * sun', // every Sunday 4am utc
    runImmediately: false,

    handler: ({ client }) => {
        const randomTank = tankImages.randomTank();
        client.channels.cache.get(tankOfTheWeekChannelId).send(`This weeks Tank of the Week has been randomly selected, & that tank is... **${randomTank.name}!**`, { files: [randomTank.imageUrl] });;
    }
};
