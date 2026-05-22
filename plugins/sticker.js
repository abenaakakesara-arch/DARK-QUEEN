module.exports = {
  name: "sticker",

  async execute(sock, msg) {

    const from = msg.key.remoteJid

    try {

      const quoted = msg.message?.extendedTextMessage?.contextInfo

      if (!quoted) {
        return sock.sendMessage(from, {
          text: "❌ Photo ekakata reply karanna"
        })
      }

      await sock.sendMessage(from, {
        text: "🖼️ Creating Sticker..."
      })

      const media = await sock.downloadMediaMessage(
        quoted
      )

      await sock.sendMessage(from, {
        sticker: media
      })

    } catch (e) {

      await sock.sendMessage(from, {
        text: "❌ Sticker Error"
      })

    }

  }
}
