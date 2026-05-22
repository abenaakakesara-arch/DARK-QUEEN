const {
default: makeWASocket,
useMultiFileAuthState,
DisconnectReason
} = require("@whiskeysockets/baileys")

const pino = require("pino")

async function startBot() {

const { state, saveCreds } =
await useMultiFileAuthState("./session")

const sock = makeWASocket({
logger: pino({ level: "silent" }),
printQRInTerminal: true,
auth: state,
browser: ["DARK-QUEEN","Chrome","1.0.0"]
})

sock.ev.on(
"connection.update",
async (update) => {

const { connection } = update

if (connection === "open") {

console.log("✅ BOT CONNECTED")

}

if (connection === "close") {

startBot()

}

}
)

sock.ev.on("creds.update", saveCreds)

}

startBot()
