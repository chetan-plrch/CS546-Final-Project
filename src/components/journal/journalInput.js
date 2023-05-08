import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Box from '@mui/material/Box';
import { getUserId } from '../../helper';

const JournalInput = ({onClose}) => {
  const [message, setMessage] = useState('');

  const createJournal = async () => {
    try {
      const userId = getUserId(); 
      const date = new Date().toISOString();
      await axios.post('/journal', { userId, message, date });
      setMessage('');
      setInputVisible(false);
    } catch (error) {
      console.error('Error creating journal:', error);
    }
  };
  return (
    <Box>
      <TextareaAutosize
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write your notes here..."
        minRows={6}
        style={{ width: '100%' }}
      />
      <Button variant="contained" color="primary" onClick={createJournal}>
        Save
      </Button>
      <Button variant="outlined" onClick={onClose}>
        Cancel
      </Button>
    </Box>
  );
};

export default JournalInput;
