import React, { useState } from 'react';
import './index.css'
import CustomList from "../../common/custom-list";
import ChatWindow from '../../common/custom-chat-window';

const Connections = () => {
  const [chatList, setChatList] = useState([
    {
      userName: 'Dr. Brian Griffin',
      lastMessage: 'See you in the next session. Happy Weekend!'
    },
    {
      userName: 'Anisha Malhotra',
      lastMessage: 'I feel better now. Thank you Anisha.'
    }
  ])
  return (
    <div className='container'>
    {
    chatList.length ? (
      <div className='conversation-container'>
        <CustomList list={chatList} />
        <ChatWindow allowSearch={true} allowBlocking={true} />
      </div>
    ) : (
      <span>
        Please connect with professionals to get help
      </span>
    )
    }
    </div>
  );
};

export default Connections;
