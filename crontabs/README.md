# Crontabs

Any file ending with a `.js` will be taken as a module. This is used for repeating tasks.

The following is an example of how to create a new crontab.

```js
module.exports = {
    crontab: '* * * * *', // this will run every minute
    runImmediately: true, // optional. this will run as soon as the bot is initialized

    // storage is an instance of the Storage class. See Storage.js
    // firstRun is true if handler is run immediately
    handler: ({bot, storage, firstRun}) => {
        bot.channels.cache.get('channelid').send('This gets sent every minute');
    }
};
```