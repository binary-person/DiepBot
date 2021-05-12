const tankImages = require('../assets/tankImages');

module.exports = {
    handler: ({ msg, args, storage }) => {
        const serverData = storage.getServerData(msg.guild.id);
        if (!serverData.totw) return msg.lineReply('Tank of the week channel has not yet been set. Please contact an admin to set it for you.');
        if (!serverData.totw.currentTank) return msg.lineReply('There is currently no Tank of the Week. Please check back on Sunday or whenever this bot restarts.');
        msg.channel.send(`Tank of the week: **${serverData.totw.currentTank}**`, { files: [tankImages.rawData[serverData.totw.currentTank]] });
    }
};
