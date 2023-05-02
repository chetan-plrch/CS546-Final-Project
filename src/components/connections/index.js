import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Link from '@mui/joy/Link';

import './index.css'
import CustomList from '../../common/custom-list';
import ChatWindow from '../../common/custom-chat-window';
import { getAllConnections } from '../../api/connections';
import { getUserRole } from '../../helper'
import { roles } from '../../constant';

const Connections = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState();
  const [connections, setConnections] = useState([]);
  const [selectedConnectionId, setSelectedConnectionId] = useState();

  useEffect(() => {
    async function fetchConnections() {
      const response = await getAllConnections();
      if (response?.data?.users) {
        let { users } = response.data;
        users = users?.map((user) => ({...user, fullName: `${user.firstName} ${user.lastName}`}));
        if (users?.length) {
          const { connection: newConnection } = location?.state || {};
          if (newConnection?._id && users.findIndex((user) => user?._id === newConnection?._id) < 0) {
            users = [newConnection, ...users];
            window.history.replaceState({}, document.title)
          };
          setSelectedConnectionId(newConnection?._id || users[0]?._id);
          setConnections(users);
        } else {
          const role = getUserRole();
          setUserRole(role);
        };
      } else {
        const role = getUserRole();
        setUserRole(role);
      };
    };
    fetchConnections();
  }, []);

  const changeChatWindow = async (connectionId) => {
    const updatedConnections = connections.map((connection) => {
      return {...connection, showUnreadLabel: false};
    });
    setConnections(updatedConnections);
    setSelectedConnectionId(connectionId);
  };

  const updateConnections = (connectionId, lastMessage, showUnreadLabel) => {
    let existingConnection = false;
    const updatedConnections = connections.map((connection) => {
      if (connection._id === connectionId) {
        existingConnection = true;
        return {...connection, lastMessage, showUnreadLabel};
      };
      return connection;
    });
    if (!existingConnection) {
      updatedConnections.unshift({_id: connectionId, lastMessage, showUnreadLabel: true});
    };
    setConnections(updatedConnections);
  };

  const findExperts = () => {
    navigate('/experts');
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
          onSelectionChange={(connectionId) => changeChatWindow(connectionId)}
        />
        <ChatWindow
          allowSearch={true}
          allowBlocking={true}
          allowMessaging={true}
          connectionId={selectedConnectionId}
          onConnectionUpdate={updateConnections}
          />
      </div>
    ) : (
        userRole === roles.SEEKER ? (
          <span>
          Click
          <Link onClick={findExperts} sx={{padding: '5px'}}>here</Link>
           to connect with professionals to get help
        </span>
        ) : (
          <span>
            You can view the chats with people seeking advice from you here once they reach out to you.
          </span>
        )
    )
    }
    </div>
  );
};

export default Connections;
