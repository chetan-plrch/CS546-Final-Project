import React, {useState} from 'react';
import './index.css'
import CustomButton from '../custom-button';
import SearchIcon from '@mui/icons-material/Search';
import CustomTextField from '../custom-textfield';

export default function ChatWindow(props) {

    const {allowSearch = false, allowBlocking = false, allowMessaging = false, chatHistory = {}} = props;

    const [messages, setMessages] = useState(chatHistory?.conversation);
    const [currentMessage, setCurrentMessage] = useState('');
    // TODO - store logged in users id
    const currentUserId = '644406498781b6017e69fb98';
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
                            onBlur={() => {}}
                            error={false}
                            helperText={''}
                            name='Type Message'
                            value={currentMessage}
                            onChange={(message) => setCurrentMessage(message)}
                        />
                        <CustomButton title={'Send'} />
                    </div>
                ) : null
            }
        </div>
    )
};
