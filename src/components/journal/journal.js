import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import JournalInput from './journalInput';

const Journal = (props) => {
  return (
    <Container>
      <JournalInput onClose={props.onClose}/>
    </Container>
  );
};
export default Journal