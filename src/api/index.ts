import express, { NextFunction, Response } from "express";
import { Client } from '../Types';
import router from "./routers/router";

const app = express();

export default async function(client: Client) {
    app.use(express.json());
    app.use((req, res, next) => {
        req.client = client;
        next();
    });
    app.use(router);
    app.listen(8000, () => console.log('Web server running!'));
}