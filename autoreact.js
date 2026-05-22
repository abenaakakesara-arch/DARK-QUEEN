module.exports = {
  name: "autoreact",
  async execute(sock, msg) {

    const emojis = ["😂","🔥","❤️","😎","🥺","🤖","👑"]

    const emoji =
      emojis[Math.floor(Math.random() * emojis.length)]

    await sock.sendMessage(
      msg.key.remoteJid,
      {
        react: {
          text: emoji,
          key: msg.key
        }
      }
    )

  }
}
