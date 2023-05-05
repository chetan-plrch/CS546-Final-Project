import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {Link} from '@mui/joy';

import './index.css'
import CustomList from '../../common/custom-list/index.js';
import ChatWindow from '../../common/custom-chat-window/index.js';
import { getAllConnections } from '../../api/connections.js';
import { getUserId, getUserRole } from '../../helper/index.js'
import { roles } from '../../constant.js';

const Connections = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState();
  const [connections, setConnections] = useState([]);
  const [selectedConnectionId, setSelectedConnectionId] = useState();
  const [archivedConnections, setArchivedConnections] = useState([]);

  useEffect(() => {
    async function fetchConnections() {
      const response = await getAllConnections();
      const loggedInUserId = getUserId();
      if (response?.data?.users) {
        let { users } = response.data;
        if (users?.length) {
          users = users?.map((user) => ({...user, fullName: `${user.firstName} ${user.lastName}`}));
          const archivedUsers = users.filter((user) => user?.archivedBy?.includes(loggedInUserId));
          if (archivedUsers?.length) {
            setArchivedConnections(archivedUsers);
            users = users.filter((user) => !user?.archivedBy?.includes(loggedInUserId));
          };
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

  const removeUserFromList = () => {
    const updatedConnections = connections.filter((connection) => connection._id !== selectedConnectionId);
    setConnections(updatedConnections);
    if (updatedConnections?.length) {
      setSelectedConnectionId(updatedConnections[0]?._id);
    }
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

  const archiveChat = (archive) => {
    if (archive) {
      const archivedConnection = connections.find((connection) => connection._id === selectedConnectionId);
      const updatedArchivedConnections = [...archivedConnections, archivedConnection];
      setArchivedConnections(updatedArchivedConnections);
      const updatedConnections = connections.filter((connection) => connection._id !== selectedConnectionId);
      setConnections(updatedConnections);
      if (updatedConnections?.length) {
        setSelectedConnectionId(updatedConnections[0]?._id);
      };
    } else {
      const unarchivedConnection = archivedConnections.find((connection) => connection._id === selectedConnectionId);
      const updatedConnections = [...connections, unarchivedConnection];
      setConnections(updatedConnections);
      const updatedArchivedConnections = archivedConnections.filter((connection) => connection._id !== selectedConnectionId);
      setArchivedConnections(updatedArchivedConnections);
      if (updatedConnections?.length) {
        setSelectedConnectionId(updatedConnections[0]?._id);
      };
    };
  };

  return (
    <div className='connections-container'>
    {
    connections?.length ? (
      <div className='conversation-container'>
        <CustomList
          selectionKey='_id'
          list={connections}
          alternateList={archivedConnections || []}
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
          removeConnection={removeUserFromList}
          updateArchiveStatus={archiveChat}
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
