import { Router } from "express";
import { addConnection, blockConnection, unblockConnection, activeChats } from '../data/chat.js'
import validators from '../validations.js'
import { authenticate } from "../middleware/index.js";

const router = Router();

router.put("/active", async (req, res) => {
    try {
        const { addConnectionId } = req.body
        validators.checkId(addConnectionId)
        const userId = req.body.userId// req.user._id.toString()
        await addConnection(userId, addConnectionId)
        return res.status(200).send({ message: 'Connection added successfully' })
    } catch(e) {
        console.log('error', e)
        return res.status(500).send({ message: 'Internal server error' })
    }
});

router.put("/block", async (req, res) => {
    const { blockConnectionId } = req.body
    const userId = req.body.userId // req.user._id.toString()
    await blockConnection(userId, blockConnectionId)
    return res.status(200).send({ message: 'Connection blocked successfully' })
});

router.put("/unblock", async (req, res) => {
    const { unblockConnectionId } = req.body
    const userId = req.body.userId // req.user._id.toString()
    await unblockConnection(userId, unblockConnectionId)
    return res.status(200).send({ message: 'Connection unblocked successfully' })
});

router.get('/connections', async (req, res) => {
    return activeChats('6438d7ac8e1c21e45686e198')
})

/*
[   {
        userId: ‘fjdlfjl’,
        firstName: ‘john’,
        lastName: ‘doe’,
        username: ‘john-doe’
        profileUrl: ‘base64 encoded image string’,
        lastMessage: ‘Hey!’
    }, {
        .
        .
        .
    }
]
*/
router.get('/active', async (req, res) => {
    return 
})

export default router;
