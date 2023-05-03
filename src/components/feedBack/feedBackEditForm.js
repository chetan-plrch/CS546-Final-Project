import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify/dist/react-toastify.js";
import "react-toastify/dist/ReactToastify.css";
import { feedbackDelete, feedbackEdit, getFeedback } from "../../api/feedback";
import validations from "../../validation";

const FeedBackEditForm = (props) => {
  const navigate = useNavigate();
  const feedId = props.feedbackId;

  const [data, setData] = useState({
    rate1: 0,
    rate2: 0,
    rate3: 0,
    isPublic: false,
    description: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    async function fetchData() {
      if (!props.feedbackId) {
        return;
      }

      try {
        const response = await getFeedback(props.feedbackId);
        const result = await response.data;
        console.log(result);
        setData({
          rate1: result.rating.reconnect_probability,
          rate2: result.rating.satisfied_with_chat,
          rate3: result.rating.listener_rating,
          isPublic: result.isPublic,
          description: result.description,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [props.feedbackId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleDelete = async () => {
    const response = await feedbackDelete(feedId);

    if (response.status === 200) {
      toast.success("Feedback Deleted Successfully");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      toast.error("Error in deleting feedback, try again");
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    let newErrors = {};

    try {
      const validatedIsPublic = validations.checkPublic(data.isPublic);

      try {
        const validatedRate1 = validations.checkRating(
          data.rate1,
          "Willing to reconnect"
        );
      } catch (error) {
        if (error.includes("Willing to reconnect")) {
          newErrors = { ...newErrors, rate1: error };
        }
      }

      try {
        const validatedRate2 = validations.checkRating(
          data.rate2,
          "Will you recommend the listener"
        );
      } catch (error) {
        if (error.includes("Will you recommend the listener")) {
          newErrors = { ...newErrors, rate2: error };
        }
      }

      try {
        const validatedRate3 = validations.checkRating(
          data.rate3,
          "Overall rating for the listener"
        );
      } catch (error) {
        if (error.includes("Overall rating for the listener")) {
          newErrors = { ...newErrors, rate3: error };
        }
      }

      try {
        const validatedDescription = validations.checkString(
          data.description,
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

      const updatedFeedback = {
        feedBackId: feedId,
        isPublic: validatedIsPublic,
        rate1: data.rate1,
        rate2: data.rate2,
        rate3: data.rate3,
        description: data.description,
      };

      const response = await feedbackEdit(updatedFeedback);

      if (response.status === 200) {
        toast.success("Feedback Updated Successfully");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        toast.error("Error in updating feedback, try again");
      }
    } catch (error) {
      setErrors(newErrors);
    }
  };
  console.log(props);
  return (
    <>
      <Container maxWidth="sm">
        <Box
          component="form"
          onSubmit={handleUpdate}
          mt={4}
          bgcolor="#f5f5f5"
          p={3}
          borderRadius={4}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          minHeight="60vh"
          boxShadow={4}
        >
          <Box>
            <Typography variant="h1" mb={2} color="#222222">
              Edit Feedback for {props.username}
            </Typography>
            <TextField
              fullWidth
              margin="normal"
              label="Willing to reconnect"
              type="number"
              name="rate1"
              value={data.rate1}
              onChange={handleChange}
              error={!!errors.rate1}
              helperText={errors.rate1}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{ style: { color: "#222222" } }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Will you recommend the listener"
              type="number"
              name="rate2"
              value={data.rate2}
              onChange={handleChange}
              error={!!errors.rate2}
              helperText={errors.rate2}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{ style: { color: "#222222" } }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Overall rating for the listener"
              type="number"
              name="rate3"
              value={data.rate3}
              onChange={handleChange}
              error={!!errors.rate3}
              helperText={errors.rate3}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{ style: { color: "#222222" } }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Description"
              name="description"
              value={data.description}
              onChange={handleChange}
              multiline
              rows={4}
              error={!!errors.description}
              helperText={errors.description}
              inputProps={{ style: { color: "#222222" } }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  name="isPublic"
                  checked={data.isPublic}
                  onChange={(event) =>
                    handleChange({
                      target: { name: "isPublic", value: event.target.checked },
                    })
                  }
                />
              }
              label="isPublic"
            />
          </Box>
          <Box display="flex" justifyContent="space-between" width="100%">
            <Button
              variant="contained"
              color="secondary"
              type="button"
              sx={{ mt: 2, bgcolor: "#D32F2F" }}
              onClick={handleDelete}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="btn"
              sx={{ mt: 2, bgcolor: "#1976D2" }}
              onClick={() => navigate("/feedbackslist")}
            >
              Go Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mt: 2, bgcolor: "#1976D2" }}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Container>
      <ToastContainer />
    </>
  );
};

export default FeedBackEditForm;
