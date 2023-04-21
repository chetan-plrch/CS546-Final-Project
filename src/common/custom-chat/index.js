import React, { useEffect, useState } from 'react'
import { initConnection, sendMessage, receiveMessage } from '../custom-socket'

const ChatBox = (props) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    
    useEffect(() => {
        initConnection(props.user1)
        receiveMessage(receive)
    }, []);

    const receive = (message) => {
        setMessages([...messages, message])
    }

    const send = (e) => {
        sendMessage(props.user1, props.user2, input)
    }

    const onChange = (e) => {
        setInput(e.target.value)
    }

    return <div>
        <input onChange={onChange} />
        <button onClick={send}>Send message</button>
        <div>
            {messages.map((message) => {
                return <div>
                    <div>{message.senderId}</div>
                    <div>{message.receiverId}</div>
                    <div>{message.message}</div>
                </div>
            })}
        </div>
    </div>
}

export default ChatBox