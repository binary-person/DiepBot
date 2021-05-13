const formatMS = require('../util/formatMS');

const serverStartTime = Date.now();

module.exports = {
    handler: ({msg}) => {
        msg.lineReply('server uptime: ' + formatMS(Date.now() - serverStartTime));
    }
};
