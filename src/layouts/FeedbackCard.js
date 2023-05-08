import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const FeedbackCard = ({ feedback, userId }) => {
  return (
    <Card>
      <CardContent>
        <Typography>
          Reconnect Probability: {feedback.rating.reconnect_probability}
        </Typography>
        <Typography>
          Satisfied With Chat: {feedback.rating.satisfied_with_chat}
        </Typography>
        <Typography>
          Listener Rating: {feedback.rating.listener_rating}
        </Typography>
        <Typography variant="h6">Description</Typography>
        <Typography>{feedback.description}</Typography>
        <Typography variant="h6">Feedback Date</Typography>
        <Typography>{new Date(feedback.feedBackDate).toLocaleString()}</Typography>
      </CardContent>
    </Card>
  );
};

export default FeedbackCard;
