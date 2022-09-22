import { Client } from './Types';
import { extractCountryCode } from './Utils';

export default async function (client: Client) {
    client.ev.on('connection.update', async update => {
        const { connection } = update;
        if (connection === 'open')
            console.log('Bot is online!');
    });
    client.ev.on('creds.update', async () => await client.saveCreds());
    client.ev.on('messages.upsert', async ( { messages } ) => {
        const { key: { remoteJid, participant }, pushName, message } = messages[0]
        const countryCode = extractCountryCode(participant!);
    });
}