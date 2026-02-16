index.js
const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys')
const axios = require('axios')

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info')
    const sock = makeWASocket({ auth: state })

    sock.ev.on('creds.update', saveCreds)

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0]
        if (!msg.message || msg.key.fromMe) return

        const text = msg.message.conversation || ''

        // Resposta automática simples
        const resposta = "Olá! 👋 Obrigado pelo contato. Me diga sua dúvida sobre o produto."

        await sock.sendMessage(msg.key.remoteJid, { text: resposta })
    })
}

startBot()

