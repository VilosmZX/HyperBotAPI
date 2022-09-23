import { WASocket } from '@adiwajshing/baileys';
import express from 'express';
import router from './Router/Router';
import cors from 'cors';

export default async function(client: WASocket) {
    const app = express();
    app.use(express.json());
    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true
    }))
    app.use((req, res, next) => {
        req.client = client;
        next();
    })
    app.use('/api/client', router);
    app.listen(5000, () => console.log('Server is online!'));
}