module.exports = {

  name: "voice",

  async execute(sock, msg) {

    const from = msg.key.remoteJid

    try {

      const message =
        msg.message?.conversation ||
        msg.message?.extendedTextMessage?.text

      if (!message) return

      const text = message.toLowerCase()

      // GOOD MORNING
      if (
        text.includes("gm") ||
        text.includes("good morning")
      ) {

        await sock.sendMessage(from, {
          audio: {
            url: "https://files.catbox.moe/4f9l7c.mp3"
          },
          mimetype: "audio/mp4",
          ptt: true
        })

      }

      // GOOD NIGHT
      if (
        text.includes("gn") ||
        text.includes("good night")
      ) {

        await sock.sendMessage(from, {
          audio: {
            url: "https://files.catbox.moe/4f9l7c.mp3"
          },
          mimetype: "audio/mp4",
          ptt: true
        })

      }

      // MK
      if (text.includes("mk")) {

        await sock.sendMessage(from, {
          text: "😄 Mokada karanne?"
        })

      }

      // HI
      if (text.includes("hi")) {

        await sock.sendMessage(from, {
          audio: {
            url: "https://files.catbox.moe/4f9l7c.mp3"
          },
          mimetype: "audio/mp4",
          ptt: true
        })

      }

      // BAD WORDS
      if (
        text.includes("huththa") ||
        text.includes("ponnaya") ||
        text.includes("pakaya")
      ) {

        await sock.sendMessage(from, {
          text: "😒 උබගෙ තාත්ත"
        })

      }

    } catch (e) {

      console.log(e)

    }

  }

}
