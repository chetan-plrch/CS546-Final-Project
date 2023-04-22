import { ObjectId } from 'mongodb'
import { users, chats, sockets } from "../config/mongoCollections.js";
import validators from '../validations.js'
import { removeBlockedChats, formatUser, getChatUserIds, errorObject, errorType } from '../util.js'

const addConnection = async (userId, connectionUserId) => {
    if (userId === connectionUserId) {
        throw errorObject(errorType.NOT_FOUND, 'User id and connecting user id cannot be same!')
    }
    const userCtn = await users()
    const [user, connectingUser] = await Promise.all([
        userCtn.findOne({ _id: new ObjectId(userId) }),
        userCtn.findOne({ _id: new ObjectId(connectionUserId) })
    ]);
    if (!user) {
        throw errorObject(errorType.NOT_FOUND, 'User not found in the system')
    } else if (!connectingUser) {
        throw errorObject(errorType.NOT_FOUND, 'Connecting user not found in the system')
    }
    const activeConnections = new Set(user.connections.active)
    if(activeConnections.has(connectionUserId)) {
        return true
    } else {
        const active = [...user.connections.active, connectionUserId]
        const updatedDoc = await userCtn.findOneAndUpdate(
            { _id: new ObjectId(userId) }, 
            { $set: { 'connections.active': active } },
            { returnDocument: 'after', returnNewDocument: true }
        )

        if (updatedDoc && updatedDoc.lastErrorObject && updatedDoc.lastErrorObject.updatedExisting) {
            return true
        } else {
            throw new Error('Unable to update the users active connections')
        }
    }
}

const blockConnection = async (userId, blockUserId) => {
    if (userId === blockUserId) {
        throw errorObject(errorType.BAD_INPUT, 'User id and blocking user id cannot be same!')
    }

    const userCtn = await users()
    const [user, blockedUser] = await Promise.all([
        userCtn.findOne({ _id: new ObjectId(userId) }),
        userCtn.findOne({ _id: new ObjectId(blockUserId) })
    ]);
    if (!user) {
        throw errorObject(errorType.NOT_FOUND, 'User not found in the system')
    } else if (!blockedUser) {
        throw errorObject(errorType.NOT_FOUND, 'Blocking user not found in the system')
    }

    const activeConnections = user.connections.active
    const blockedConnections = user.connections.blocked
    const blockedConnectionsSet = new Set(user.connections.blocked)
    if(blockedConnectionsSet.has(blockUserId)) {
        return true;
    } else {
        const blockIdx = activeConnections.indexOf(blockUserId);
        if (blockIdx > -1) {
            activeConnections.splice(blockIdx, 1);
            blockedConnections.push(blockUserId)
        } else {
            throw errorObject(errorType.BAD_INPUT, 'Blocking user is not in the active list of the user')
        }
        const updatedDoc = await userCtn.findOneAndUpdate(
            { _id: new ObjectId(userId) }, 
            { $set: { 
                'connections.blocked': blockedConnections,
                'connections.active': activeConnections 
            } },
            { returnDocument: 'after', returnNewDocument: true }
        )

        if (updatedDoc && updatedDoc.lastErrorObject && updatedDoc.lastErrorObject.updatedExisting) {
            return true
        } else {
            throw new Error('Unable to update the blocked list of the user')
        }
    }
}

const unblockConnection = async (userId, unblockUserId) => {
    if (userId === unblockUserId) {
        throw errorObject(errorType.BAD_INPUT, 'User id and unblocking user id cannot be same!')
    }
    const userCtn = await users()
    const [user, unblockedUser] = await Promise.all([
        userCtn.findOne({ _id: new ObjectId(userId) }),
        userCtn.findOne({ _id: new ObjectId(unblockUserId) })
    ]);
    if (!user) {
        throw errorObject(errorType.NOT_FOUND, 'User not found in the system')
    } else if (!unblockedUser) {
        throw errorObject(errorType.NOT_FOUND, 'Unblocking user not found in the system')
    }

    const activeConnections = user.connections.active
    const blockedConnections = user.connections.blocked
    const blockedConnectionsSet = new Set(blockedConnections)
    if(blockedConnectionsSet.has(unblockUserId)) {
        const blockIdx = blockedConnections.indexOf(unblockUserId);
        if (blockIdx > -1) {
            blockedConnections.splice(blockIdx, 1);
            activeConnections.push(unblockUserId)
        } else {
            throw errorObject(errorType.BAD_INPUT, 'User is not in the block list of the user to unblock')
        }
        const updatedDoc = await userCtn.findOneAndUpdate(
            { _id: new ObjectId(userId) }, 
            { $set: { 
                'connections.blocked': blockedConnections,
                'connections.active': activeConnections,
            } },
            { returnDocument: 'after', returnNewDocument: true }
        )

        if (updatedDoc && updatedDoc.lastErrorObject && updatedDoc.lastErrorObject.updatedExisting) {
            return true
        } else {
            throw new Error('Unable to update the active connections list ')
        }
    } else {
        throw errorObject(errorType.BAD_INPUT, 'User not in the block list to unblock')
    }
}

const addMessagesToChat = async (sId, rId, message) => {
    const chatsCtx = await chats()
    const usersCtx = await users()
    const senderId = validators.checkId(sId, 'senderId')
    const receiverId = validators.checkId(rId, 'receiverId')

    if (senderId === receiverId) {
        throw errorObject(errorType.BAD_INPUT, 'User Id of both sender and receiver cannot be same')
    }
    const [sender, receiver] = await Promise.all([
        usersCtx.findOne({ _id: new ObjectId(senderId) }),
        usersCtx.findOne({ _id: new ObjectId(receiverId) }),
    ])
    if ((!sender) || (!receiver)) {
        throw errorObject(errorType.NOT_FOUND, 'User doesnt exist in the system with the given Id')
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
            return true
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

        if((!insertedId) || !insertedId.toString()) {
            throw new Error('Unable to insert band object into mongodb')
        }
        
        return insertedId
    }
}

const activeChat = async (uId, anUserId, onlyUsers) => {
    const chatsCtx = await chats()
    const usersCtx = await users()
    const userId = validators.checkId(uId, 'userId')
    const anotherUserId = validators.checkId(anUserId, 'anotherUserId')

    if (userId === anotherUserId) {
        throw errorObject(errorType.BAD_INPUT, 'User Id of both the users cannot be same')
    }
    const [user1, user2] = await Promise.all([
        usersCtx.findOne({ _id: new ObjectId(userId) }),
        usersCtx.findOne({ _id: new ObjectId(anotherUserId) }),
    ])
    if ((!user1) || (!user2)) {
        throw errorObject(errorType.NOT_FOUND, 'User doesnt exist in the system with the given Id')
    }

    const chat = await chatsCtx.findOne({ users: { $all: [userId, anotherUserId] }});
    if (!chat) {
        throw errorObject(errorType.BAD_INPUT, 'No chat found')
    } else {
        const { users, chats } = await getfilteredChatAndUsers([chat], user1.connections.blocked)
        if (onlyUsers) {
            return { users };
        }
        return { users, chats }
    }
}

const allActiveChats = async (userId, onlyUsers) => {
    const chatsCtx = await chats()
    const usersCtx = await users()

    const user = await usersCtx.findOne({ _id: new ObjectId(userId) })
    if (!user) {
        throw errorObject(errorType.NOT_FOUND, 'User not found')
    }

    const chatsObj = await chatsCtx.find({ users: { $in: [userId] }}).toArray();
    if (!chatsObj) {
        throw errorObject(errorType.NOT_FOUND, 'No chats found for the user')
    } else {
        const { users, chats } = await getfilteredChatAndUsers(chatsObj, user.connections.blocked)
        if (onlyUsers) {
            return { users };
        }
        return { users, chats }
    }
}

const getfilteredChatAndUsers = async (chatsObj, blocked) => {
    const filteredChats = removeBlockedChats(chatsObj, blocked)
    if (filteredChats.length === 0) {
        throw errorObject(errorType.NOT_FOUND, 'No chats found for the user')
    }
    const chatUserIds = getChatUserIds(filteredChats)
    const maskedUsers = await getUsersByIds(chatUserIds)
    const usersWithLastMessage = getUserWithLastMessage(maskedUsers, filteredChats)
    return {
        chats: filteredChats,
        users: usersWithLastMessage
    }
}

const getUsersByIds = async (ids) => {
    const usersCtx = await users()
    const usersArr = await usersCtx.find({ _id: {$in: ids} }).toArray();
    return usersArr.map((user) => formatUser(user));
}

const getUserWithLastMessage = async (users, chats) => {
    return users.map((user) => {
        const userId = user._id;
        const chatFound = chats.find((chat) => chat.users.includes(userId));

        if (chatFound && chatFound.conversation && chatFound.conversation.length > 0)  {
            const lastChat = chatFound.conversation[chatFound.conversation.length - 1]
            const lastMessage = lastChat.message
            return { ...user, lastMessage }
        } else {
            return { ...user, lastMessage: 'No last message' }
        }
    })
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

export { addConnection, blockConnection, unblockConnection, addMessagesToChat, allActiveChats, activeChat, mapSocketIdToUser };