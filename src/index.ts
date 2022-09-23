import makeWaSocket, { useMultiFileAuthState } from '@adiwajshing/baileys';
import EventHandler from './Handlers/EventHandler';
import MessageHandler from './Handlers/MessageHandler';
import HandleServer from './Api/Server';
import pino from 'pino';

(async () => {
    const { state, saveCreds } = await useMultiFileAuthState('./baileys_auth/auth1');
    const client = makeWaSocket({
        auth: state,
        printQRInTerminal: true,
        logger: pino({ level: 'silent' })
    });
    await EventHandler(client, saveCreds);
    await MessageHandler(client.ev);
    await HandleServer(client);
})();

