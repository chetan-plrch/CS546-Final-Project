import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Link
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify/dist/react-toastify.js";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api";
import "./index.css";

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

    const result = await loginUser(loginData)
    console.log(result);
    if (result.status === 200) {
      toast.success(result.data.message);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else { 
      console.log(result[1]);
      setErrors([result[1]]); 
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
          <Typography className="register-link">
            Click
            <Link onClick={() => navigate("/signup")} sx={{padding: '5px', cursor: 'pointer'}}>here</Link>
            to signup
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
