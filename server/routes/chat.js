import { Router } from "express";
import {
    activeChat,
    archiveChat,
    addConnection,
    allActiveChats,
    blockConnection,
    unblockConnection,
    getChat
} from '../data/chat.js'
import validators from '../../src/helper/validations.js'
import { getError } from "../util.js";

const router = Router();

router.put("/active", async (req, res) => {
    try {
        const { addConnectionId } = req.body
        const addConIdTrimmed = validators.checkId(addConnectionId, 'addConnectionId')
        await addConnection(req.user._id.toString(), addConIdTrimmed)
        return res.status(200).send({ message: 'Connection added successfully' })
    } catch(e) {
        const { status, message } = getError(e);
        return res.status(status).send({ message });
    };
});

router.put("/block", async (req, res) => {
    try {
        const { blockConnectionId } = req.body
        const blockConIdTrimmed = validators.checkId(blockConnectionId, 'blockConnectionId')
        await blockConnection(req.user._id.toString(), blockConIdTrimmed)
        return res.status(200).send({ message: 'Connection blocked successfully' })
    } catch(e) {
        const { status, message } = getError(e);
        return res.status(status).send({ message });
    };
});

router.put("/unblock", async (req, res) => {
    try {
        const { unblockConnectionId } = req.body
        const unblockConIdTrimmed = validators.checkId(unblockConnectionId, 'unblockConnectionId')
        await unblockConnection(req.user._id.toString(), unblockConIdTrimmed)
        return res.status(200).send({ message: 'Connection unblocked successfully' })
    } catch(e) {
        const { status, message } = getError(e);
        return res.status(status).send({ message });
    };
});

router.get('/all-connections', async (req, res) => {
    try {
        const connections = await allActiveChats(req.user._id.toString(), true)
        return res.status(200).send(connections)
    } catch(e) {
        const { status, message } = getError(e);
        return res.status(status).send({ message });
    };
})

// API to archive or unarchive a chat
router.put('/archive', async (req, res) => {
    try {
        let { chatId } = req.body;
        const validatedChatId = validators.checkId(chatId, 'chatId');
        await archiveChat(req.user._id.toString(), validatedChatId);
        return res.status(200).send({ message: 'Chat archived successfully' });
    } catch (e) {
        const { status, message } = getError(e);
        return res.status(status).send({ message });
    };
});

router.get('/all-active-chats', async (req, res) => {
    try {
        const connections = await allActiveChats(req.user._id.toString())
        return res.status(200).send(connections)
    } catch(e) {
        const { status, message } = getError(e);
        return res.status(status).send({ message });
    };
})

router.get('/active-chat/:connectedUserId', async (req, res) => {
    try {
        const connections = await activeChat(req.user._id.toString(), req.params.connectedUserId)
        return res.status(200).send(connections)
    } catch(e) {
        const { status, message } = getError(e);
        return res.status(status).send({ message });
    };
})

router.get('/connections/:connectedUserId', async (req, res) => {
    try {
        const connections = await activeChat(req.user._id.toString(), req.params.connectedUserId, true)
        return res.status(200).send(connections)
    } catch(e) {
        const { status, message } = getError(e);
        return res.status(status).send({ message });
    };
})

router.post('/getByChatId', async(req,res)=>{
    try{
        const chatId = validators.checkId(req.body.chatId, "chatId")
        const chat = await getChat(chatId);
        return res.status(200).send(chat)
    }catch(e){
        const { status, message } = getError(e);
        return res.status(status).send({ message });
    }
})

export default router;
