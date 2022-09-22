import { Express } from 'express-serve-static-core';
import { Client } from './Types';

declare module 'express-serve-static-core' {
    namespace Express {
        interface Request {
                client: Client
        }
    }
}