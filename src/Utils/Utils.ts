import { WASocket } from "@adiwajshing/baileys";

export function isString(value: any): boolean {
    return typeof value === 'string';
}

export async function isGroupExists(client: WASocket, jid: string): Promise<boolean> {
    const chat = await client.groupMetadata(jid);
    if (chat.id)
        return true;
    return false;
}