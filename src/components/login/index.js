import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify/dist/react-toastify.js";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const loginData = {
      username: username.trim(),
      password,
    };

    const response = await fetch("/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const responseData = await response.json();

    if (response.ok) {
      console.log("Login successful");
      toast.success(responseData.message);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      console.error("Login failed");
      console.log(responseData.error);
      setErrors([responseData.error]); 
      toast.error("Error in Logging in");
    }
  };

  return (
    <Container maxWidth="xs">
      <ToastContainer />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        paddingTop={4}
        bgcolor="rgb(204, 234, 209, 1)"
        p={3}
        borderRadius={4}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box
          component="form"
          width="100%"
          marginTop={1}
          onSubmit={handleSubmit}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="userName"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
          >
            Login
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
      </Box>
    </Container>
  );
};

export default Login;
