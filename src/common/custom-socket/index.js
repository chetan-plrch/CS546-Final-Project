import io from 'socket.io-client'

let socket = null

export const initConnection = (userId) => {
    socket = io("http://localhost:3002", { query: { userId } });

    socket.on("connect", () => {
        console.log('--- Socket connected! ---', socket.id);
    });
      
    socket.on("disconnect", () => {
        console.log('--- Socket disconnected! ---', socket.id);
    });
}

export const receiveMessage = (cb) => {
    socket.on('message', (message) => {
        console.log('--- Message received ---', message)
        cb(message)
    })
}

export const sendMessage = (senderId, receiverId, message) => {
    console.log('--- Message sent ---')
    /*  Message format:
        {
            senderId: '643ff686c247dff863008adf',
            receiverId: '6439851768f667131bd19b4a',
            message: 'This is a change'
        }
    */
    socket.emit('message', { senderId, receiverId, message })
}

export const onError = (cb) => {
    socket.on('error', function (err) {
        console.log(' --- Error in socket --- ', err)
        cb(err)
    });
}

window.sendMessage = sendMessage
window.receiveMessage = receiveMessage