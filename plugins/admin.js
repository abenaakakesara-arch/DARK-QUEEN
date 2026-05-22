module.exports = {
  name: "kick",

  async execute(sock, msg, args) {

    const from = msg.key.remoteJid

    if (!msg.key.participant) return

    const mentioned =
      msg.message?.extendedTextMessage
      ?.contextInfo?.mentionedJid

    if (!mentioned || !mentioned[0]) {

      return sock.sendMessage(from, {
        text: "❌ User mention karanna"
      })

    }

    try {

      await sock.groupParticipantsUpdate(
        from,
        [mentioned[0]],
        "remove"
      )

      await sock.sendMessage(from, {
        text: "✅ User Removed"
      })

    } catch (e) {

      await sock.sendMessage(from, {
        text: "❌ Admin Error"
      })

    }

  }
}
