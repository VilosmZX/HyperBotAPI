import { WASocket } from "@adiwajshing/baileys";
import { Request } from "express-serve-static-core";
import { PrismaClient } from '@prisma/client';

declare module 'express-serve-static-core' {
    interface Request {
        client: WASocket;
        prisma: PrismaClient;
    }
}