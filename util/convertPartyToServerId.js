function convertPartyToServerId(partyLink) {
    // // since ascii key codes between a to z always yield a hex with length of two, we
    // // can assume it has to be even
    // const reversedHexId = (partyLink.replace(/00.*/, '').match(/diep\.io\/#(.+)/i) || [])[1];
    // if (!reversedHexId || reversedHexId.length % 2 !== 0) return null;
    // return reversedHexId.match(/../g).map(e => String.fromCharCode(parseInt(e.split('').reverse().join(''), 16))).join('');

    // sample id: 3a79c812-e8d5-45f3-860d-2770f51bba28
    const rawId = (partyLink.match(/[a-f0-9]{8}[a-f0-9]{4}[a-f0-9]{4}[a-f0-9]{4}[a-f0-9]{12}/) || [])[0];
    if (!rawId) return null;
    return `${rawId.slice(0, 8)}-${rawId.slice(8, 12)}-${rawId.slice(12, 16)}-${rawId.slice(16, 20)}-${rawId.slice(20, 32)}`
}

module.exports = convertPartyToServerId;
