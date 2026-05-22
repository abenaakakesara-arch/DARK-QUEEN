const axios = require("axios")

module.exports = {
  name: "tiktok",

  async execute(sock, msg, args) {

    const from = msg.key.remoteJid

    if (!args[0]) {
      return sock.sendMessage(from, {
        text: "❌ TikTok link eka denna"
      })
    }

    const url = args[0]

    try {

      const res = await axios.get(
        `https://api.tiklydown.eu.org/api/download?url=${url}`
      )

      const data = res.data

      await sock.sendMessage(from, {
        video: { url: data.video.noWatermark },
        caption: "✅ DARK-QUEEN TikTok Downloader"
      })

    } catch (e) {

      await sock.sendMessage(from, {
        text: "❌ Download Failed"
      })

    }

  }
}
