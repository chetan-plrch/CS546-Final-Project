import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography
} from "@mui/material";
import { getFeedbackByChatId } from "../../api/feedback";
import { getUserId } from "../../helper/index";
import FeedBackForm from "./feedBackForm";
import Middle from "./middle";

const FeedBackPop = (props) => {
  const { isOpen, chatId, username, closeModal } = props;
  const [feedbackExists, setFeedbackExists] = useState(false);
  const [userId, setUserID] = useState();
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [showMiddle, setShowMiddle] = useState(false);

  useEffect(() => {
    const matchedUserId = getUserId();
    setUserID(matchedUserId);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const checkFeedback = async () => {
      try {
        const response = await getFeedbackByChatId(chatId, userId);
        console.log(response);
        if (response) {
          setFeedbackExists(true);
        } else {
          setFeedbackExists(false);
        }
      } catch (error) {
        console.error("Error fetching feedback:", error);
        setFeedbackExists(false);
      }
    };
    checkFeedback();
  }, [isOpen]);

  const handleClose = () => {
    closeModal();
  };

  const handleAgree = () => {
    if (feedbackExists) {
      setShowMiddle(true);
    } else {
      setShowFeedbackForm(true);
    }
    closeModal();
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="feedback-dialog-title"
        aria-describedby="feedback-dialog-description"
      >
        <DialogTitle id="feedback-dialog-title">Feedback</DialogTitle>
        <DialogContent>
          <DialogContentText id="feedback-dialog-description">
            {feedbackExists
              ? "Would you like to update the feedback for the conversation you had?"
              : "Would you like to give feedback for the conversation you had till now?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Decline
          </Button>
          <Button onClick={handleClose} color="primary">
            Maybe Later
          </Button>
          <Button onClick={handleAgree} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={showFeedbackForm}
        onClose={() => setShowFeedbackForm(false)}
        aria-labelledby="feedback-form-dialog-title"
      >
        <Typography component = "div" sx={{ fontSize: "30px" }}>Feedback Form for {username.toUpperCase()}</Typography>
        <DialogContent>
          <FeedBackForm userId={userId} chatId={chatId} username={username} onSubmit={() => setShowFeedbackForm(false)}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowFeedbackForm(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={showMiddle}
        onClose={() => setShowMiddle(false)}
        aria-labelledby="middle-dialog-title"
      >
        <Typography component = "div" sx={{ fontSize: "30px" }}>Update Feedback for {username.toUpperCase()}</Typography>
        <DialogContent>
          <Middle userId={userId} chatId={chatId} username={username} onSuccess={() => setShowMiddle(false)}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowMiddle(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FeedBackPop;
