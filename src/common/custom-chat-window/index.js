import React, {useState, useEffect} from 'react';
import './index.css'
import CustomButton from '../custom-button';
import SearchIcon from '@mui/icons-material/Search';
import CustomTextField from '../custom-textfield';
import { initConnection, sendMessage, receiveMessage } from '../custom-socket'

// TODO - Remove from here package.json and here once API is in place
import { browserName } from "react-device-detect"

export default function ChatWindow(props) {
    const {allowSearch = false, allowBlocking = false, allowMessaging = false, chatHistory = {}, updateConversation} = props;
    let conversation = chatHistory?.conversation;
    const [currentMessage, setCurrentMessage] = useState('');
    // TODO - store logged in users id as senderId
    let senderId = browserName === 'Chrome' ? '6447089a9170fd2d3e34ecc5' : '644708c99170fd2d3e34ecc6';
    // TODO - get from chathistory
    let receiverId = browserName === 'Chrome' ? '644708c99170fd2d3e34ecc6' : '6447089a9170fd2d3e34ecc5';

    useEffect(() => {
        // TODO - Remove once cookie is in place
        // TODO - uncomment once API is in place. Should not get called twice. Verify
        initConnection(senderId)
        receiveMessage(addMessageToHistory)
        let element = document.getElementById("chat-container");
        element.scrollTop = element.scrollHeight - element.clientHeight
        // window.scrollTo(0,element.offsetHeight);
    }, [conversation]);
    const changeCurrentMessage = (msg) => {
        // console.log('current message on blur', currentMessage);
        // setCurrentMessage(msg);
    };
    const onChangeOfValue = (key, value) => {
        console.log('current message on change', currentMessage);
        setCurrentMessage(value);
    };
    const sendText = () => {
        sendMessage(senderId, receiverId, currentMessage);
        // TODO - how should it be sent? via api or socket is fine?
        const msgObj = {
            sentAt: new Date().toString(), // Should be sent by sender and not formed here
            message: currentMessage,
            senderId
        }
        updateConversation(msgObj);
        setCurrentMessage('')
    };
    const addMessageToHistory = (msgObj) => {
        // TODO - Have to update in chatHistory?.conversation in parent and in API
        console.log('msg received', msgObj);
        updateConversation(msgObj);
    };
    const blockUser = () => {
        // Hide chat once users are blocked
        
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
                    allowBlocking ? <CustomButton title={'Block User'} onClick={blockUser} /> : null
                }
            </div>
            <div className='chat-container' id="chat-container">
                {/* TODO - change to messages once messages useState is in place */}
                {conversation?.map(function(item) {
                    return <span
                                key={item?.sentAt}
                                className={item?.senderId === senderId ? "sent-message" : "received-message"}
                            >
                                {item?.message}
                            </span>
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
