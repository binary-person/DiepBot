module.exports = {
    ownerOnly: true,
    handler: ({ msg, args, storage, bot }) => {
        if (args.length === 0) {
            return msg.lineReply('command usage: \\*eval string here\\*\nAvailable variables: msg, args, storage, bot');
        }
        if (args[0].startsWith('`')) args[0] = args[0].slice(1);
        if (args[args.length - 1].endsWith('`')) args[args.length - 1] = args[args.length - 1].slice(0, -1);
        try {
            msg.lineReply('Output:\n' + eval(args.join(' ')));
        }
        catch (e) {
            msg.lineReply('Error occurred:\n' + e.message);
        }
    }
};
