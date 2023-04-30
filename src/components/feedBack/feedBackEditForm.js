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
      //console.log("Request payload:", JSON.stringify({ feedbackId: feedId }));

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

    const updatedFeedback = {
      feedBackId: feedId,
      isPublic: data.isPublic,
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
      toast.error("Error in updateing feedback, try again");
    }
  };

  return (
    <>
      <Container maxWidth="sm">
        <Box
          component="form"
          onSubmit={handleUpdate}
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
              Edit Feedback
            </Typography>
            <TextField
              fullWidth
              margin="normal"
              label="Willing to reconnect"
              type="number"
              name="rate1"
              value={data.rate1}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Will you recommend the listener"
              type="number"
              name="rate2"
              value={data.rate2}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Overall rating for the listener"
              type="number"
              name="rate3"
              value={data.rate3}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
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
              sx={{ mt: 2 }}
              onClick={handleDelete}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="btn"
              sx={{ mt: 2 }}
              onClick={() => navigate("/")}
            >
              Go Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mt: 2 }}
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
