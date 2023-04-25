import React, { useState, useEffect } from 'react';
import './index.css'
import CustomList from "../../common/custom-list";
import ChatWindow from '../../common/custom-chat-window';

import { getAllConnections } from '../../api/connections';

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
  // chrome token - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQ3MDg5YTkxNzBmZDJkM2UzNGVjYzUiLCJ1c2VybmFtZSI6InRlc3R1c2Vyb25lIiwiZmlyc3ROYW1lIjoiVGVzdCBVc2VyIiwiaWF0IjoxNjgyMzgxMTY2fQ.pE3krG0d4YKQMkknBf1x3i6vM1Tox9tQ0swrB5B6ufc
  // safari token - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQ3MDhjOTkxNzBmZDJkM2UzNGVjYzYiLCJ1c2VybmFtZSI6InRlc3R1c2VydHdvIiwiZmlyc3ROYW1lIjoiVGVzdCBVc2VyIiwiaWF0IjoxNjgyMzgxMjY1fQ.jQXrk6qFJw_ei4Y6jRFl5tuOrr7zZBC7AynJxgJOfeI
  // user1={'6447089a9170fd2d3e34ecc5'} Listener - chrome - testuserone
  // user2={'644708c99170fd2d3e34ecc6'} Seeker - safari - testusertwo
  const [chatHistory, setChatHistory] = useState({
    "_id": "5c7997a2-c0d2-4f8c-b27a-6a1d4b5b6318",
    "users": [
      "644406498781b6017e69fb98", // seeker - logged in user in example
      "644406898781b6017e69fb99" // listener
    ],
    "conversation": [
      {
        "senderId": "6447089a9170fd2d3e34ecc5",
        "sentAt": "2023-03-26T15:31:09.942Z",
        "message": "Hi! "
      },
     {
        "senderId": "644708c99170fd2d3e34ecc6",
        "sentAt": "2023-03-27T16:31:09.942Z",
        "message": "How are you?"
      },
     {
        "senderId": "6447089a9170fd2d3e34ecc5",
        "sentAt": "2023-04-28T17:31:09.942Z",
        "message": "I'm good!"
      },
      {
        "senderId": "6447089a9170fd2d3e34ecc5",
        "sentAt": "2023-05-28T17:31:09.942Z",
        "message": "The weather is really great today! I am having a good day. Had a great time with my family over the weekend."
      },
      {
        "senderId": "644708c99170fd2d3e34ecc6",
        "sentAt": "2024-03-27T16:31:09.942Z",
        "message": "That's great to hear! I'm glad you are having a good day. I'm doing well too. I had a great weekend as well. I went to the beach with my friends. It was a lot of fun."
      },
      {
        "senderId": "6447089a9170fd2d3e34ecc5",
        "sentAt": "2033-03-28T17:31:09.942Z",
        "message": "I love the beaches here. Always make me feel like I'm on vacation. The sound of the waves is so relaxing."
      },
      {
        "senderId": "644708c99170fd2d3e34ecc6",
        "sentAt": "2083-03-27T16:31:09.942Z",
        "message": "I know! I love the sound of the waves too. It's so calming. I wish I could go to the beach every day."
      },
      {
        "senderId": "6447089a9170fd2d3e34ecc5",
        "sentAt": "2023-03-28T17:31:09.942Z",
        "message": "I wanted to talk to you about something. I've been feeling a little down lately. I'm not sure why. I just feel like I'm not good enough. I feel like I'm not doing enough. I feel like I'm not smart enough. I feel like I'm not pretty enough. I feel like I'm not good enough."
      },
      {
        "senderId": "644708c99170fd2d3e34ecc6",
        "sentAt": "2025-03-27T16:31:09.942Z",
        "message": "I'm sorry to hear that. But know that you are good enough. It will get better. Please hold on. I'm here for you."
      },
    ],
    "isArchived": false
  });

  // TODO - get from API and set in state
  // useEffect(async () => {
  //   const connections = await getAllConnections();
  //   console.log('connections', connections);
  //   setChatList(connections);
  // }, []);

  // API call not required since socket is used
  const updateConversation = (message) => {
    const latestChat = chatHistory.conversation.concat([message]);
    setChatHistory({...chatHistory, conversation: latestChat});
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
