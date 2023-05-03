
import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { feedBackList } from '../../api/feedback';
import Cookies from "js-cookie";
import {getUserId} from "../../helper/index"

const FeedBackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const navigate = useNavigate();

  const userId = getUserId()

  
  

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await feedBackList(userId)
        if (response.status === 200) {
          setFeedbacks(response.data.map((feedback, index) => ({ ...feedback, id: index })));
        }
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    };

    fetchFeedbacks();
  }, [userId]);

  const formattedFeedbacks = feedbacks.map((feedback) => ({
    ...feedback,
    reconnect_probability: feedback.rating.reconnect_probability,
    satisfied_with_chat: feedback.rating.satisfied_with_chat,
    listener_rating: feedback.rating.listener_rating,
  }));

  const handleEditClick = (feedbackId) => {
    navigate('/feedbacks/feedback',{state: {feedbackId}});
  };

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Feedbacks
      </Typography>
      {feedbacks.length > 0 ? (
        <Box sx={{ width: '100%', maxWidth: '1200px', bgcolor: 'rgba(245, 245, 245, 0.8)', borderRadius: '4px', padding: '16px' }} >
          <List>
            {formattedFeedbacks.map((feedback, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemText
                    primary={`Description: ${feedback.description}`}
                    secondary={`Reconnect Probability: ${feedback.reconnect_probability}, Satisfied with Chat: ${feedback.satisfied_with_chat}, Listener Rating: ${feedback.listener_rating}`}
                  />
                  <Button variant="contained" onClick={()=>handleEditClick(feedback._id)}>
                    Edit
                  </Button>
                </ListItem>
                {index !== formattedFeedbacks.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Box>
      ) : (
        <Typography variant="subtitle1" color="textSecondary">
          No feedbacks found.
        </Typography>
      )}
    </Box>
  );
};

export default FeedBackList;
