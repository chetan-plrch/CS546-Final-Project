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
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../api";
import validations from "../../validation";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    let newErrors = {};

    try {
      const validatedUsername = validations.checkUsername(username);
    } catch (error) {
      if (error.includes("username")) {
        newErrors = { ...newErrors, username: error };
      }
    }

    try {
      const validatedPassword = validations.checkPassword(password);
    } catch (error) {
      if (error.includes("password")) {
        newErrors = { ...newErrors, password: error };
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const loginData = {
      username: username,
      password: password,
    };

    try {
      const result = await loginUser(loginData);
      console.log(result);
      if (result.status === 200) {
        console.log("Login successful");
        toast.success(result.data.message);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        console.log(result[1]);
        setErrors({ ...errors, global: [result[1]] });
        toast.error("Error in Logging in");
      }
    } catch (error) {
      console.error(error);
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
        bgcolor="white"
        boxShadow={10}
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
            error={!!errors.username}
            helperText={errors.username}
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
            error={!!errors.password}
            helperText={errors.password}
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
          {errors.global && (
            <Box marginTop={2}>
              <Alert severity="error">
                {errors.global.map((error, index) => (
                  <div key={index}>{error}</div>
                ))}
              </Alert>
            </Box>
          )}
        </Box>
      </Box>
      <Link to="/signup" style={{ textDecoration: "none" }}>
        <Typography variant="body2" align="center" sx={{ marginTop: 1 }}>
          Don't have an account? Register
        </Typography>
      </Link>
    </Container>
  );
};

export default Login;
