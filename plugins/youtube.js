const ytdl = require("ytdl-core")

module.exports = {
  name: "yt",

  async execute(sock, msg, args) {

    const from = msg.key.remoteJid

    if (!args[0]) {
      return sock.sendMessage(from, {
        text: "❌ YouTube link eka denna"
      })
    }

    const url = args[0]

    try {

      await sock.sendMessage(from, {
        text: "⬇️ Downloading Video..."
      })

      await sock.sendMessage(from, {
        video: { url: url },
        caption: "✅ DARK-QUEEN YouTube Downloader"
      })

    } catch (e) {

      await sock.sendMessage(from, {
        text: "❌ Download Failed"
      })

    }

  }
}
