import { axiosApi } from "./api-interceptor";

// Gets history of chat between two users
const getChatHistory = async (users) => {
    try {
        const chatHistoryResponse = await axiosApi.post("/chat/history", {
            users
        });
        return chatHistoryResponse;
    } catch (e) {
        console.log("error occurred", e);
    };
};

// Blocks a user from sending messages to logged in user
const blockUser = async (blockConnectionId) => {
    try {
        const blockUserResponse = await axiosApi.post("/chat/block", {
            blockConnectionId
        });
        return blockUserResponse;
    } catch (e) {
        console.log("error occurred", e);
    };
};

// Gets all active connections for logged in user
const getAllConnections = async (loggedInUserId) => {
    try {
        const allConnectionsResponse = await axiosApi.get(`/chat/active/${loggedInUserId}`);
        return allConnectionsResponse;
    } catch (e) {
        console.log("error occurred", e);
    };
};

export { blockUser, getChatHistory, getAllConnections };
