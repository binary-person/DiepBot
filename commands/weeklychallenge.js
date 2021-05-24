module.exports = {
    handler: ({ msg, args, storage }) => {
        const serverData = storage.getServerData(msg.guild.id);
        if (!serverData.weeklyChallenge) return msg.lineReply('The weekly challenge channel has not yet been set. Please contact an admin to set it for you.');
        if (!serverData.weeklyChallenge.currentChallenge) return msg.lineReply('There is currently no weekly challenge. Please check back on Sunday or whenever this bot restarts.');
        msg.channel.send(serverData.weeklyChallenge.currentChallenge);
    }
};
