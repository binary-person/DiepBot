module.exports = async function replyLongMessage(msg, sendMsg, subsequentSendMsgs) {
    let msgs = msg.split('\n');
    let currentMsg = '';
    for (const line of msgs) {
        if ((currentMsg + '\n' + line).length > 2000) {
            await sendMsg(currentMsg.trim());
            currentMsg = line;
            sendMsg = subsequentSendMsgs;
        } else {
            currentMsg += '\n' + line;
        }
    }
    await sendMsg(currentMsg.trim());
};
