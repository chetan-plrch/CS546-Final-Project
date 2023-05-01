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
import { loginUser } from "../../api";
import validations from "../../validation";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const validatedUsername = validations.checkUsername(username);
      const validatedPassword = validations.checkPassword(password);

      const loginData = {
        username: validatedUsername,
        password: validatedPassword,
      };

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
      if (error.includes("username")) {
        setErrors({ ...errors, username: error });
      } else if (error.includes("password")) {
        setErrors({ ...errors, password: error });
      }
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
        style={{
          backgroundImage:
            "url('https://www.thoughtco.com/thmb/afeWP0VLyxBFrzS_s2D-C7V2PjE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/abstract-paper-flower-pattern-656688606-5acfba2eae9ab80038461ca0.jpg')",
        }}
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
    </Container>
  );
};

export default Login;
