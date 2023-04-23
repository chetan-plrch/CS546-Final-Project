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
  ]);
  // user1={'644406498781b6017e69fb98'}
  // user2={'644406898781b6017e69fb99'}
  const [chatHistory, setChatHistory] = useState({
    "_id": "5c7997a2-c0d2-4f8c-b27a-6a1d4b5b6318",
    "users": [
      "644406498781b6017e69fb98", // seeker - logged in user in example
      "644406898781b6017e69fb99" // listener
    ],
    "conversation": [
      {
        "senderId": "644406498781b6017e69fb98",
        "sentAt": "2023-03-26T15:31:09.942Z",
        "message": "Hi! "
      },
     {
        "senderId": "644406898781b6017e69fb99",
        "sentAt": "2023-03-27T16:31:09.942Z",
        "message": "How are you?"
      },
     {
        "senderId": "644406498781b6017e69fb98",
        "sentAt": "2023-03-28T17:31:09.942Z",
        "message": "I'm good!"
      },
    ],
    "isArchived": false
  });

  const updateConversation = (message) => {
    const latestChat = chatHistory.conversation.concat([message]);
    setChatHistory({...chatHistory, conversation: latestChat});
    console.log("Parent has updated chathistory", chatHistory);
  };
  return (
    <div className='container'>
    {
    chatList.length ? (
      <div className='conversation-container'>
        <CustomList list={chatList} />
        <ChatWindow
          allowSearch={true}
          allowBlocking={true}
          allowMessaging={true}
          chatHistory={chatHistory}
          updateConversation={updateConversation}
          />
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
