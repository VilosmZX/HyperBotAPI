import makeWASocket, { useMultiFileAuthState } from "@adiwajshing/baileys";
import handleEvent from './Events';
import handleAPI from './api';
import pino from 'pino';

async function connectToWA() {
    const { state, saveCreds } = await useMultiFileAuthState('./auth');
    const client = makeWASocket({ auth: state, printQRInTerminal: true, logger: pino({ level: 'silent' }) });
    await handleEvent({...client, state, saveCreds});
    await handleAPI({...client, state, saveCreds});
}

connectToWA();