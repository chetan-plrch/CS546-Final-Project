import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

//In props I need a chatId ,username
const FeedBackPop = (props) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    if (props.feedbackExists) {
      navigate("/feedbacks/feedback", {
        state: { chatId: props.chatId, username: props.username },
      });
    } else {
      navigate("/feedbacks", {
        state: { chatId: props.chatId, username: props.username },
      });
    }
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open Feedback Dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="feedback-dialog-title"
        aria-describedby="feedback-dialog-description"
      >
        <DialogTitle id="feedback-dialog-title">Feedback</DialogTitle>
        <DialogContent>
          <DialogContentText id="feedback-dialog-description">
            {props.feedbackExists
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
