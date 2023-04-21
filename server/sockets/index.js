import { sockets, chats } from '../config/mongoCollections.js'
import { Server } from 'socket.io'
import { addMessagesToChat, mapSocketIdToUser } from '../data/chat.js'

const ioS = new Server(3002, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
})

// Middleware for authentication
// ioS.use((socket, next) => {
//     console.log(socket.handshake.auth)
  
//     next()
// });

const sendMessage = async (senderId, receiverId, message) => {
    const socketsCtx = await sockets()
    const socketMapping = await socketsCtx.findOne({ userId: receiverId })
    if (socketMapping) {
        ioS.to(socketMapping.socketId).emit('message', message)
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

ioS.on("connection", async socket => {
    console.log('Socket connection is live!!')

    const userId = '6438d7ac8e1c21e45686e198'
    const created = await mapSocketIdToUser({ userId, socketId: socket.id })

    if (created) {
        socket.on("message", async ({ senderId, receiverId, message }) => {
            console.log('on message', senderId, receiverId, message)
            await sendMessage(senderId, receiverId, message)
        })
    } else {
        console.log('ERROR: Failed to create socket mapping with the user', userId)
    }

})

export default ioS