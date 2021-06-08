const fs = require('fs');
const fetch = require('node-fetch');
const convertServerIdToParty = require('./convertServerIdToParty');

const cacheFilePath = 'cached_servers.json';
const arrayToPartyLinks = arr => arr.map(serverId => convertServerIdToParty(serverId));

class DiepServerCollection {
    static regions = ['amsterdam', 'la', 'miami', 'singapore', 'sydney'];
    static gamemodes = ['ffa', 'survival', 'teams', '4teams', 'dom', 'tag', 'maze', 'sandbox'];
    static gamemodeAliases = {
        'tdm': 'teams',
        '2tdm': 'teams',
        '4tdm': '4teams',
        'sbx': 'sandbox'
    };
    static findAlias(alias) {
        const keys = Object.keys(DiepServerCollection.gamemodeAliases); // another way of avoiding hitting sensitive props like __proto__
        if (!keys.includes(alias)) return null;
        return DiepServerCollection.gamemodeAliases[alias];
    }

    apiEndpoint = 'https://api.n.m28.io';
    fetchInterval = -1;
    data = {};
    /*
    data = {
        teams: {
            miami: {
                bc12: { timeFirstSeen: Date.now(), existCurrentCycle: true }
            }
        }
    };
    */

    constructor(fetchTimeout = 60000 * 5) {
        if (fs.existsSync(cacheFilePath)) this.data = JSON.parse(fs.readFileSync(cacheFilePath, 'utf8'));
        this.fetchServers();
        setInterval(() => this.fetchServers(), fetchTimeout);
    }


    getAll() {
        let serverIDs = [];
        for (const gamemode in this.data) {
            for (const eachRegion in this.data[gamemode]) {
                serverIDs = serverIDs.concat(Object.keys(this.data[gamemode][eachRegion]));
            }
        }
        return arrayToPartyLinks(serverIDs);
    }
    getList(gamemode) {
        if (!this.data[gamemode]) return [];
        let serverIDs = [];
        for (const eachRegion in this.data[gamemode]) {
            if (this.data[gamemode][eachRegion].length !== 0) {
                serverIDs = serverIDs.concat(Object.keys(this.data[gamemode][eachRegion]));
            }
        }
        return arrayToPartyLinks(serverIDs);
    }
    getListByRegion(gamemode, region) {
        if (!this.data[gamemode] || !this.data[gamemode][region]) return [];
        return arrayToPartyLinks(Object.keys(this.data[gamemode][region]));
    }
    pickRandomServer(gamemode = null, region = null) {
        const partyLinks = gamemode === null ? this.getAll() : (region === null ? this.getList(gamemode) : this.getListByRegion(gamemode, region));
        if (partyLinks.length === 0) return null;
        return partyLinks[Math.floor(partyLinks.length * Math.random())];
    }

    traverseEachServer(callback) {
        for (const gamemode in this.data) {
            for (const region in this.data[gamemode]) {
                for (const serverId in this.data[gamemode][region]) {
                    if (callback(this.data[gamemode][region][serverId], serverId, region, gamemode) === false) return;
                }
            }
        }
    }

    getServerInfo(serverId) {
        if (!serverId) return null;
        let info = null;
        this.traverseEachServer((obj, currentServerId, region, gamemode) => {
            if (currentServerId === serverId) {
                info = {
                    uptime: Date.now() - obj.timeFirstSeen, // can only be as accurate as the fetchTimeout and how long the bot has been running for
                    region,
                    gamemode
                };
                return false;
            }
        });
        return info;
    }

    async fetchServers(fetches = 30) {
        this.traverseEachServer(obj => obj.existsCurrentCycle = false);
        for (let i = 0; i < fetches; i++) { // each fetch cycle takes approximately 1 second
            for (const eachGameMode of DiepServerCollection.gamemodes) {
                if (!this.data[eachGameMode]) this.data[eachGameMode] = {};
                const response = await (await fetch(`${this.apiEndpoint}/endpoint/diepio-${eachGameMode}/findEach/`)).json();
                for (const serverRegion in response.servers) {
                    const serverId = response.servers[serverRegion].id;
                    const region = serverRegion.split('-')[1]; // turn vultr-amsterdam into amsterdam
                    if (!this.data[eachGameMode][region]) this.data[eachGameMode][region] = {};

                    if (!this.data[eachGameMode][region][serverId]) {
                        this.data[eachGameMode][region][serverId] = { timeFirstSeen: Date.now(), existsCurrentCycle: true };
                    }
                    else {
                        this.data[eachGameMode][region][serverId].existsCurrentCycle = true;
                    }
                }
            }
        }
        this.traverseEachServer((obj, serverId, region, gamemode) => {
            if (!obj.existsCurrentCycle) {
                delete this.data[gamemode][region][serverId];
            }
            else {
                delete obj.existsCurrentCycle;
            }
        });
        this.saveCache();
    }
    saveCache() {
        fs.writeFileSync(cacheFilePath, JSON.stringify(this.data), 'utf8');
    }
    stopFetchInterval() {
        if (this.fetchInterval === -1) throw new TypeError('fetchInterval has already been stopped');
        clearInterval(this.fetchInterval);
        this.fetchInterval = -1;
    }
}

// make sure aliases exist and there's no typos
for (const eachAlias in DiepServerCollection.gamemodeAliases) {
    if (!DiepServerCollection.gamemodes.includes(DiepServerCollection.gamemodeAliases[eachAlias])) {
        throw new TypeError(`Cannot find alias ${eachAlias} to ${DiepServerCollection.gamemodeAliases[eachAlias]}`);
    }
}

module.exports = DiepServerCollection;
