import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Filter from 'bad-words';

import './index.css'
import CustomButton from '../custom-button';
import CustomTextField from '../custom-textfield';
import { initConnection, sendMessage, receiveMessage } from '../custom-socket'
import { blockUser, archiveChat, getChatHistory } from '../../api/connections';
import { getUserId } from '../../helper';
import { toast, ToastContainer } from 'react-toastify/dist/react-toastify.js';
import FeedBackPop from '../../components/feedBack/feedBackPop';
import { feedbackTriggerCount } from '../../helper/constants';

function ChatWindow(props) {
    const {
        allowSearch,
        connectionId,
        connectionName,
        allowBlocking,
        allowArchiving,
        allowMessaging,
        removeConnection,
        onConnectionUpdate,
        updateArchiveStatus
    } = props;
    const [msgCount, setMsgCount] = useState(0);
    const [conversation, setConversation] = useState([]);
    const [filteredChats, setFilterChats] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [senderId, setSenderId] = useState('');
    const [archivedBy, setArchivedBy] = useState([]);
    const [chatId, setChatId] = useState('');
    const filter = new Filter();
    const [openFeedbackModal, setOpenFeedbackModal] = useState(false);

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
                    setChatId(response.data.chats[0]?._id);
                    setArchivedBy(response.data.chats[0]?.archivedBy || []);
                    setConversation(response.data.chats[0]?.conversation);
                };
            };
            fetchConversation();
        };
    }, [connectionId]);

    useEffect(() => {
        initConnection(senderId)
        receiveMessage(onReceiveMessage);
    }, []);

    useEffect(() => {
        let element = document.getElementById('chat-container');
        if (element) {
            element.scrollTop = element.scrollHeight - element.clientHeight
        };
    }, [conversation])

    const onChangeOfValue = (_key, value) => {
        setCurrentMessage(value);
    };
    const sendText = async () => {
        sendMessage(senderId, connectionId, filter.clean(currentMessage));
        const msgObj = {
            sentAt: new Date().toString(),
            message: filter.clean(currentMessage),
            senderId
        };
        setConversation(conversation => conversation.concat([msgObj]));
        if (onConnectionUpdate) {
            onConnectionUpdate(connectionId, msgObj?.message);
        };
        setCurrentMessage('');
        setMsgCount(msgCount + 1);
        if (msgCount + 1 === feedbackTriggerCount && !openFeedbackModal) {
            if (!chatId) {
                const response = await getChatHistory(connectionId);
                if (response?.data?.chats) {
                    setChatId(response.data.chats[0]?._id);
                };
            }
            setOpenFeedbackModal(true);
        };
    };
    const onReceiveMessage = (msgObj) => {
        if (msgObj?.senderId === connectionId) {
            const receivedMsg = {
                sentAt: new Date().toString(),
                message: msgObj?.message,
                senderId: msgObj?.senderId
            };
            setConversation(conversation => conversation.concat([receivedMsg]));
        };
        onConnectionUpdate(msgObj?.senderId, msgObj?.message, msgObj?.senderId !== connectionId);

    };
    const blockConnection = async () => {
        const response = await blockUser(connectionId);
        if (response?.status === 200) {
            const successMsg = response?.data?.message || 'User blocked successfully';
            toast.success(successMsg);
            removeConnection();
        } else {
            const errorMsg = response?.data?.error || 'Error in blocking user';
            toast.error(errorMsg);
        };
    };

    const onUpdateSearchTerm = (_key, value) => {
        setSearchTerm(value);
        if (!value) {
            setFilterChats(conversation);
        } else {
            let searchResults = JSON.parse(JSON.stringify(conversation));
            searchResults = searchResults?.filter((msgObj) => msgObj?.message?.toLowerCase()?.includes(value?.toLowerCase()));
            setFilterChats(searchResults);
        };
    };

    const hideCurrentChat = async () => {
        const response = await archiveChat(chatId);
        if (response?.status === 200) {
            const successMsg = response?.data?.message || 'Updated archive status successfully';
            toast.success(successMsg);
            if (archivedBy?.includes(senderId)) {
                archivedBy.splice(archivedBy.indexOf(senderId), 1);
                updateArchiveStatus(false);
            } else {
                archivedBy.push(senderId);
                updateArchiveStatus(true);
            };
        } else {
            const errorMsg = response?.data?.error || 'Could not update archive status';
            toast.error(errorMsg);
        };
    };

    const resetFeedbackModal = () => {
        setOpenFeedbackModal(false);
        setMsgCount(0);
    };

    return (
        <div className='custom-chat-container'>
            <ToastContainer />
            <span className='chat-window-title'>{connectionName ? connectionName : 'Current Chat'}</span>
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
                {
                    allowArchiving ? <CustomButton title={archivedBy?.includes(senderId) ? 'Unarchieve Chat' : 'Archive Chat'} onClick={hideCurrentChat} /> : null
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
                        <CustomButton title={'Send'} onClick={sendText} disabled={!currentMessage} />
                    </div>
                ) : null
            }

            <FeedBackPop
              chatId={chatId}
              username={connectionName}
              isOpen={openFeedbackModal}
              closeModal={resetFeedbackModal}
            />
        </div>
    )
};

ChatWindow.defaultProps = {
    allowSearch: false,
    allowBlocking: false,
    allowMessaging: false,
    allowArchiving: false,
    connectionId: '',
    connectionName: '',
};

ChatWindow.propTypes = {
    allowSearch: PropTypes.bool,
    allowBlocking: PropTypes.bool,
    allowMessaging: PropTypes.bool,
    allowArchiving: PropTypes.bool,
    connectionId: PropTypes.string,
    connectionName: PropTypes.string,
};

export default ChatWindow;
