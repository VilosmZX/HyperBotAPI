import { WASocket, BaileysEventEmitter } from "@adiwajshing/baileys";

export default async function(event: BaileysEventEmitter) {
    event.on('messages.upsert', async ({ messages }) => {
        const m = messages[0];
        console.log(m);
    })
}