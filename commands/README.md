# Commands

Any file ending with a `.js` will be taken as a module.

The following is an example of how to create a new command.

```js
module.exports = {
    name: 'ping', // omit this and the `command` in `command.js` will be used instead
    description: 'check latency', // optional
    adminOnly: false, // optional. if set to true, only people with the admin permission can modify the bot settings
    ownerOnly: false, // optional. this value should be reserved for highly sensitive commands

    // storage is an instance of the Storage class. See Storage.js
    // args is an array. so if $ was the prefix, entering `$ping arg  12 3 ` will have args be ['arg', '12', '3']
    handler: ({msg, args, storage, bot}) => {
        msg.reply('pong');
    }
};
```