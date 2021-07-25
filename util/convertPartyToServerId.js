function convertPartyToServerId(partyLink) {
    // since ascii key codes between a to z always yield a hex with length of two, we
    // can assume it has to be even
    const reversedHexId = (partyLink.match(/diep\.io\/#(.+?(?=00))/i) || [])[1];
    if (!reversedHexId || reversedHexId.length % 2 !== 0) return null;
    return reversedHexId.match(/../g).map(e => String.fromCharCode(parseInt(e.split('').reverse().join(''), 16))).join('');
}

module.exports = convertPartyToServerId;
