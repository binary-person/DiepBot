module.exports = {
    handler: ({msg, bot}) => {
        msg.lineReply(`ping message latency is ${Date.now() - msg.createdTimestamp}ms. API websocket latency is ${(bot.ws.ping)}ms`);
    }
};
