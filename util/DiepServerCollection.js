const fetch = require('node-fetch');
const convertServerIdToParty = require('./convertServerIdToParty');

const arrayToPartyLinks = arr => arr.map(serverId => convertServerIdToParty(serverId))

class DiepServerCollection {
    static regions = ['amsterdam', 'la', 'miami', 'singapore', 'sydney'];
    static gamemodes = ['ffa', 'survival', 'teams', '4teams', 'dom', 'tag', 'maze', 'sandbox'];

    apiEndpoint = 'https://api.n.m28.io';
    fetchInterval = -1;
    data = {};

    constructor(fetchTimeout = 60000 * 5) {
        this.fetchServers();
        setInterval(() => this.fetchServers(), fetchTimeout);
    }

    
    isEmpty(gamemode, region = null) {
        if (this.data[gamemode] && region === null) {
            for (const eachRegion in this.data[gamemode]) {
                if (this.data[gamemode][eachRegion].length !== 0) return false;
            }
        }
        else if (this.data[gamemode] && this.data[gamemode][region] && this.data[gamemode][region].length !== 0) return false;
        return true;
    }
    getAll() {
        const serverIDs = [];
        for (const gamemode in this.data) {
            for (const eachRegion in this.data[gamemode]) {
                if (this.data[gamemode][eachRegion].length !== 0) {
                    serverIDs = serverIDs.concat(this.data[gamemode][eachRegion]);
                }
            }
        }
        return arrayToPartyLinks(serverIDs);
    }
    getList(gamemode) {
        if (!this.data[gamemode]) return [];
        let serverIDs = [];
        for (const eachRegion in this.data[gamemode]) {
            if (this.data[gamemode][eachRegion].length !== 0) {
                serverIDs = serverIDs.concat(this.data[gamemode][eachRegion]);
            }
        }
        return arrayToPartyLinks(serverIDs);
    }
    getListByRegion(gamemode, region) {
        if (!this.data[gamemode] || !this.data[gamemode][region]) return [];
        return arrayToPartyLinks(this.data[gamemode][region]);
    }
    pickRandomServer(gamemode = null, region = null) {
        const partyLinks = gamemode === null ? this.getAll() : (region === null ? this.getList(gamemode) : this.getListByRegion(gamemode, region));
        if (partyLinks.length === 0) return null;
        return partyLinks[Math.floor(partyLinks.length * Math.random())];
    }

    async fetchServers(fetches = 20) { 
        const newData = {};
        for (let i = 0; i < fetches; i++) { // each fetch cycle takes approximately 1 second
            for (const eachGameMode of DiepServerCollection.gamemodes) {
                if (!newData[eachGameMode]) newData[eachGameMode] = {};
                const response = await (await fetch(`${this.apiEndpoint}/endpoint/diepio-${eachGameMode}/findEach/`)).json();
                for (const serverRegion in response.servers) {
                    const serverId = response.servers[serverRegion].id;
                    const region = serverRegion.split('-')[1]; // turn vultr-amsterdam into amsterdam
                    if (!newData[eachGameMode][region]) newData[eachGameMode][region] = [];
                    if (!newData[eachGameMode][region].includes(serverId)) newData[eachGameMode][region].push(serverId);
                }
            }
        }
        this.data = newData;
    }
    stopFetchInterval() {
        if (this.fetchInterval === -1) throw new TypeError('fetchInterval has already been stopped');
        clearInterval(this.fetchInterval);
        this.fetchInterval = -1;
    }
}

module.exports = DiepServerCollection;
