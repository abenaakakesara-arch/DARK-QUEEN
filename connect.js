const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason
} = require("@whiskeysockets/baileys")

const pino = require("pino")
const fs = require("fs")
const path = require("path")

const handler = require("./handler")

async function startBot() {

  const { state, saveCreds } =
    await useMultiFileAuthState("./session")

  const sock = makeWASocket({
    logger: pino({ level: "silent" }),
    auth: state,
    printQRInTerminal: true,
    browser: ["DARK-QUEEN", "Chrome", "1.0.0"]
  })

  // CONNECT MESSAGE
  sock.ev.on("connection.update",
    async (update) => {

      const { connection, lastDisconnect } = update

      if (connection === "open") {

        console.log("✅ DARK-QUEEN CONNECTED")

      }

      else if (connection === "close") {

        const reason =
          lastDisconnect?.error?.output?.statusCode

        if (reason !== DisconnectReason.loggedOut) {

          startBot()

        } else {

          console.log("❌ Connection Closed")

        }

      }

    }
  )

  // SAVE SESSION
  sock.ev.on("creds.update", saveCreds)

  // MESSAGE HANDLER
  sock.ev.on(
    "messages.upsert",
    async ({ messages }) => {

      const msg = messages[0]

      if (!msg.message) return

      handler(sock, msg)

    }
  )

  // WELCOME MESSAGE
  sock.ev.on(
    "group-participants.update",
    async (update) => {

      const welcome =
        require("./plugins/welcome")

      await welcome(sock, update)

    }
  )

}

startBot()
