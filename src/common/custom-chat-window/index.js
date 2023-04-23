import React, {useState, useEffect} from 'react';
import './index.css'
import CustomButton from '../custom-button';
import SearchIcon from '@mui/icons-material/Search';
import CustomTextField from '../custom-textfield';
import { initConnection, sendMessage, receiveMessage } from '../custom-socket'

export default function ChatWindow(props) {
    const {allowSearch = false, allowBlocking = false, allowMessaging = false, chatHistory = {}, updateConversation} = props;
    const [messages, setMessages] = useState(chatHistory?.conversation);
    const [currentMessage, setCurrentMessage] = useState('');
    // TODO - store logged in users id
    const currentUserId = '644406498781b6017e69fb98';
    // TODO - get from chathistory
    const receiverId = '644406898781b6017e69fb99';
    // // TODO - remove this var once msgs are properly updated in parent component and in api
    // let testMessages = JSON.parse(JSON.stringify(messages));

    useEffect(() => {
        initConnection('644406498781b6017e69fb98')
        receiveMessage(addMessageToHistory)
    });
    const changeCurrentMessage = (msg) => {
        // console.log('current message on blur', currentMessage);
        // setCurrentMessage(msg);
    };
    const onChangeOfValue = (key, value) => {
        console.log('current message on change', currentMessage);
        setCurrentMessage(value);
    };
    const sendText = () => {
        sendMessage(currentUserId, receiverId, currentMessage);
        // TODO - how should it be sent? via api or socket is fine?
        const message = {
            sentAt: new Date().toString(), // Should be sent by sender and not formed here
            message: currentMessage,
            senderId: currentUserId
        }
        updateConversation(message);
        // testMessages.push({
        //     sentAt: new Date().toString(), // Should be sent by sender and not formed here
        //     message: currentMessage,
        //     senderId: currentUserId
        // });
        // console.log('testmessages', testMessages);
        setCurrentMessage('')
    };
    const addMessageToHistory = (msgObj) => {
        // TODO - Have to update in chatHistory?.conversation in parent and in API
        // testMessages.push({
        //     sentAt: new Date().toString(), // Should be sent by sender and not formed here
        //     message: msgObj.message,
        //     senderId: msgObj.senderId
        // });
        // testMessages = [];
        setCurrentMessage('')
    };
    return (
        <div className='container'>
            <div className='header-container'>
                {
                    allowSearch ? (
                        <>
                            <SearchIcon />
                            <span>Search Message</span>
                        </>
                    ) : null
                }
                {
                    allowBlocking ? <CustomButton title={'Block User'} /> : null
                }
            </div>
            <div className='chat-container'>
                {/* TODO - change to messages once messages useState is in place */}
                {messages?.map(function(item) {
                    return <>
                        {
                            item?.senderId === currentUserId ? (
                                // Current user sender - Show on right side
                                <span className='sent-message' key={item.sentAt}>{item.message}</span>
                            ) : (
                                // other persons msg - show on left side
                                <span className='received-message' key={item.sentAt}>{item.message}</span>
                            )
                        }
                    </>
                })}
            </div>
            {
                allowMessaging ? (
                    <div className='footer-container'>
                        <CustomTextField
                            onBlur={changeCurrentMessage}
                            error={false}
                            helperText={'Type Message'}
                            name=''
                            value={currentMessage}
                            onChange={onChangeOfValue}
                        />
                        <CustomButton title={'Send'} onClick={sendText} />
                    </div>
                ) : null
            }
        </div>
    )
};
