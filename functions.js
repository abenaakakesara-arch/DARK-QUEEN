const fs = require("fs");

function getBuffer(path) {

return fs.readFileSync(path);

}

function sleep(ms) {

return new Promise(resolve =>
setTimeout(resolve, ms)
);

}

function runtime(seconds) {

seconds = Number(seconds);

const h =
Math.floor(seconds / 3600);

const m =
Math.floor(seconds % 3600 / 60);

const s =
Math.floor(seconds % 60);

return `${h}h ${m}m ${s}s`;

}

module.exports = {
getBuffer,
sleep,
runtime
};
