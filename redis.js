const { createClient } = require("redis");
const client = createClient();

const connectClient = async () => {
    client.on('connect', () => console.log("Redis client connected."));
    client.on('error', (error) => console.log(`Redis client error: ${error}`));
    client.connect();
}


module.exports = connectClient;