import { ObjectId } from 'mongodb'

export const roleType = {
    ADMIN: 'ADMIN',
    USER: 'USER'
}

export const errorType = {
    BAD_INPUT: 'BAD_INPUT',
    UNAUTHORIZED: 'UNAUTHORIZED',
    NOT_FOUND: 'NOT_FOUND'
}

export const getChatUserIds = (chats) => {
    const usersSet = chats.reduce((acc, chat) => {
        chat.users.forEach(userId => acc.add(userId))
        return acc;
    }, new Set())
    return Array.from(usersSet).map(userId => new ObjectId(userId))
}

export const formatUser = (user) => {
    if (user.isAnonymous) {
        return {
            _id: user._id.toString(),
            firstname: 'Anonymous',
            lastname: 'user',
            username: user._id.toString(),
            role: user.role
        }
    } else {
        return {
            _id: user._id.toString(),
            firstname: user.firstName,
            lastName: user.lastName,
            userName: user.username,
            role: user.role
        }
    }
}

export const formatListOfUsers = (users) => {
    return users.map(user => {
        return formatUser(user)
    })
}

export const removeBlockedChats = (chats, blockedUserIds) => {
    return chats.reduce((acc, chat) => {
        const found = blockedUserIds.find(blockId => chat.users.includes(blockId))
        if (found) {
            return acc
        } else {
            return [...acc, chat]
        }
    }, []);
}

export const errorObject = (type, msg) => {
    const e = new Error(msg)
    e.type = type
    return e
}
