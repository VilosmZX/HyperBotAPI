import { WASocket } from "@adiwajshing/baileys";
import { Request } from "express-serve-static-core";

declare module 'express-serve-static-core' {
    interface Request {
        client: WASocket;
    }
}