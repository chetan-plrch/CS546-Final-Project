import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify/dist/react-toastify.js";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../api";
import validations from "../../helper/validations";
import "./index.css";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({}); // Pre-request validation errors
  const [error, setError] = useState('') // Stores error after login request is made
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (e) => e.preventDefault();

  const handleUsernameChange = (e) => {
    setError();
    setUsername(e.target.value);
    try {
      validations.checkUsername(e.target.value);
      setErrors((prevErrors) => ({ ...prevErrors, username: "" }));
    } catch (error) {
      if (error?.message?.includes?.("username")) {
        setErrors((prevErrors) => ({ ...prevErrors, username: error.message }));
      }
    }
  };
  
  const handlePasswordChange = (e) => {
    setError();
    setPassword(e.target.value);
    try {
      validations.checkPassword(e.target.value);
      setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    } catch (error) {
      if (error?.message?.includes?.("password")) {
        setErrors((prevErrors) => ({ ...prevErrors, password: error.message }));
      }
    }
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    let validationErrors = {};

    try {
      validations.checkUsername(username);
    } catch (error) {
      validationErrors = {
        ...validationErrors,
        username: error?.message || 'Some problem occurred while validating the username!'
      };
    }

    try {
      validations.checkPassword(password);
    } catch (error) {
      validationErrors = {
        ...validationErrors,
        password: error?.message || 'Some problem occurred while validating the password!'
      };
    }

    if (Object.keys(validationErrors)?.length ) {
    setErrors(validationErrors);
    return;
  } else {
    setErrors({}); // reset the errors state when the inputs are valid
  }

    try {
      const resp = await loginUser({ username, password });
      if (resp.status !== 200) {
        throw new Error(resp?.response?.data);
      };
      setError();
      toast.success(resp?.data?.message || 'Succesfully logged in!');
      setTimeout(() => {
        navigate("/home");
      }, 500);
    } catch (error) {
      const msg = error?.message || 'Could not login. Please try again!';
      setError(msg);
      toast.error(msg);
    };
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
        <Typography component="h1" variant="h5" color="#2d842d">
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
            fullWidth
            id="userName"
            // label={<span style={{ fontWeight: 'bold', color: 'black' }}>Username</span>}
            label ="Username"
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
            fullWidth
            name="password"
            label={<span style={{ fontWeight: 'bold', color: 'black' }}>Password</span>}
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
            disabled={!username || !password || errors?.password || errors?.username}
            sx={{ marginTop: 2, marginBottom: 2 }}
          >
            Login
          </Button>
          {error && (
            <Box marginTop={2}>
              <Alert severity="error">
                <div>{error}</div>
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
