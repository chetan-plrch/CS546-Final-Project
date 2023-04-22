import React from 'react';
import './index.css'
import CustomButton from '../custom-button';
import SearchIcon from '@mui/icons-material/Search';

export default function ChatWindow(props) {

    const {allowSearch = false, allowBlocking = false, allowMessaging = false} = props;

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
                Chats go here
            </div>
            {
                allowMessaging ? (
                    <div className='footer-container'>
                        <CustomButton title={'Type a message'} />
                        <CustomButton title={'Send'} />
                    </div>
                ) : null
            }
        </div>
    )
};
