import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify/dist/react-toastify.js";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { createFeedBack } from "../../api/feedback";
import Cookies from "js-cookie";

const FeedBackForm = (props) => {
  
  const [rate1, setRate1] = useState("");
  const [rate2, setRate2] = useState("");
  const [rate3, setRate3] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  const resetForm = () => {
    setRate1("");
    setRate2("");
    setRate3("");
    setDescription("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const feedback = {
      userId: props.userId,
      chatId: props.chatId,
      rate1,
      rate2,
      rate3,
      isPublic,
      description,
    };
    console.log(feedback);

    const response = await createFeedBack(feedback)
    const responseData = await response.json();

    if (response.ok) {
      console.log("Feedback submitted successfully");
      toast.success("Feedback submitted successfully");
      resetForm();
      setTimeout(() => {
        navigate("/connections");
      }, 2000);

      props.onSubmit();
    } else {
      toast.error("Failed to submit feedback");
      console.log(responseData.errors);
      setErrors([responseData.errors]);
    }
  };

  return (
    <>
      <Container maxWidth="sm">
        <Box
          component="form"
          onSubmit={handleSubmit}
          mt={4}
          bgcolor="rgba(245, 245, 245, 0.5)"
          p={3}
          borderRadius={4}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          minHeight="60vh"
        >
          <Box>
            <Typography variant="h5" mb={2}>
              Submit Feedback
            </Typography>
            <TextField
              fullWidth
              margin="normal"
              label="Willing to reconnect"
              type="number"
              value={rate1}
              onChange={(e) => setRate1(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Will you recommend the listener"
              type="number"
              value={rate2}
              onChange={(e) => setRate2(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              label="OverAll rating for the listener"
              type="number"
              value={rate3}
              onChange={(e) => setRate3(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={4}
            />
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                />
              }
              label="isPublic"
            />
          </Box>
          <Box display="flex" justifyContent="space-between" width="100%">
          <Button
              variant="contained"
              color="primary"
              endIcon={<SendIcon />}
              type="submit"
              sx={{ mt: 2 }}
              onClick={()=>navigate('/connections')}
            >
              GO Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              endIcon={<SendIcon />}
              type="submit"
              sx={{ mt: 2 }}
            >
              Submit
            </Button>
          </Box>
          <Box>
          {errors && (
              <Box marginTop={2}>
                <Alert severity="error">
                  {errors.map((error, index) => (
                    <div key={index}>{error}</div>
                  ))}
                </Alert>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
      <ToastContainer />
    </>
  );
};

export default FeedBackForm;
