import { WASocket } from "@adiwajshing/baileys";

export default async function(client: WASocket, saveCreds: () => Promise<void>) {
    client.ev.on('connection.update', async update => {
        const { connection } = update;
        if (connection === 'open')
            console.log('Bot is online!')
        else if (connection === 'close')
            console.log('Bot is offline');
    });
    client.ev.on('creds.update', saveCreds);
}