module.exports = {
  name: "owner",

  async execute(sock, msg) {

    const from = msg.key.remoteJid

    await sock.sendMessage(from, {
      text:
`👑 DARK-QUEEN OWNER PANEL

╭━━━〔 OWNER 〕━━━⬣
┃ 👑 Owner : Kesara
┃ 🤖 Bot : DARK-QUEEN
┃ ⚡ Version : 1.0.0
╰━━━━━━━━━━━━⬣`
    })

  }
}
