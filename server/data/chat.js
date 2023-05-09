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
        userCtn.findOne({ _id: new ObjectId(userId) }, { projection:{ password: 0 } }),
        userCtn.findOne({ _id: new ObjectId(connectionUserId) }, { projection:{ password: 0 } })
    ]);
    if (!user) {
        throw errorObject(errorType.NOT_FOUND, 'User not found in the system')
    } else if (!connectingUser) {
        throw errorObject(errorType.NOT_FOUND, 'Connecting user not found in the system')
    }
    const user1ActiveCon = new Set(user.connections.active)
    const user2ActiveCon = new Set(connectingUser.connections.active)
    let active = user.connections.active
    let active2 = connectingUser.connections.active
    if(!user1ActiveCon.has(connectionUserId)) {
        active = [...active, connectionUserId]
    }
    
    if(!user2ActiveCon.has(userId)) {
        active2 = [...active2, userId]
    }

    const updatedDoc = await userCtn.findOneAndUpdate(
        { _id: new ObjectId(userId) }, 
        { $set: { 'connections.active': active } },
        { returnDocument: 'after', returnNewDocument: true }
    )

    const updatedDoc2 = await userCtn.findOneAndUpdate(
        { _id: new ObjectId(connectionUserId) }, 
        { $set: { 'connections.active': active2 } },
        { returnDocument: 'after', returnNewDocument: true }
    )

    if (updatedDoc && updatedDoc.lastErrorObject && updatedDoc.lastErrorObject.updatedExisting) {
        return true
    } else {
        throw new Error('Unable to update the users active connections')
    }
}

const blockConnection = async (userId, blockUserId) => {
    if (userId === blockUserId) {
        throw errorObject(errorType.BAD_INPUT, 'User id and blocking user id cannot be same!')
    }

    const userCtn = await users()
    const [user, blockedUser] = await Promise.all([
        userCtn.findOne({ _id: new ObjectId(userId) }, { projection:{ password: 0 } }),
        userCtn.findOne({ _id: new ObjectId(blockUserId) }, { projection:{ password: 0 } })
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
            blockedConnections.push(blockUserId)
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
        userCtn.findOne({ _id: new ObjectId(userId) }, { projection:{ password: 0 } }),
        userCtn.findOne({ _id: new ObjectId(unblockUserId) }, { projection:{ password: 0 } })
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
            activeConnections.push(unblockUserId)
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
        usersCtx.findOne({ _id: new ObjectId(senderId) }, { projection:{ password: 0 } }),
        usersCtx.findOne({ _id: new ObjectId(receiverId) }, { projection:{ password: 0 } })
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
            archivedBy: []
        })

        if((!insertedId) || !insertedId.toString()) {
            throw new Error('Unable to insert band object into mongodb')
        }
        
        await addConnection(senderId, receiverId)

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
        usersCtx.findOne({ _id: new ObjectId(userId) }, { projection:{ password: 0 } }),
        usersCtx.findOne({ _id: new ObjectId(anotherUserId) }, { projection:{ password: 0 } })
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

// Archive a chat
const archiveChat = async (uId, chatId) => {
    const chatsCtx = await chats();
    const userId = validators.checkId(uId, 'userId');
    const validatedChatId = validators.checkId(chatId, 'chatId');
    const existingChat = await chatsCtx.findOne({"_id": new ObjectId(chatId)});
    const archivedBy = existingChat?.archivedBy || [];
    if (archivedBy.includes(userId)) {
        // Unarchive chat
        archivedBy.splice(archivedBy.indexOf(userId), 1);
    } else {
        // Archive chat
        archivedBy.push(userId);
    };
    const res = await chatsCtx.findOneAndUpdate(
        { _id: new ObjectId(validatedChatId) },
        {
            $set: { archivedBy },
        },
        { upsert: true, returnDocument: 'after', returnNewDocument: true }
    );
    if (res?.lastErrorObject?.updatedExisting) {
        return true;
    } else {
        throw new Error('Unable to update the archived status of the chat');
    };
};



const allActiveChats = async (userId, onlyUsers) => {
    const chatsCtx = await chats()
    const usersCtx = await users()

    const user = await usersCtx.findOne({ _id: new ObjectId(userId) }, { projection:{ password: 0 } })
    if (!user) {
        throw errorObject(errorType.NOT_FOUND, 'User not found')
    }

    const chatsObj = await chatsCtx.find({ users: { $in: [userId] }}).toArray();
    if (!chatsObj) {
        throw errorObject(errorType.NOT_FOUND, 'No chats found for the user')
    } else {
        let { users, chats } = await getfilteredChatAndUsers(chatsObj, user.connections.blocked)
        users = users.filter(user => user._id !== userId)
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
    const usersArr = await usersCtx.find({ _id: {$in: ids }, isActive: true }).project({ password: 0 }).toArray();
    return ids.reduce((acc, userId) => {
        let user = usersArr.find((u) => userId.toString() === u._id.toString())
        if (user) {
            return [...acc, formatUser(user)]
        }
        return acc;
    }, []);
}



const getUserWithLastMessage = (users, chats) => {
    return users.map((user) => {
        const userId = user._id;
        const chatFound = chats.find((chat) => chat.users.includes(userId));

        if (chatFound && chatFound.conversation && chatFound.conversation.length > 0)  {
            const lastChat = chatFound.conversation[chatFound.conversation.length - 1]
            const lastMessage = lastChat.message
            return { ...user, lastMessage, archivedBy: chatFound?.archivedBy || [] }
        } else {
            return { ...user, lastMessage: 'No last message', archivedBy: [] }
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

const getAllChatId = async()=>{
    const chatCollection = await chats()
    let ans = []
    ans = await chatCollection.find({}, {projection: {_id:1, users:1}}).toArray();
    const result = ans.map(obj => {
        obj._id = obj._id.toString();
        return obj;
      });
    return result;
}

const getChat = async(chatId)=>{
    chatId = validators.checkId(chatId, "chat Id");
    const chatCollection = await chats()
    let ans = []
    ans = await chatCollection.find({_id : new ObjectId(chatId)}, {projection: {_id:1,users:1}}).toArray();
    return ans;
}

export  { addConnection, blockConnection, unblockConnection, addMessagesToChat, allActiveChats, activeChat, mapSocketIdToUser,archiveChat, getAllChatId, getChat };