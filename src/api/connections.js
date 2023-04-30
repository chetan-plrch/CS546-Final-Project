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
        const blockUserResponse = await axiosApi.post('/chat/block', {
            blockConnectionId
        });
        return blockUserResponse;
    } catch (e) {
        console.log('error occurred', e);
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

export { blockUser, getChatHistory, getAllConnections };
