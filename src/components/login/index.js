import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert
} from "@mui/material";
// import { ToastContainer, toast } from "react-toastify/dist/react-toastify.js";
// import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../api/index.js";
import validations from "../../validation.js";
import "./index.css";
import {IconButton} from "@mui/material";
import {InputAdornment} from "@mui/material";
import {Visibility} from "@mui/icons-material";
import {VisibilityOff} from "@mui/icons-material";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (e) => e.preventDefault();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    try {
      const validatedUsername = validations.checkUsername(e.target.value);
      setErrors((prevErrors) => ({ ...prevErrors, username: "" }));
    } catch (error) {
      if (error.includes("username")) {
        setErrors((prevErrors) => ({ ...prevErrors, username: error }));
      }
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    try {
      const validatedPassword = validations.checkPassword(e.target.value);
      setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    } catch (error) {
      if (error.includes("password")) {
        setErrors((prevErrors) => ({ ...prevErrors, password: error }));
      }
    }
  };

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
      console.log(error);
      if (error.includes("password")) {
        newErrors = { ...newErrors, password: error };
      }
    }

    if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  } else {
    setErrors({}); // reset the errors state when the inputs are valid
  }

    const loginData = {
      username: username,
      password: password,
    };

    try {
      const result = await loginUser(loginData);
      //console.log(result);
      if (result.status === 200) {
        console.log("Login successful");
        // toast.success(result.data.message);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        console.log(result[1]);
        setErrors({ ...errors, global: [result[1]] });
        // toast.error("Error in Logging in");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="xs">
      {/* <ToastContainer /> */}
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
            onChange={handleUsernameChange}
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
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={!!errors.password}
            helperText={errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: 2, marginBottom: 2 }}
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
          <Link to="/signup" style={{ textDecoration: "none", marginTop: '30px' }}>
            <Typography variant="body2" align="center" sx={{ marginTop: 1 }}>
              Don't have an account? Register
            </Typography>
        </Link>
        </Box>
      </Box>

    </Container>
  );
};

export default Login;
