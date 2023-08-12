function convertServerIdToParty(serverid) {
    // return 'diep.io/#' + serverid.split('').map(char => char.charCodeAt(0).toString(16).split('').reverse().join('')).join('').toUpperCase();
    return 'diep.io/?p=' + serverid.replace(/-/g, '');
}

module.exports = convertServerIdToParty;
