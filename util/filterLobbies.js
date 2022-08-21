const convertServerIdToParty = require('../util/convertServerIdToParty');

module.exports = function filterLobbies(lobbyData, gamemode, region) {
    const servers = [];
    let playerCount = 0;

    for (const eachLobby of lobbyData.lobbies) {
        if ((gamemode && eachLobby.game_mode_id !== gamemode) || (region && eachLobby.region_id !== region)) {
            continue;
        }
        playerCount += eachLobby.total_player_count;
        servers.push({
            link: convertServerIdToParty(eachLobby.lobby_id),
            gamemode: eachLobby.game_mode_id,
            region: eachLobby.region_id,
            playerCount: eachLobby.total_player_count
        });
    }
    return { servers, playerCount };
}