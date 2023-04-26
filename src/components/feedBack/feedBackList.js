import React, { useEffect, useState } from 'react';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import axios from 'axios';

const FeedBackList = ({userId}) => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.post('/feedbacks/user', {
          userId: userId,
        });
        console.log(response);

        if (response.status === 200) {
          setFeedbacks(response.data);
        }
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    };

    fetchFeedbacks();
  }, [userId]);

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Feedbacks
      </Typography>
      <List>
        {feedbacks.map((feedback, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={feedback.description}
              secondary={`Rating: ${feedback.rating}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default FeedBackList