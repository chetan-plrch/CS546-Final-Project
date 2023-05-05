import React, { useState,useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getFeedbackByChatId } from "../../api/feedback";
import {getUserId} from "../../helper/index"

const FeedBackPop = (props) => {
  const { isOpen, chatId, username, closeModal } = props;
  // const [open, setOpen] = useState(false);
  const [feedbackExists, setFeedbackExists] = useState(false);
  const [userId, setUserID] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const matchedUserId = getUserId()
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

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    // setOpen(false);
    closeModal();
  };

  const handleAgree = () => {
    if (feedbackExists) {
      navigate("/feedbacks/feedback", {
        state: { chatId, username},
      });
    } else {
      navigate("/feedbacks", {
        state: { chatId, username },
      });
    }
    // setOpen(false);
    closeModal();
  };
  
  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open Feedback Dialog
      </Button> */}
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
    </div>
  );
};

export default FeedBackPop;