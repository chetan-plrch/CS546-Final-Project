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
import { viewFooterOnPages } from '../../constant';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const [connections, setConnections] = useState([]);
  const [viewChatPopup, setViewChatPopup] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState({});
  const [shouldRenderFooter, setShouldRenderFooter] = useState(true);
  useEffect(() => {
    const loggedInUserId = getUserId();
    // TODO - fetch when user is not in connection page
    async function fetchConnections() {
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
  }, []);

  const openChat = (connection) => {
    // TODO - open chat window
    console.log('open chat with', connection);
    setSelectedConnection(connection);
    setViewChatPopup(true);
  };

  useEffect(() => {
    const { href: url } = window.location;
    setShouldRenderFooter(viewFooterOnPages.some((page) => url.includes(page)));
  }, [navigate]);

  return (
    shouldRenderFooter ? (
        <div className='footer'>
        {
          connections?.length ? (
            connections.map((connection) => (
              <div key={connection?._id} className='each-chat' onClick={() => openChat(connection)}>
                <Avatar alt='Connection Profile' src={connection?.profilePic} />
                <span>{connection?.fullName}</span>
              </div>
            ))
          ) : (
            null
          )
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
              <DialogTitle>{selectedConnection?.fullName}</DialogTitle>
              <DialogContent>
                <ChatWindow
                  allowMessaging={true}
                  connectionId={selectedConnection?._id}
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

