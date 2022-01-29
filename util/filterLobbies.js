const convertServerIdToParty = require('../util/convertServerIdToParty');

module.exports = function filterLobbies(lobbyData, gamemode, region) {
    const servers = [];
    let playerCount = 0;

    for (const eachGameMode of lobbyData.game_modes) {
        if (gamemode && gamemode !== eachGameMode.game_mode_name) {
            continue;
        }
        for (const eachRegion of eachGameMode.regions) {
            if (region && region !== eachRegion.region_name) {
                continue;
            }
            for (const eachLobby of eachRegion.lobbies) {
                playerCount += eachLobby.total_player_count;
                servers.push({
                    link: convertServerIdToParty(eachLobby.lobby_id),
                    gamemode: eachGameMode.game_mode_name,
                    region: eachRegion.region_name,
                    playerCount: eachLobby.total_player_count
                });
            }
        }
    }
    return { servers, playerCount };
}