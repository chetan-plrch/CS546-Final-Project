import { Router } from "express";
import { addConnection, blockConnection, unblockConnection, activeChats } from '../data/chat.js'
import validators from '../validations.js'
import { errorType } from "../util.js";

const router = Router();

router.put("/active", async (req, res) => {
    try {
        const { addConnectionId } = req.body
        const addConIdTrimmed = validators.checkId(addConnectionId, 'addConnectionId')
        await addConnection(req.user._id.toString(), addConIdTrimmed)
        return res.status(200).send({ message: 'Connection added successfully' })
    } catch(e) {
        if (e.type === errorType.BAD_INPUT) {
            return res.status(400).send({ message: e.message })
        } else if (e.type === errorType.NOT_FOUND) {
            return res.status(404).send({ message: e.message })
        }
        return res.status(500).send({ message: 'Internal server error' })
    }
});

router.put("/block", async (req, res) => {
    try {
        const { blockConnectionId } = req.body
        const blockConIdTrimmed = validators.checkId(blockConnectionId, 'blockConnectionId')
        await blockConnection(req.user._id.toString(), blockConIdTrimmed)
        return res.status(200).send({ message: 'Connection blocked successfully' })
    } catch(e) {
        if (e.type === errorType.BAD_INPUT) {
            return res.status(400).send({ message: e.message })
        } else if (e.type === errorType.NOT_FOUND) {
            return res.status(404).send({ message: e.message })
        }
        return res.status(500).send({ message: 'Internal server error' })
    }
});

router.put("/unblock", async (req, res) => {
    try {
        const { unblockConnectionId } = req.body
        const unblockConIdTrimmed = validators.checkId(unblockConnectionId, 'unblockConnectionId')
        await unblockConnection(req.user._id.toString(), unblockConIdTrimmed)
        return res.status(200).send({ message: 'Connection unblocked successfully' })
    } catch(e) {
        if (e.type === errorType.BAD_INPUT) {
            return res.status(400).send({ message: e.message })
        } else if (e.type === errorType.NOT_FOUND) {
            return res.status(404).send({ message: e.message })
        }
        return res.status(500).send({ message: 'Internal server error' })
    }
});

router.get('/connections', async (req, res) => {
    try {
        const connections = await activeChats(req.user._id.toString())
        return res.status(200).send(connections)
    } catch(e) {
        console.log('e', e)
        if (e.type === errorType.BAD_INPUT) {
            return res.status(400).send({ message: e.message })
        } else if (e.type === errorType.NOT_FOUND) {
            return res.status(404).send({ message: e.message })
        }
        return res.status(500).send({ message: 'Internal server error' })
    }
})

export default router;
