import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Typography, Box, Alert } from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify/dist/react-toastify.js";
import "react-toastify/dist/ReactToastify.css";


const FeedBackForm = () => {
  const [rate1, setRate1] = useState("");
  const [rate2, setRate2] = useState("");
  const [rate3, setRate3] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState(null);
  const [errors, setErrors] = useState("");

  useEffect(() => {
    const fetchedUserId = Cookies.get('userId');
    if (fetchedUserId) {
      const regex = /"([^"]+)"/;
      const extractedUserId = fetchedUserId.match(regex)[1];
      setUserId(extractedUserId);
      console.log('User ID from cookies:', extractedUserId);
    }
  }, []);
  
  const resetForm = () => {
    setRate1('');
    setRate2('');
    setRate3('');
    setDescription('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const feedback = {
      userId,
      chatId: "6445696e99e0f288c0614080",
      rate1,
      rate2,
      rate3,
      description,
    };
    console.log(feedback);

    const response = await fetch("/feedbacks/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(feedback),
    });

    const responseData = await response.json();

    if (response.ok) {
      console.log("Feedback submitted successfully");
      toast.success("Feedback submitted successfully")
      resetForm();
    } else {
      toast.error("Failed to submit feedback")
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
      >
        <Typography variant="h5" mb={2}>
          Submit Feedback
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          label="reconnect_probability"
          type="number"
          value={rate1}
          onChange={(e) => setRate1(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="satisfied_with_chat"
          type="number"
          value={rate2}
          onChange={(e) => setRate2(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="listener_rating"
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
        />
        <Button
          variant="contained"
          color="primary"
          endIcon={<SendIcon />}
          type="submit"
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
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
    </Container>
    <ToastContainer />
    </>
  );
};

export default FeedBackForm;
