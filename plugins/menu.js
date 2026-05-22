module.exports = async(sock, m) => {

const text =
m.message.conversation ||
m.message.extendedTextMessage?.text;

if(text === ".menu") {

await sock.sendMessage(
m.key.remoteJid,
{
text: `
╔═══〔 DARK-QUEEN 〕═══╗

👑 .alive
📥 .song
🎬 .tiktok
🖼️ .sticker
👥 .group

╚══════════════════╝
`
}
);

}

}
