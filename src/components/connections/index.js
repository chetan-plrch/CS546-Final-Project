import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Link from '@mui/joy/Link';

import './index.css'
import CustomList from '../../common/custom-list';
import ChatWindow from '../../common/custom-chat-window';
import { getAllConnections } from '../../api/connections';
import { getUserId, getUserRole } from '../../helper'
import { roles } from '../../helper/constants';

const Connections = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [blockedUserIds, setBlockedUserIds] = useState([]);
  const [connections, setConnections] = useState([]);
  const [selectedConnectionId, setSelectedConnectionId] = useState();
  const [selectedConnectionName, setSelectedConnectionName] = useState();
  const [archivedConnections, setArchivedConnections] = useState([]);
  const userRole = getUserRole();

  useEffect(() => {
    async function fetchConnections() {
      const response = await getAllConnections();
      const loggedInUserId = getUserId();
      const { connection: newConnection } = location?.state || {};
      if (response?.data?.users?.length) {
        let { users } = response.data;
        users = users?.map((user) => ({...user, fullName: `${user.firstName} ${user.lastName}`}));
        const archivedUsers = users.filter((user) => user?.archivedBy?.includes(loggedInUserId));
        if (archivedUsers?.length) {
          setArchivedConnections(archivedUsers);
          users = users.filter((user) => !user?.archivedBy?.includes(loggedInUserId));
        };
        if (newConnection?._id && users.findIndex((user) => user?._id === newConnection?._id) < 0) {
          users = [newConnection, ...users];
        };
        setSelectedConnectionId(newConnection?._id || users[0]?._id);
        setSelectedConnectionName(newConnection?.fullName || users[0]?.fullName);
        setConnections(users);
      } else {
        if (newConnection?._id) {
          setSelectedConnectionId(newConnection?._id);
          setSelectedConnectionName(newConnection?.fullName);
          setConnections([newConnection]);
        } else {
          setConnections([]);
        };
      };
      window.history.replaceState({}, document.title)
    };
    fetchConnections();
  }, []);

  const changeChatWindow = async (connectionId) => {
    const updatedConnections = connections.map((connection) => {
      return {...connection, showUnreadLabel: false};
    });
    const selectedConnection = connections.find((connection) => connection._id === connectionId);
    setConnections(updatedConnections);
    setSelectedConnectionId(connectionId);
    setSelectedConnectionName(selectedConnection?.fullName);
  };

  const removeUserFromList = () => {
    setBlockedUserIds([...blockedUserIds, selectedConnectionId]);
    const updatedConnections = connections.filter((connection) => connection._id !== selectedConnectionId);
    setConnections(updatedConnections);
    if (updatedConnections?.length) {
      setSelectedConnectionId(updatedConnections[0]?._id);
      setSelectedConnectionName(updatedConnections[0]?.fullName);
    }
  };

  const updateConnections = (connectionId, lastMessage, showUnreadLabel) => {
    if (!blockedUserIds?.includes(connectionId)) {
      let updatedConnections = [];
      let existingConnection = false;
      updatedConnections = connections?.map((connection) => {
        if (connection._id === connectionId) {
          existingConnection = true;
          return {...connection, lastMessage, showUnreadLabel};
        };
        return connection;
      });
      if (!existingConnection) {
        updatedConnections?.unshift({_id: connectionId, lastMessage, showUnreadLabel: true});
      }
      setConnections(updatedConnections);
    };
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
        setSelectedConnectionName(updatedConnections[0]?.fullName);
      };
    } else {
      const unarchivedConnection = archivedConnections.find((connection) => connection._id === selectedConnectionId);
      const updatedConnections = [...connections, unarchivedConnection];
      setConnections(updatedConnections);
      const updatedArchivedConnections = archivedConnections.filter((connection) => connection._id !== selectedConnectionId);
      setArchivedConnections(updatedArchivedConnections);
      if (updatedArchivedConnections?.length) {
        setSelectedConnectionId(updatedArchivedConnections[0]?._id);
        setSelectedConnectionName(updatedArchivedConnections[0]?.fullName);
      } else {
        setArchivedConnections([]);
      }
    };
  };

  return (
    <div className='connections-container'>
    {
    connections?.length || archivedConnections?.length ? (
      <div className='conversation-container'>
        <CustomList
          selectionKey='_id'
          list={connections}
          alternateList={archivedConnections || []}
          titleKey='fullName'
          listTitle='Connections'
          imageKey='profilePic'
          contentKey='lastMessage'
          selectedId={selectedConnectionId}
          onSelectionChange={(connectionId) => changeChatWindow(connectionId)}
        />
        {
          selectedConnectionId ? (
            <ChatWindow
            allowSearch={true}
            allowBlocking={true}
            allowMessaging={true}
            allowArchiving={true}
            connectionId={selectedConnectionId}
            connectionName={selectedConnectionName}
            onConnectionUpdate={updateConnections}
            removeConnection={removeUserFromList}
            updateArchiveStatus={archiveChat}
            />
          ) : (
            null
          )
        }
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
