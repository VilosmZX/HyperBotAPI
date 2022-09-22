"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/client/info', (req, res) => {
    res.json({
        data: req.client,
    });
});
router.post('/client/update/:options', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const option = req.params.options;
    if (option === 'displayname') {
        const newName = req.query.newname;
        if (typeof newName === 'string') {
            yield req.client.updateProfileName(newName);
            return res.sendStatus(200);
        }
    }
    else if (option === 'displaypicture') {
    }
}));
router.post('/client/chats/send/:jid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jid = req.params.jid;
    const content = req.query.msg;
    if (typeof content === 'string') {
        yield req.client.sendMessage(jid, { text: content });
        return res.sendStatus(200);
    }
    return res.sendStatus(403);
}));
router.get('/client/chats/participants', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jid = req.query.jid;
    if (typeof jid === 'string') {
        const groupData = yield req.client.groupMetadata(jid);
        return res.status(200).json(groupData.participants);
    }
    return res.sendStatus(403);
}));
router.get('/client/chats', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jid = req.query.jid;
    if (typeof jid === 'string') {
        const groupData = yield req.client.groupMetadata(jid);
        return res.status(200).json(groupData);
    }
    return res.sendStatus(403);
}));
router.get('/client/chats', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const chats = yield req.client.groupFetchAllParticipating();
    res.json(chats);
}));
exports.default = router;
