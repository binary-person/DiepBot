function convertPartyToServerId(partyLink) {
    // since ascii key codes between a to z always yield a hex with length of two, we
    // can assume with 4 characters for the server id, we need to only get the first 2 * 4 characters
    // of a party link
    const first8Chars = (partyLink.match(/diep\.io\/#(.{8})/i) || [])[1];
    if (!first8Chars) return null;
    return first8Chars.match(/../g).map(e => String.fromCharCode(parseInt(e.split('').reverse().join(''), 16))).join('');
}

module.exports = convertPartyToServerId;
