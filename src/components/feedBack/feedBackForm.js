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
import validations from "../../validation";

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
    let newErrors = {};
  
    try {
      const validatedIsPublic = validations.checkPublic(isPublic);
  
      try {
        const validatedRate1 = validations.checkRating(
          rate1,
          "Willing to reconnect"
        );
      } catch (error) {
        if (error.includes("Willing to reconnect")) {
          newErrors = { ...newErrors, rate1: error };
        }
      }
  
      try {
        const validatedRate2 = validations.checkRating(
          rate2,
          "Will you recommend the listener"
        );
      } catch (error) {
        if (error.includes("Will you recommend the listener")) {
          newErrors = { ...newErrors, rate2: error };
        }
      }
  
      try {
        const validatedRate3 = validations.checkRating(
          rate3,
          "OverAll rating for the listener"
        );
      } catch (error) {
        if (error.includes("OverAll rating for the listener")) {
          newErrors = { ...newErrors, rate3: error };
        }
      }
  
      try {
        const validatedDescription = validations.checkString(
          description,
          "Description"
        );
      } catch (error) {
        if (error.includes("Description")) {
          newErrors = { ...newErrors, description: error };
        }
      }
  
      if (Object.keys(newErrors).length > 0) {
        throw new Error("Validation errors");
      }
  
      const feedback = {
        userId: props.userId,
        chatId: props.chatId,
        rate1,
        rate2,
        rate3,
        isPublic: validatedIsPublic,
        description,
      };
      console.log(feedback);
  
      const result = await createFeedBack(feedback);
  
      if (result.status === 200) {
        toast.success("Feedback submitted successfully");
        resetForm();
        setTimeout(() => {
          navigate("/connections");
        }, 2000);
        props.onSubmit();
      } else {
        toast.error("Failed to submit feedback");
        setErrors({ ...errors, global: [result.response.data] });
      }
    } catch (error) {
      setErrors(newErrors);
    }
  };
  

  return (
    <>
      <Container maxWidth="sm">
        <Box
          component="form"
          onSubmit={handleSubmit}
          mt={4}
          bgcolor="white"
          p={3}
          borderRadius={4}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          minHeight="60vh"
          boxShadow={4}
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
              error={!!errors.rate1}
              helperText={errors.rate1}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Will you recommend the listener"
              type="number"
              value={rate2}
              onChange={(e) => setRate2(e.target.value)}
              error={!!errors.rate2}
              helperText={errors.rate2}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Overall rating for the listener"
              type="number"
              value={rate3}
              onChange={(e) => setRate3(e.target.value)}
              error={!!errors.rate3}
              helperText={errors.rate3}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={4}
              error={!!errors.description}
              helperText={errors.description}
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
              onClick={() => navigate("/")}
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
                  {Object.keys(errors).map((errorKey, index) => (
                    <div key={index}>{errors[errorKey]}</div>
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
