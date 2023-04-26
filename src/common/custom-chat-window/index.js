import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import './index.css'
import CustomButton from '../custom-button';
import CustomTextField from '../custom-textfield';
import { initConnection, sendMessage, receiveMessage } from '../custom-socket'
import { blockUser, getChatHistory } from '../../api/connections';
import { getUserId } from '../../helper';

function ChatWindow(props) {
    const {allowSearch, allowBlocking, allowMessaging, connectionId} = props;
    const [conversation, setConversation] = useState([]);
    const [filteredChats, setFilterChats] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [senderId, setSenderId] = useState('');

    useEffect(() => {
        const senderId = getUserId();
        setSenderId(senderId);
    }, []);

    useEffect(() => {
        if (connectionId) {
            setConversation([]);
            async function fetchConversation() {
                const response = await getChatHistory(connectionId);
                if (response?.data?.chats?.length) {
                    setConversation(response.data.chats[0]?.conversation);
                };
            };
            fetchConversation();
        };
    }, [connectionId]);

    useEffect(() => {
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
        sendMessage(senderId, connectionId, currentMessage);
        const msgObj = {
            sentAt: new Date().toString(),
            message: currentMessage,
            senderId
        };
        setConversation(conversation => conversation.concat([msgObj]));
        setCurrentMessage('')
    };
    const addMessageToHistory = (msgObj) => {
        if (msgObj?.senderId === connectionId) {
            setConversation(conversation => conversation.concat([{...msgObj, sentAt: new Date().toString()}]));
        };
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

ChatWindow.defaultProps = {
    allowSearch: false,
    allowBlocking: false,
    allowMessaging: false,
    connectionId: '',
};

ChatWindow.propTypes = {
    allowSearch: PropTypes.bool,
    allowBlocking: PropTypes.bool,
    allowMessaging: PropTypes.bool,
    connectionId: PropTypes.string,
};

export default ChatWindow;
