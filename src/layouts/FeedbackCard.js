import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const FeedbackCard = ({ feedback }) => {
  return (
    <>
    <Card>
      <CardContent>
        <Typography>
          Feedback for the Listener: {feedback.firstName}
        </Typography>
        <Typography>
          Reconnect Probability: {feedback.rating.reconnect_probability}
        </Typography>
        <Typography>
          Satisfied With Chat: {feedback.rating.satisfied_with_chat}
        </Typography>
        <Typography>
          Listener Rating: {feedback.rating.listener_rating}
        </Typography>
        <Typography component = "div" sx={{ fontSize: "20px" }}>Description</Typography>
        <Typography>{feedback.description}</Typography>
        <Typography component = "div" sx={{ fontSize: "20px" }}>Feedback Date</Typography>
        <Typography>{new Date(feedback.feedBackDate).toLocaleString()}</Typography>
      </CardContent>
    </Card>
    </>
  );
};

export default FeedbackCard;
