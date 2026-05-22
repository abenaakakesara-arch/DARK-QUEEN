const fs = require("fs")
const path = require("path")

module.exports = (sock, msg) => {

  const body =
    msg.message?.conversation ||
    msg.message?.extendedTextMessage?.text ||
    ""

  const prefix = "."

  if (!body.startsWith(prefix)) return

  const args = body.slice(prefix.length).trim().split(/ +/)

  const command = args.shift().toLowerCase()

  const pluginPath = path.join(__dirname, "plugins")

  const files = fs.readdirSync(pluginPath)

  for (let file of files) {

    const plugin = require(`./plugins/${file}`)

    if (plugin.name === command) {

      plugin.execute(sock, msg, args)

    }

  }

}
