import React, { useState, useEffect } from 'react';
import './index.css'
import CustomList from "../../common/custom-list";
import ChatWindow from '../../common/custom-chat-window';

import { getAllConnections } from '../../api/connections';

const Connections = () => {
  const [connections, setConnections] = useState();
  const [selectedConnectionId, setSelectedConnectionId] = useState();

  useEffect(() => {
    async function fetchConnections() {
      const response = await getAllConnections();
      if (response?.data?.users) {
        let { users } = response.data;
        users = users?.map((user) => ({...user, fullName: `${user.firstName} ${user.lastname}`}));
        setConnections(users?.length ? users : []);
        if (users?.length) {
          // TODO - point to 1st connnection once api issue is fixed
          setSelectedConnectionId(users[1]?._id);
        };
      };
    };
    fetchConnections();
  }, []);

  const getConversation = async (connectionId) => {
    setSelectedConnectionId(connectionId);
  };

  return (
    <div className='connections-container'>
    {
    connections?.length ? (
      <div className='conversation-container'>
        <CustomList
          selectionKey='_id'
          list={connections}
          titleKey='fullName'
          listTitle='Connections'
          contentKey='lastMessage'
          selectedId={selectedConnectionId}
          onSelectionChange={(connectionId) => getConversation(connectionId)}
        />
        <ChatWindow
          allowSearch={true}
          allowBlocking={true}
          allowMessaging={true}
          connectionId={selectedConnectionId}
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
