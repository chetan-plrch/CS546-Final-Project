import io from 'socket.io-client'
const socket = io("http://localhost:3002")

socket.on("connect", () => {
    console.log('--- Socket connected! ---', socket.id);
});
  
socket.on("disconnect", () => {
    console.log('--- Socket disconnected! ---', socket.id);
});

const receiveMessage = (cb) => {
    socket.on('message', (message) => {
        console.log('--- Message received ---', message)
        cb(message)
    })
}

const sendMessage = (message) => {
    console.log('--- Message sent ---')
    /*  Message format:
        {
            senderId: '643ff686c247dff863008adf',
            receiverId: '6439851768f667131bd19b4a',
            message: 'This is a change'
        }
    */
    socket.emit('message', message)
}

export default {
    sendMessage,
    receiveMessage
}