const io = require("socket.io")(3001, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
})

chatDocument = {
    "_id": "5c7997a2-c0d2-4f8c-b27a-6a1d4b5b6318", 
    "users": [
        "8f7997a2-c0d2-4f8c-b27a-6a1d4b5b6312", "4e7997a2-c0d2-4f8c-b27a-6a1d4b5b6311"
    ], 
    "conversation": [{ 
        "senderId": "8f7997a2-c0d2-4f8c-b27a-6a1d4b5b6314", "sentAt": "2023-03-26T15:31:09.942Z",
        "message": "Hi! How are you?"
    }], 
    "isArchived": false 
}


io.on("connection", socket => {
    console.log('Socket connection is live!!')

    socket.on("chat", async (user1, user2, message) => {
        
    });
})
