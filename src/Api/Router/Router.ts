import { Router } from 'express';
import { isGroupExists } from '../../Utils/Utils';

const router = Router();

router.get('/chats', async (req, res) => {
    const chats = await req.client.groupFetchAllParticipating();
    res.status(200).json(chats);
});

interface Test {
    data: number[]
}

router.get('/chats/:jid', async (req, res) => {
    const jid = req.params.jid as string;
    const chat = await req.client.groupMetadata(jid) || null;
    if (await isGroupExists(req.client, jid))
        return res.status(200).json(chat)
    res.status(404).json({error: 'Group not found!'});
});

router.post('/chats/:jid/send', async (req, res) => {
    const jid = req.params.jid;
    const msg = req.query.msg as string;
    
    if (!(await isGroupExists(req.client, jid)))
        return res.sendStatus(404);

    if (msg) {
        await req.client.sendMessage(jid, { text: msg });
        return res.sendStatus(200);
    }
    res.sendStatus(403);
});


export default router;