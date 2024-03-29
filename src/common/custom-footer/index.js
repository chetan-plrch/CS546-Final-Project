import React, { useEffect, useState } from 'react';
import Avatar from '@mui/joy/Avatar';
import { getAllConnections } from '../../api/connections';
import { getUserId } from '../../helper';
import './footer.css';
import ChatWindow from '../custom-chat-window';
import {
  Dialog,
  DialogTitle,
  DialogContent
} from "@mui/material";
import { viewFooterOnPages } from '../../helper/constants';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const [connections, setConnections] = useState([]);
  const [viewChatPopup, setViewChatPopup] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState({});
  const [shouldRenderFooter, setShouldRenderFooter] = useState(true);
  useEffect(() => {
    const loggedInUserId = getUserId();
    async function fetchConnections() {
      setConnections([]);
      const response = await getAllConnections();
      if (response?.data?.users) {
        let { users } = response.data;
        // Only show active chats
        users = users.filter((user) => !user?.archivedBy?.includes(loggedInUserId));
        users = users?.map((user) => ({...user, fullName: `${user.firstName} ${user.lastName}`}));
        setConnections(users);
      }
    };
    fetchConnections();
  }, [navigate]);

  const openChat = (connection) => {
    setSelectedConnection(connection);
    setViewChatPopup(true);
  };

  useEffect(() => {
    const { href: url } = window.location;
    setShouldRenderFooter(viewFooterOnPages.some((page) => url.includes(page)));
  }, [navigate]);

  return (
    shouldRenderFooter && connections?.length ? (
        <div className='footer'>
        {
          connections.map((connection) => (
            <div key={connection?._id} className='each-chat' onClick={() => openChat(connection)}>
              <Avatar alt='Connection Profile' src={connection?.profilePic} />
              <span>{connection?.fullName}</span>
            </div>
          ))
        }
        {
          viewChatPopup ? (
            <Dialog
              open={viewChatPopup}
              onClose={() => setViewChatPopup(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              PaperProps={{ style: {
                height: '70%',
                width: '70%',
              }}}
            >
              <DialogContent>
                <ChatWindow
                  allowMessaging={true}
                  connectionId={selectedConnection?._id}
                  connectionName={selectedConnection?.fullName}
                />
              </DialogContent>
            </Dialog>
          ) : (
            null
          )
        }
    </div>
      ) : (
        null
    )
  )
}

export default Footer;

