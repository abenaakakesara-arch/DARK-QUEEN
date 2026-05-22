module.exports = async (sock, update) => {

  const participants = update.participants
  const groupId = update.id

  for (let user of participants) {

    if (update.action === "add") {

      await sock.sendMessage(groupId, {
        text:
`👋 Welcome @${user.split("@")[0]}

🌸 DARK-QUEEN Group ekata obawa piligannawa.`,
        mentions: [user]
      })

    }

    else if (update.action === "remove") {

      await sock.sendMessage(groupId, {
        text:
`😔 Goodbye @${user.split("@")[0]}

Api oyawa mathak thiyagannawa 💔`,
        mentions: [user]
      })

    }

  }

}
