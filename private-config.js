require('dotenv').config();

const token = process.env.D_TOKEN;
const ownerId = process.env.D_OWNER_ID;
const clientId = process.env.D_CLIENT_ID;

if (!token || !ownerId || !clientId) {
    throw new Error('env variables not set correctly. please see .env.sample and put env variables in .env');
}

module.exports = {
    token, ownerId, clientId
};
