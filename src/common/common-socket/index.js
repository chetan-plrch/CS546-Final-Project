import React from 'react'
import io from 'socket.io-client'

const socket = io("http://localhost:3002")

socket.on("connect", () => {
    console.log('--- Socket connected! ---', socket.id);
});
  
socket.on("disconnect", () => {
    console.log('--- Socket disconnected! ---', socket.id);
});

socket.on('message', (message) => {
    console.log('--- Message received ---', message)
})

const sendMessage = () => {
    console.log('--- Message sent ---')
    socket.emit('message', {
        senderId: '643ff686c247dff863008adf',
        receiverId: '6439851768f667131bd19b4a',
        message: 'This is a change'
    })
}

const Socket = () => {
    return <button onClick={sendMessage}>
        Send message
    </button>
}

export default Socket