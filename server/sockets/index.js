import { sockets, users } from '../config/mongoCollections.js'
import { Server } from 'socket.io'
import { addMessagesToChat, mapSocketIdToUser } from '../data/chat.js'
import { ObjectId } from 'mongodb'

const ioS = new Server(3002, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
})

ioS.on("connection", async socket => {
    const userId = socket.handshake.query.userId
    if (userId) {
        console.log('Socket connection is live!!')
        const created = await mapSocketIdToUser({ userId, socketId: socket.id })

        if (created) {
            socket.on("message", async ({ senderId, receiverId, message }) => {
                console.log('on message', senderId, receiverId, message)
                await sendMessage(senderId, receiverId, message)
            })
        } else {
            console.log('ERROR: Failed to create socket mapping with the user', userId)
        }
    }
})

const sendMessage = async (senderId, receiverId, message) => {
    const socketsCtx = await sockets()
    const socketMapping = await socketsCtx.findOne({ userId: receiverId })
    if (socketMapping) {
        const usersCol = await users()
        const user = await usersCol.findOne({ _id: new ObjectId(receiverId) }, { projection: { password: 0 } });
        if (user) {
            const blocked = user?.connections?.blocked ?? []
            if (!blocked.includes(senderId)) {
                ioS.to(socketMapping.socketId).emit('message', { senderId, receiverId, message } )
            } else {
                console.log('Message not sent: sender is blocked by receiver', senderId, receiverId)
            }
        } else {
            console.log('ERROR: Receiver not found in the database')
        }

    } else {
        const socketMap = await socketsCtx.findOne({ userId: senderId })
        if (socketMap) {
            ioS.to(socketMap.socketId).emit('status', { receiverId, status: 'offline' })
        } else {
            console.log('ERROR: Failed to send receiver status, sender not online', senderId)
        }
    }
    
    try {
        await addMessagesToChat(senderId, receiverId, message)
    } catch(e) {
        console.log('ERROR: Failed to save message to database', senderId)
    }
}

export default ioS