import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import './index.css'
import CustomButton from '../custom-button';
import CustomTextField from '../custom-textfield';
import { initConnection, sendMessage, receiveMessage } from '../custom-socket'
import { blockUser } from '../../api/connections';

// TODO - Remove from here package.json and here once API is in place
import { browserName } from 'react-device-detect'

function ChatWindow(props) {
    const {allowSearch, allowBlocking, allowMessaging, chatHistory, updateConversation} = props;
    let conversation = chatHistory?.conversation;
    const [filteredChats, setFilterChats] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    // TODO - store logged in users id as senderId
    let senderId = browserName === 'Chrome' ? '6447089a9170fd2d3e34ecc5' : '644708c99170fd2d3e34ecc6';
    // TODO - get from chathistory
    let receiverId = browserName === 'Chrome' ? '644708c99170fd2d3e34ecc6' : '6447089a9170fd2d3e34ecc5';

    useEffect(() => {
        // TODO - use correct senderId
        initConnection(senderId)
        receiveMessage(addMessageToHistory);
        let element = document.getElementById('chat-container');
        if (element) {
            element.scrollTop = element.scrollHeight - element.clientHeight
        };
    }, [conversation]);

    const onChangeOfValue = (key, value) => {
        setCurrentMessage(value);
    };
    const sendText = () => {
        sendMessage(senderId, receiverId, currentMessage);
        // TODO - how should it be sent? via api or socket is fine?
        const msgObj = {
            sentAt: new Date().toString(), // Should be sent by sender and not formed here
            message: currentMessage,
            senderId
        };
        updateConversation(msgObj);
        setCurrentMessage('')
    };
    const addMessageToHistory = (msgObj) => {
        // TODO - Have to update in chatHistory?.conversation in parent and in API
        // const msg = {
        //     sentAt: new Date().toString(), // Should be sent by sender and not formed here
        //     message: msgObj?.message,
        //     senderId: msgObj?.receiverId
        // };
        updateConversation({...msgObj, sentAt: new Date().toString()});
    };
    const blockConnection = async () => {
        const response = await blockUser(receiverId);
        // TODO - update parent to remove current connection from list
    };
    const onUpdateSearchTerm = (_key, value) => {
        setSearchTerm(value);
        if (!value) {
            setFilterChats(conversation);
        } else {
            let searchResults = JSON.parse(JSON.stringify(conversation));
            searchResults = searchResults?.filter((msgObj) => msgObj?.message?.toLowerCase().includes(value?.toLowerCase()));
            setFilterChats(searchResults);
        };
    };

    return (
        <div className='container'>
            <div className='header-container'>
                {
                    allowSearch ? (
                        <CustomTextField
                            name='Search'
                            value={searchTerm}
                            onChange={onUpdateSearchTerm}
                        />
                    ) : null
                }
                {
                    allowBlocking ? <CustomButton title='Block User' onClick={blockConnection} /> : null
                }
            </div>
            {
                (conversation?.length || (searchTerm && filteredChats.length)) ? (
                    <div className='chat-container' id='chat-container'>
                        {(searchTerm ? filteredChats : conversation)?.map(function(item) {
                            return <span
                                        key={item?.sentAt}
                                        className={item?.senderId === senderId ? 'sent-message' : 'received-message'}
                                    >
                                        {item?.message}
                                    </span>
                        })}
                    </div>
                ) : (
                    <div className='chat-container no-chat-container'>
                        No chats to display
                    </div>
                )
            }
            {
                allowMessaging ? (
                    <div className='footer-container'>
                        <CustomTextField
                            name='Type Message'
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

// allowSearch = false, allowBlocking = false, allowMessaging = false, chatHistory = {}, updateConversation

ChatWindow.defaultProps = {
    allowSearch: false,
    allowBlocking: false,
    allowMessaging: false,
    chatHistory: {},
    updateConversation: () => {}
};

ChatWindow.propTypes = {
    allowSearch: PropTypes.bool,
    allowBlocking: PropTypes.bool,
    allowMessaging: PropTypes.bool,
    chatHistory: PropTypes.object,
    updateConversation: PropTypes.func
};

export default ChatWindow;
