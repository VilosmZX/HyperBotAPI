import { WASocket } from "@adiwajshing/baileys";

export default async function(client: WASocket, saveCreds: () => Promise<void>) {
    client.ev.on('connection.update', async update => {
        const { connection, lastDisconnect } = update;
        if (connection === 'open')
            console.log('Bot is online!')
        else if (connection === 'close')
            console.log(lastDisconnect?.error?.stack);
    });
    client.ev.on('creds.update', saveCreds);
}