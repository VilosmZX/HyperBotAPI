import { WASocket, BaileysEventEmitter } from "@adiwajshing/baileys";
import { PrismaClient } from '@prisma/client';

export default async function(client: WASocket, prisma: PrismaClient) {
    client.ev.on('messages.upsert', async ({ messages }) => {
        const m = messages[0];
        const content = messages[0].message?.conversation as string;
        const reply = await prisma.autoReply.findFirst({ where: { trigger: content } });
        if (reply !== null)
            await client.sendMessage(m.key.remoteJid!, { text: reply.reply });
    })
}