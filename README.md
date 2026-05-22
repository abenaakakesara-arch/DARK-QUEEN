# 👑 DARK-QUEEN

<div align="center">

<img src="https://img.shields.io/badge/WHATSAPP-USERBOT-green?style=for-the-badge&logo=whatsapp">

### 🇱🇰 Whatsapp User Bot In Sri Lanka

Simple Fast And Powerful WhatsApp User Bot

</div>

---

# ✨ Features

- 🤖 Auto Reply
- 🎵 Song Download
- 📷 Video Download
- 🖼️ Image Commands
- 😎 Sticker Maker
- 👥 Group Management
- 🔍 Search Commands
- ⚡ Fast Response
- 🔒 Safe & Private
- 🌐 Multi Device Support

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/USERNAME/DARK-QUEEN.git

const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys")
const readline = require("readline")

async function startBot() {

const { state, saveCreds } = await useMultiFileAuthState("session")

const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
})

const question = (text) =>
new Promise((resolve) => rl.question(text, resolve))

const sock = makeWASocket({
auth: state
})

if (!sock.authState.creds.registered) {

const phoneNumber = await question(
"Enter Your Number : "
)

const code = await sock.requestPairingCode(phoneNumber)

console.log(`
=============================
YOUR PAIR CODE : ${code}
=============================
`)

}

sock.ev.on("creds.update", saveCreds)

console.log("DARK-QUEEN BOT CONNECTED ✅")
}

startBot()
