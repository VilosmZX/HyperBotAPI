import { WASocket, BaileysEventEmitter } from "@adiwajshing/baileys";
import { PrismaClient } from '@prisma/client';
import { isGroupExistsInDB, extractCoutryCode } from '../Utils/Utils';

export default async function (client: WASocket, prisma: PrismaClient) {
    client.ev.on('messages.upsert', async ({ messages }) => {
        const { message, key: { fromMe, id, remoteJid, participant }, pushName } = messages[0];
        const tableExists = await isGroupExistsInDB(prisma, remoteJid!);

        if (!message?.conversation)
            return;


        await prisma.chat.create({
            data: {
                conversation: message?.conversation,
                countryCode: extractCoutryCode(participant!),
                fromMe: fromMe!,
                number: participant!,
                pushname: pushName!,
                group: {
                    connectOrCreate: {
                        create: {
                            jid: remoteJid!,
                        },
                        where: {
                            jid: remoteJid!,
                        }
                    }
                }
            }
        })


        const reply = await prisma.autoReply.findFirst({ where: { trigger: message?.conversation } });
        if (reply !== null)
            await client.sendMessage(remoteJid!, { text: reply.reply });
    })
}