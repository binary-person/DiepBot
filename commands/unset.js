module.exports = {
    adminOnly: true,
    handler: ({msg, args, storage}) => {
        if (args.length === 0) {
            return msg.lineReply('available settings: prefix, alias');
        }
        const serverData = storage.getServerData(msg.guild.id);
        switch(args[0]) {
            case 'prefix':
                if (args.length !== 2) return msg.lineReply('must contain no arguments');
                delete serverData.prefix;
                storage.setServerData(msg.guild.id, serverData);
                msg.lineReply('successfully unset prefix');
                break;
            case 'alias':
                if (args.length !== 2) return msg.lineReply('must contain one argument for specifying the alias command');
                if (!serverData.aliases) serverData.aliases = {};
                const aliasCommand = args[1];
                if (aliasCommand === 'constructor' || aliasCommand === 'prototype' || aliasCommand === '__proto__') {
                    return msg.lineReply('What do you think you\'re doing >:(');
                }
                if (!serverData.aliases[aliasCommand]) return msg.lineReply(`the alias ${aliasCommand} does not exist`);
                delete serverData.aliases[aliasCommand];
                if (Object.keys(serverData.aliases).length === 0) delete serverData.aliases;
                storage.setServerData(msg.guild.id, serverData);
                msg.lineReply('successfully unset alias ' + aliasCommand);
                break;
            default:
                msg.lineReply('cannot find setting: ' + args[0]);
        }
    }
};
