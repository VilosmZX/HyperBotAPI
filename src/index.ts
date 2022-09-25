import makeWaSocket, { useMultiFileAuthState } from '@adiwajshing/baileys';
import EventHandler from './Handlers/EventHandler';
import MessageHandler from './Handlers/MessageHandler';
import HandleServer from './Api/Server';
import pino from 'pino';
import { PrismaClient } from '@prisma/client';

(async () => {
    const { state, saveCreds } = await useMultiFileAuthState('./baileys_auth/auth1');
    const client = makeWaSocket({
        auth: state,
        printQRInTerminal: true,
        logger: pino({ level: 'silent' })
    });
    const prisma = new PrismaClient();
    await EventHandler(client, saveCreds);
    await MessageHandler(client, prisma);
    await HandleServer(client, prisma);
})();
