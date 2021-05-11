module.exports = msgTxt => '`' + (msgTxt.replace(/`/g, '') || ' ') + '`';
