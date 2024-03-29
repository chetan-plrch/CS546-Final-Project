import { axiosApi } from './api-interceptor';

// Gets history of chat between two users
const getChatHistory = async (connectionId) => {
    try {
        const chatHistoryResponse = await axiosApi.get(`/chat/active-chat/${connectionId}`);
        return chatHistoryResponse;
    } catch (e) {
        console.log('error occurred', e);
    };
};

// Blocks a user from sending messages to logged in user
const blockUser = async (blockConnectionId) => {
    try {
        const blockUserResponse = await axiosApi.put('/chat/block', {
            blockConnectionId
        });
        return blockUserResponse;
    } catch (error) {
        return error;
    };
};

// Archive or unarchive a chat
const archiveChat = async (chatId) => {
    try {
        const archiveChatResponse = await axiosApi.put('/chat/archive', {
            chatId
        });
        return archiveChatResponse;
    } catch (error) {
        return error;
    };
};

// Gets all active connections for logged in user
const getAllConnections = async () => {
    try {
        const response = await axiosApi.get(`/chat/all-connections`);
        return response;
    } catch (e) {
        console.log('error occurred', e);
    };
};

export { blockUser, archiveChat, getChatHistory, getAllConnections };
