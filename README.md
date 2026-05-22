# 👑 DARK-QUEEN

<div align="center">

<img src="https://img.shields.io/badge/WHATSAPP-BOT-green?style=for-the-badge&logo=whatsapp">

### 🇱🇰 Whatsapp User Bot In Sri Lanka

Simple & Fast WhatsApp User Bot Created By DARK-QUEEN

</div>

---

## ✨ Features

- 🤖 Auto Reply System
- 🎵 Song Download
- 📷 Photo & Video Download
- 😎 Sticker Commands
- 👥 Group Management
- 🔍 Search Commands
- ⚡ Fast Response
- 🔒 Safe & Private

---

## 🚀 Installation

```bash
git clone https://github.com/USERNAME/DARK-QUEEN.git
cd DARK-QUEEN
npm install
npm start

const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion
} = require("@whiskeysockets/baileys");

const pino = require("pino");
const readline = require("readline");

async function startBot() {

  const { state, saveCreds } =
    await useMultiFileAuthState("./session");

  const { version } =
    await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    logger: pino({ level: "silent" }),
    auth: state
  });

  sock.ev.on("creds.update", saveCreds);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question("Enter Your Number : ", async(number) => {

    const code = await sock.requestPairingCode(number);

    console.log(`
╔════════════════╗
   DARK-QUEEN
╚════════════════╝

Your Pair Code : ${code}

`);

    rl.close();

  });

  sock.ev.on("connection.update", async(update) => {

    const { connection, lastDisconnect } = update;

    if (connection === "close") {

      const shouldReconnect =
        lastDisconnect?.error?.output?.statusCode !==
        DisconnectReason.loggedOut;

      if (shouldReconnect) {
        startBot();
      }

    } else if (connection === "open") {

      console.log("Bot Connected ✅");

    }

  });

}

startBot();
