module.exports = {
    ownerOnly: true,
    handler: ({msg, args, storage}) => {
        if (args.length !== 2 || (args[0] !== 'server' && args[0] !== 'user')) {
            return msg.lineReply('command usage: (server/user) id');
        }
        const dumpData = storage.data[args[0]][args[1]];
        if (!dumpData) return msg.lineReply('does not exist');
        msg.lineReply(`here you go master:\n\`\`\`json\n${JSON.stringify(dumpData, null, 4)}\`\`\``);
    }
};
