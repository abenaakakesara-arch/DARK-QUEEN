const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion
} = require("@whiskeysockets/baileys");

const P = require("pino");
const fs = require("fs");

async function connectBot() {

  const { state, saveCreds } =
    await useMultiFileAuthState("./session");

  const { version } =
    await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    logger: P({ level: "silent" }),
    printQRInTerminal: false,
    auth: state,
    browser: ["DARK-QUEEN", "Chrome", "1.0.0"]
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", async(update) => {

    const { connection, lastDisconnect } = update;

    if (connection === "connecting") {

      console.log("Connecting To WhatsApp...");

    }

    if (connection === "open") {

      console.log(`
╔══════════════════════╗
     DARK-QUEEN
╚══════════════════════╝

Bot Connected Successfully ✅
`);

    }

    if (connection === "close") {

      const reason =
        lastDisconnect?.error?.output?.statusCode;

      console.log("Connection Closed :", reason);

      if (reason !== DisconnectReason.loggedOut) {
        connectBot();
      }

    }

  });

  sock.ev.on("messages.upsert", async({ messages }) => {

    const m = messages[0];

    if (!m.message) return;

    const msg =
      m.message.conversation ||
      m.message.extendedTextMessage?.text;

    if (!msg) return;

    console.log("Message :", msg);

    if (msg === ".alive") {

      await sock.sendMessage(
        m.key.remoteJid,
        {
          text: "DARK-QUEEN BOT IS ONLINE ✅"
        }
      );

    }

  });

}

connectBot();
const welcome = require("./plugins/welcome")

sock.ev.on(
  "group-participants.update",
  async (update) => {
    await welcome(sock, update)
  }
)
handler(sock, msg)
