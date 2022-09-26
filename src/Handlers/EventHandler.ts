import { WASocket, DisconnectReason } from "@adiwajshing/baileys";
import boom from 'boom';

export default async function(client: WASocket, saveCreds: () => Promise<void>, connectToWa: () => Promise<void>) {
    client.ev.on('connection.update', async update => {
        const { connection, lastDisconnect } = update;
        if (connection === 'open')
            console.log('Bot is online!')
        else if (connection === 'close') {
            const shouldReconnect = (lastDisconnect?.error as boom).output.statusCode !== DisconnectReason.loggedOut;
            if (shouldReconnect)
                await connectToWa();

        }
    });
    client.ev.on('creds.update', saveCreds);
}