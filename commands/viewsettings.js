module.exports = {
    adminOnly: true,
    handler: ({msg, args, storage}) => {
        const serverData = storage.getServerData(msg.guild.id);
        let reply = '**Current settings**\n';

        const formatting = {
            channelId: id => `<#${id}>`
        };

        /*
        prefix: str
        
        aliases:
            sayHi:
                content: 'hi',
                reply: false

        totw:
            channelId: 'channelid'
        */
        let currentIndent = '';
        const traverseThroughObject = obj => {
            for (const prop in obj) {
                reply += currentIndent + prop + ':';
                if (typeof obj[prop] === 'object' && obj[prop] !== null) {
                    currentIndent += '    ';
                    reply += '\n';
                    traverseThroughObject(obj[prop]);
                }
                else {
                    reply += ' ' + (formatting[prop] ? formatting[prop](obj[prop]) : obj[prop]);
                }
                reply += '\n';
            }
            currentIndent = currentIndent.slice(4);
        };
        traverseThroughObject(serverData);

        msg.lineReplyNoMention(reply);
    }
};
