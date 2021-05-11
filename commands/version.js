const pjson = require('../package.json');

module.exports = {
    handler: ({msg}) => msg.lineReply(`DiepBot v${pjson.version}`)
};
