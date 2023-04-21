import { ObjectId } from 'mongodb'
import { users, chats, sockets } from "../config/mongoCollections.js";
import validators from '../validations.js'
import { removeBlockedChats, formatListOfUsers, formatUser, getChatUserIds } from '../util.js'

const addConnection = async (userId, connectionUserId) => {
    const userCtn = await users()
    const user = await userCtn.findOne({ _id: new ObjectId(userId) });
    if (!user) {
        throw new Error('User not found in the system')
    }
    const activeConnections = new Set(user.connections.active)
    if(activeConnections.has(connectionUserId)) {
        throw new Error('User already has an active connection')
    } else {
        const active = [...user.connections.active, connectionUserId]
        const updatedDoc = await userCtn.findOneAndUpdate(
            { _id: new ObjectId(userId) }, 
            { $set: { 'connections.active': active } },
            { returnDocument: 'after', returnNewDocument: true }
        )

        if (updatedDoc && updatedDoc.lastErrorObject && updatedDoc.lastErrorObject.updatedExisting) {
            return updatedDoc
        } else {
            throw new Error('Unable to update the users active connections')
        }
    }
}

const blockConnection = async (userId, blockUserId) => {
    const userCtn = await users()
    const user = await userCtn.findOne({ _id: new ObjectId(userId) });
    const activeConnections = user.connections.active
    const blockedConnections = user.connections.blocked
    const blockedConnectionsSet = new Set(user.connections.blocked)
    if(blockedConnectionsSet.has(blockUserId)) {
        throw new Error('User is already in the block list')
    } else {
        const blockIdx = activeConnections.indexOf(blockUserId);
        if (blockIdx > -1) {
            activeConnections.splice(blockIdx, 1);
            blockedConnections.push(blockUserId)
        } else {
            throw new Error('User not found in the system')
        }
        const active = activeConnections
        const blocked = blockedConnections
        const updatedDoc = await userCtn.findOneAndUpdate(
            { _id: new ObjectId(userId) }, 
            { $set: { 
                'connections.blocked': blocked,
                'connections.active': active 
            } },
            { returnDocument: 'after', returnNewDocument: true }
        )

        if (updatedDoc && updatedDoc.lastErrorObject && updatedDoc.lastErrorObject.updatedExisting) {
            return updatedDoc
        } else {
            throw new Error('Unable to update the blocked user list')
        }
    }
}

const unblockConnection = async (userId, unblockUserId) => {
    const userCtn = await users()
    const user = await userCtn.findOne({ _id: new ObjectId(userId) });
    const activeConnections = user.connections.active
    const blockedConnections = user.connections.blocked
    const blockedConnectionsSet = new Set(blockedConnections)
    if(blockedConnectionsSet.has(unblockUserId)) {
        const blockIdx = blockedConnections.indexOf(unblockUserId);
        if (blockIdx > -1) {
            blockedConnections.splice(blockIdx, 1);
            activeConnections.push(unblockUserId)
        } else {
            throw new Error('User not found in the system')
        }
        const blocked = blockedConnections
        const active = activeConnections
        const updatedDoc = await userCtn.findOneAndUpdate(
            { _id: new ObjectId(userId) }, 
            { $set: { 
                'connections.blocked': blocked,
                'connections.active': active,
            } },
            { returnDocument: 'after', returnNewDocument: true }
        )

        if (updatedDoc && updatedDoc.lastErrorObject && updatedDoc.lastErrorObject.updatedExisting) {
            return updatedDoc
        } else {
            throw new Error('Unable to update the active connections list ')
        }
    } else {
        throw new Error('Blocked user not in the block list')
    }
}

const addMessagesToChat = async (senderId, receiverId, message) => {
    const chatsCtx = await chats()
    const usersCtx = await users()
    validators.checkId(senderId)
    validators.checkId(receiverId)

    if (senderId === receiverId) throw new Error('User Id of both the users cannot be same')
    const [user1, user2] = await Promise.all([
        usersCtx.findOne({ _id: new ObjectId(senderId) }),
        usersCtx.findOne({ _id: new ObjectId(receiverId) }),
    ])
    if ((!user1) || (!user2)) {
        throw new Error('User doesnt exist in the system with the given Id')
    }

    const chat = await chatsCtx.findOne({ users: { $all: [senderId, receiverId] }});
    if (chat) {
        const conversation = chat.conversation;
        conversation.push({
            senderId,
            sentAt: new Date().toISOString(),
            message
        })

        const updatedDoc = await chatsCtx.findOneAndUpdate(
            { _id: chat._id }, 
            { $set: {  conversation } },
            { returnDocument: 'after', returnNewDocument: true }
        )

        if (updatedDoc && updatedDoc.lastErrorObject && updatedDoc.lastErrorObject.updatedExisting) {
            return updatedDoc
        } else {
            throw new Error('Unable to udpate the conversation of the users')
        }

    } else {
        const { insertedId } = await chatsCtx.insertOne({
            users: [senderId, receiverId],
            conversation: [{
                senderId,
                sentAt: new Date().toISOString(),
                message
            }],
            isArchived: false
        })

        if((!insertedId) || !insertedId.toString()) 
            throw new Error('Unable to insert band object into mongodb')
        }
        
        return insertedId
}

const chatHistory = async (userId, anotherUserId) => {
    const chatsCtx = await chats()
    const usersCtx = await users()
    validators.checkId(userId)
    validators.checkId(anotherUserId)

    if (userId === anotherUserId) throw new Error('User Id of both the users cannot be same')
    const [user1, user2] = await Promise.all([
        usersCtx.findOne({ _id: new Object(userId) }),
        usersCtx.findOne({ _id: new Object(anotherUserId) }),
    ])
    if ((!user1) || (!user2)) {
        throw new Error('User doesnt exist in the system with the given Id')
    }

    const chat = await chatsCtx.findOne({ users: { $all: [userId, anotherUserId] }});
    if (!chat) {
        throw new Error('No chat found')
    } else {
        return chat
    }
}

const activeChats = async (userId) => {
    const chatsCtx = await chats()
    const usersCtx = await users()
    validators.checkId(userId)

    const user = await usersCtx.findOne({ _id: new Object(userId) })
    if (!user) throw new Error('User does not exist in the system')

    const chatsObj = await chatsCtx.find({ users: { $in: [userId] }});
    if (!chatsObj) {
        throw new Error('No chats found for the user')
    } else {
        const filteredChats = removeBlockedChats(chatsObj, user.blocked)
        const chatUserIds = getChatUserIds(filteredChats)
        const users = await getUsersByIds(chatUserIds)
        const maskedUsers = formatListOfUsers(users)
        return {
            chats: filteredChats,
            users: maskedUsers
        }
    }
}

const getUsersByIds = async (ids) => {
    const usersCtx = await users()
    const users = usersCtx.find({ _id: {$in: ids} });

    return users.map((user) => formatUser(user));
}

const mapSocketIdToUser = async ({ socketId, userId }) => {
    const socketsCtx = await sockets()
    const updatedDoc = await socketsCtx.findOneAndUpdate(
        { userId }, 
        { $set: {  userId, socketId } },
        { upsert: true, returnDocument: 'after', returnNewDocument: true }
    )

    if (updatedDoc && updatedDoc.lastErrorObject && updatedDoc.lastErrorObject.upserted) {
        console.log(userId, 'socket mapping created');
        return true
    } else if (updatedDoc && updatedDoc.lastErrorObject && updatedDoc.lastErrorObject.updatedExisting) {
        console.log(userId, 'socket mapping updated')
        return true
    } else {
        return false
    }
}

export { addConnection, blockConnection, unblockConnection, addMessagesToChat, activeChats, chatHistory, mapSocketIdToUser };