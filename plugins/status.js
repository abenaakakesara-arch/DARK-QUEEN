module.exports = {

  name: "statusseen",

  async execute(sock, msg) {

    try {

      const jid = msg.key.remoteJid

      if (jid === "status@broadcast") {

        await sock.readMessages([msg.key])

        console.log("👀 Status Seen")

      }

    } catch (e) {

      console.log(e)

    }

  }

}
