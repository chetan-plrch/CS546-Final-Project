import React, { useState, useEffect } from 'react';
import './index.css'
import CustomList from "../../common/custom-list";
import ChatWindow from '../../common/custom-chat-window';

import { getAllConnections, getChatHistory } from '../../api/connections';

// TODO - remove this mock data and use api calls
import { CONNECTIONS, CHAT_HISTORY } from './constants';

const Connections = () => {
  // Stores the list of connections
  const [connections, setConnections] = useState(CONNECTIONS);
  // By default, first connection is selected
  const [selectedId, setSelectedId] = useState(connections[0]?.id);
  // Stores the chat history of the selected connection
  const [chatHistory, setChatHistory] = useState(CHAT_HISTORY);

  // TODO - set connections from API call
  // useEffect(async () => {
  //   const allConnections = await getAllConnections();
  //   console.log('allConnections', allConnections);
  //   setConnections(allConnections);
  // }, []);

  // API call not required since socket is used
  const updateConversation = (message) => {
    const latestChat = chatHistory.conversation.concat([message]);
    setChatHistory({...chatHistory, conversation: latestChat});
  };

  const getConversation = async (connectionId) => {
    // TODO - Uncomment this once API is ready
    // const conversation = await getChatHistory(connectionId);
    // setChatHistory(conversation);
    setSelectedId(connectionId);
  };

  return (
    <div className='container'>
    {
    connections.length ? (
      <div className='conversation-container'>
        <CustomList
          list={connections}
          selectedId={selectedId}
          onSelectionChange={(connectionId) => getConversation(connectionId)}
        />
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
