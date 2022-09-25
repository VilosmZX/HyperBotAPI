import { Router } from 'express';
import { isGroupExists } from '../../Utils/Utils';

const router = Router();

router.get('/chats', async (req, res) => {
    const chats = await req.client.groupFetchAllParticipating();
    res.status(200).json(Object.values(chats));
});

router.get('/github', async (req, res) => {
    const gitlogs = await req.prisma.gitPush.findMany();
    res.status(200).json(gitlogs);
});

router.post('/github', async (req, res) => {
    const { 
        pusher: { name, email }, 
        head_commit: { message }, 
        repository: { pushed_at },
    } = req.body;
    req.prisma.gitPush.create({
        data: {
            message,
        }
    })
        .then(res => console.log(res))
        .catch(err => console.error(err));
});

router.get('/chats/:jid', async (req, res) => {
    const jid = req.params.jid as string;
    const chat = await req.client.groupMetadata(jid);
    res.status(200).json(chat);
});

router.post('/autoreply/add', async (req, res) => {
    const data = req.body;
    await req.prisma.autoReply.create({
        data: {
            trigger: data.trigger!,
            reply: data.reply!,
        }
    })
    res.status(200).json({
        status: 'Success',
        trigger: data.trigger,
        reply: data.reply
    })
});

router.get('/logs/:jid', async (req, res) => {
    const jid = req.params.jid;
    const chatLogs = await req.prisma.chat.findMany({
        where: {
            group: {
                jid,
            }
        }
    });
    res.status(200).json(chatLogs);
});

router.get('/autoreply/list', async (req, res) => {
    const allAutoReply = await req.prisma.autoReply.findMany();
    res.status(200).json(allAutoReply);
});

router.delete('/autoreply/delete', async (req, res) => {
    const id = Number.parseInt(req.query.id as string);
    const deletedCommand = await req.prisma.autoReply.delete({
        where: {
            id
        }
    });
    res.status(200).json({
        status: 'Deleted',
        ...deletedCommand,
    })
});

router.delete('/autoreply/clear', async (req, res) => {
    const { count } = await req.prisma.autoReply.deleteMany();
    res.status(200).json({
        deletedItems: count,
    })
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