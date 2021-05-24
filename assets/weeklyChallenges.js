const tanks = Object.keys(require('./tankImages').rawData);

const gamemodes = ['FFA', 'Survival', '2 Teams', '4 Teams', 'Maze'];

const challenges = [{
    msg: 'Achieve a ratio of REPLACER1 per min',
    tiers: {
        REPLACER1: {
            easy: [5000, 10000],
            medium: [10000, 15000],
            hard: [15000, 20000]
        }
    }
}, {
    msg: 'Achieve REPLACER1 score in REPLACER2 gamemode',
    tiers: {
        REPLACER1: {
            easy: [100000, 250000],
            medium: [250000, 400000],
            hard: [400000, 750000]
        }
    },
    randoms: {
        REPLACER2: gamemodes
    }
}, {
    msg: 'Achieve REPLACER1 score',
    tiers: {
        REPLACER1: {
            easy: [150000, 300000],
            medium: [300000, 500000],
            hard: [500000, 1000000]
        }
    }
}, {
    msg: 'Kill REPLACER1 tanks in the pentagon nest',
    tiers: {
        REPLACER1: {
            easy: [2, 5],
            medium: [5, 10],
            hard: [10, 20]
        }
    }
}, {
    msg: 'Achieve REPLACER1 score as REPLACER2 tank',
    tiers: {
        REPLACER1: {
            easy: [100000, 250000],
            medium: [250000, 400000],
            hard: [400000, 750000]
        }
    },
    randoms: {
        REPLACER2: tanks
    }
}, {
    msg: 'Achieve REPLACER1 score as REPLACER2 tank in REPLACER3 gamemode',
    tiers: {
        REPLACER1: {
            easy: [100000, 250000],
            medium: [250000, 400000],
            hard: [400000, 750000]
        }
    },
    randoms: {
        REPLACER2: tanks,
        REPLACER3: gamemodes
    }
}, {
    msg: 'Kill a boss with REPLACER1 Tank',
    randoms: {
        REPLACER1: tanks
    }
}, {
    msg: 'Kill a boss with REPLACER1 Tank in REPLACER2 gamemode',
    randoms: {
        REPLACER1: tanks,
        REPLACER2: ['FFA', '2 Teams', '4 Teams']
    }
}];

// min max inclusive
function randomInt(min, max) {
    // credit to https://stackoverflow.com/a/1527820/6850723
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function arrayRandom(arr) {
    return arr[randomInt(0, arr.length - 1)];
}

module.exports = {
    challenges,
    pullRandom() {
        /*
        __**Here are this week's weekly challenges!**__
        
        **Easy:** <Easy Challenge>
        **Medium:** <Medium Challenge>
        **Hard:** <Hard Challenge>
        */
        let genMsg = "__**Here are this week's weekly challenges!**__\n\n";
        const challenge = arrayRandom(challenges);
        const randomValues = () => {
            let msg = challenge.msg;
            if (challenge.randoms) {
                for (const prop in challenge.randoms) {
                    msg = msg.replace(prop, arrayRandom(challenge.randoms[prop]));
                }
            }
            return msg;
        };
        const randomValuesTier = (msg, tier) => {
            for (const prop in challenge.tiers) {
                msg = msg.replace(prop, randomInt(challenge.tiers[prop][tier][0], challenge.tiers[prop][tier][1]));
            }
            return msg;
        };
        if (challenge.tiers) {
            let msg = randomValues();
            genMsg += `**Easy:** ${randomValuesTier(msg, 'easy')}\n`;
            genMsg += `**Medium:** ${randomValuesTier(msg, 'medium')}\n`;
            genMsg += `**Hard:** ${randomValuesTier(msg, 'hard')}\n`;
        } else {
            genMsg += randomValues();
        }
        return genMsg;
    }
};
