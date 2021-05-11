module.exports = {
    handler: ({msg, storage}) => {
        const serverData = storage.getServerData(msg.guild.id);
        const aliases = Object.keys(serverData.aliases || {});
        if (aliases.length) {
            msg.lineReply(`List of aliases: \n\`\`\`${aliases.join(', ')}\`\`\``);
        }
    }
};
