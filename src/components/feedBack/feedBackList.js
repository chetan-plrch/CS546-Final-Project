import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { feedBackList } from "../../api/feedback";
import { getUserId } from "../../helper/index";
import Middle from "./middle";

const FeedBackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [showMiddle, setShowMiddle] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const userId = getUserId();

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await feedBackList(userId);
        if (response.status === 200) {
          setFeedbacks(
            response.data.map((feedback, index) => ({ ...feedback, id: index }))
          );
        }
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchFeedbacks();
  }, [userId]);

  const handleEditClick = (feedback) => {
    setSelectedFeedback(feedback);
    setShowMiddle(true);
  };

  const handleCloseMiddle = () => {
    setShowMiddle(false);
  };

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Feedbacks
      </Typography>
      {feedbacks.length > 0 ? (
        <Box
          sx={{
            width: "100%",
            maxWidth: "1200px",
            bgcolor: "rgba(245, 245, 245, 0.8)",
            borderRadius: "4px",
            padding: "16px",
          }}
        >
          {feedbacks.map((feedback, index) => (
            <Card key={index} sx={{ marginBottom: "16px" }}>
              <CardContent>
                <Typography variant="h6">
                  Description: {feedback.description || "N/A"}
                </Typography>
                <Typography>
                  Reconnect Probability: {feedback.rating.reconnect_probability}
                </Typography>
                <Typography>
                  Satisfied with Chat: {feedback.rating.satisfied_with_chat}
                </Typography>
                <Typography>
                  Listener Rating: {feedback.rating.listener_rating}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  onClick={() => handleEditClick(feedback)}
                >
                  Edit
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      ) : (
        <Typography variant="subtitle1" color="textSecondary">
          No feedbacks found.
        </Typography>
      )}
      <Dialog
        open={showMiddle}
        onClose={handleCloseMiddle}
        aria-labelledby="middle-dialog-title"
      >
        <DialogTitle id="middle-dialog-title">Update Feedback</DialogTitle>
        <DialogContent>
          {selectedFeedback && (
            <Middle
              chatId={selectedFeedback.chatId}
              userId={selectedFeedback.userId}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMiddle} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FeedBackList;
