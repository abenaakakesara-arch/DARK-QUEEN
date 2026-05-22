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
