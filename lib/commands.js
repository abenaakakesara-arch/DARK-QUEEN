const fs = require("fs");
const path = require("path");

async function commands(sock, m) {

const pluginsPath =
path.join(__dirname, "../plugins");

const files =
fs.readdirSync(pluginsPath);

for (const file of files) {

if (!file.endsWith(".js")) continue;

const plugin =
require(`../plugins/${file}`);

await plugin(sock, m);

}

}

module.exports = commands;
