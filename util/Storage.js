const fs = require('fs');
const path = require('path');

/**
 * Used for storing user information
 */
class Storage {
    saveInterval = -1;
    unsavedChanges = true;
    data = null;
    dataJsonPath = null;
    constructor(dataJsonPath = path.join(__dirname, '..', 'data.json'), saveEveryMS = 1000) {
        this.dataJsonPath = dataJsonPath;

        // read data.json file
        if (!fs.existsSync(this.dataJsonPath)) fs.writeFileSync(this.dataJsonPath, '{"user": {}, "server": {}}', 'utf8');
        this.data = JSON.parse(fs.readFileSync(this.dataJsonPath, 'utf8'));
        Object.setPrototypeOf(this.data.user, null);
        Object.setPrototypeOf(this.data.server, null);

        this.saveInterval = setInterval(() => this.save(), saveEveryMS);
    }

    // user data
    /*
    for this bot, a typical data object would look like this:
    {
        preferredGamemode: '4teams',
        preferredRegion: 'amsterdam'
    }
    */
    doesUserExist(userId) {
        return userId in this.data.user;
    }
    getUserData(userId) {
        return this.doesUserExist(userId) ? this.data.user[userId] : {};
    }
    setUserData(userId, data) {
        if (typeof data !== 'object') throw new TypeError('data must be an object');
        this.data.user[userId] = data;
        this.unsavedChanges = true;
    }

    // server data
    /*
    for this bot, a typical data object would look like this:
    {
        prefix: '>',
        aliases: {
            sayHi: {
                content: 'hi',
                reply: false
            }
        }
    }
    */
    doesServerExist(serverId) {
        return serverId in this.data.server;
    }
    getServerData(serverId) {
        return this.doesServerExist(serverId) ? this.data.server[serverId] : {};
    }
    setServerData(serverId, data) {
        if (typeof data !== 'object') throw new TypeError('data must be an object');
        this.data.server[serverId] = data;
        this.unsavedChanges = true;
    }

    save() {
        if (this.unsavedChanges) {
            fs.writeFileSync(this.dataJsonPath, JSON.stringify(this.data), 'utf8');
            this.unsavedChanges = false;
        }
    }
    stopSaveInterval() {
        if (this.saveInterval === -1) throw new TypeError('save interval already been stopped');
        clearInterval(this.saveInterval);
        this.saveInterval = -1;
    }
}

module.exports = Storage;
