import React, { useEffect, useState } from 'react';
import { getJournal, deleteJournal } from '../../api/journal';
import { getUserId } from '../../helper';
import { CircularProgress, Grid, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const JournalList = () => {
  const [journals, setJournals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJournals = async () => {
      setIsLoading(true);
      const userId = getUserId();
      const response = await getJournal(userId);
      if (response && response?.data?.journal) {
        setJournals(response.data.journal);
      }
      setIsLoading(false);
    };

    fetchJournals();
  }, []);

  const handleDelete = async (journalId) => {
    const response = await deleteJournal(journalId);
    if (response && response.data.deleted) {
      setJournals((prevJournals) =>
        prevJournals.filter((journal) => journal._id !== journalId)
      );
    }
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (journals.length === 0) {
    return <Typography variant="h6">No journals found.</Typography>;
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Journals
          </Typography>
          <List>
            {journals.map((journal, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={journal?.message}
                  secondary={journal?.date}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(journal?._id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </div>
  );
};

export default JournalList;
