import { WASocket } from "@adiwajshing/baileys";
import { PrismaClient } from "@prisma/client";

export function isString(value: any): boolean {
    return typeof value === 'string';
}

export async function isGroupExists(client: WASocket, jid: string): Promise<boolean> {
    const chat = await client.groupMetadata(jid);
    if (chat.id)
        return true;
    return false;
}

export async function isGroupExistsInDB(prisma: PrismaClient, jid: string): Promise<boolean> {
    const isExists = await prisma.groupChat.findFirst({
        where: {
            jid
        }
    });
    return isExists ? true : false;
}

export function extractCoutryCode(participantNumber: string): string {
    return participantNumber.substring(0, 2);
}