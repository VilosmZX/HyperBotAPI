import { WASocket, AuthenticationState } from "@adiwajshing/baileys";
import { Request } from "express";

export interface Client extends WASocket {
    state: AuthenticationState;
    saveCreds: () => Promise<void>;
}

export interface Message {
    author: {
        jid: string,
        pushname: string,
        countryCode: string,
        numberWithFormat: string,
    },
    message: string,
}