module.exports = async(sock, m) => {

const text =
m.message.conversation ||
m.message.extendedTextMessage?.text;

if(text === ".alive") {

await sock.sendMessage(
m.key.remoteJid,
{
text: "DARK-QUEEN IS ONLINE ✅"
}
);

}

}
