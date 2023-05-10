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
import { ToastContainer } from "react-toastify/dist/react-toastify.js";
import "react-toastify/dist/ReactToastify.css";

const FeedBackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [showMiddle, setShowMiddle] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [selectedFirstName, setSelectedFirstName] = useState(null); 
  const [fetchFeedback, setFetchFeedback] = useState(true);

  const userId = getUserId();

  useEffect(() => {
    const fetchFeedbacks = async () => {
      if (fetchFeedback) {
        try {
          const response = await feedBackList(userId);
          console.log(response);
          if (response.status === 200) {
            setFeedbacks(
              response.data.map((feedback, index) => ({ ...feedback, id: index }))
            );
          }
        } catch (error) {
          console.error("Error fetching feedbacks:", error);
        }
        setFetchFeedback(false);
      };
    };

    fetchFeedbacks();
  }, [userId, fetchFeedback]);

  const handleSuccess = () => {
    setFetchFeedback(true);
    handleCloseMiddle();
  };

  const handleEditClick = (feedback, firstName) => {
    setSelectedFeedback(feedback);
    setSelectedFirstName(firstName); 
    setShowMiddle(true);
  };

  const handleCloseMiddle = () => {
    setShowMiddle(false);
  };

  return (
    <Box>
      <Typography component = "div" sx={{ fontSize: "30px" , fontWeight: "bold"}}  >
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
                <Typography component = "div" sx={{ fontSize: "16px" }}>
                  Feedback given for: {feedback.firstName || "N/A"}
                </Typography>
                <Typography component = "div" sx={{ fontSize: "16px" }}>
                  Description: {feedback.description || "N/A"}
                </Typography>
                <Typography>
                  Reconnect Probability: {feedback?.rating?.reconnect_probability}
                </Typography>
                <Typography>
                  Satisfied with Chat: {feedback?.rating?.satisfied_with_chat}
                </Typography>
                <Typography>
                  Listener Rating: {feedback?.rating?.listener_rating}
                </Typography>
                <Typography>
                  Feedback Time:{" "}
                  {new Date(feedback.feedBackDate).toLocaleString()}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  onClick={() => handleEditClick(feedback, feedback?.firstName)}
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
        <Typography component = "div" sx={{ fontSize: "30px" }}>
        Update Feedback for {selectedFirstName}
        </Typography>
        <DialogContent>
          {selectedFeedback && (
            <Middle
              chatId={selectedFeedback.chatId}
              userId={selectedFeedback.userId}
              onSuccess={handleSuccess}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMiddle} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </Box>
  );
};

export default FeedBackList;
