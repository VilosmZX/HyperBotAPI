import { Router } from 'express';

const router = Router();

router.get('/client/info', (req, res) => {
    res.json({
        data: req.client,
    })
});

router.post('/client/update/:options', async (req, res) => {
    const option = req.params.options;
    if (option === 'displayname') {
        const newName = req.query.newname;
        if (typeof newName === 'string') {
            await req.client.updateProfileName(newName);
            return res.sendStatus(200);
        }
    } else if (option === 'displaypicture') {
        // TODO
    }
});

router.post('/client/chats/send/:jid', async (req, res) => {
    const jid = req.params.jid;
    const content = req.query.msg;

    if (typeof content === 'string') {
        await req.client.sendMessage(jid, { text: content });
        return res.sendStatus(200);
    }
    return res.sendStatus(403);
});


router.get('/client/chats/participants', async (req, res) => {
    const jid = req.query.jid;
    if (typeof jid === 'string') {
        const groupData = await req.client.groupMetadata(jid);
        return res.status(200).json(groupData.participants);
    } 
    return res.sendStatus(403);
});

router.get('/client/chats', async (req, res) => {
    const jid = req.query.jid;
    if (typeof jid === 'string') {
        const groupData = await req.client.groupMetadata(jid);
        return res.status(200).json(groupData);
    } 
    return res.sendStatus(403);
});

router.get('/client/chats', async (req, res) => {
    const chats = await req.client.groupFetchAllParticipating();
    res.json(chats);
});


export default router;