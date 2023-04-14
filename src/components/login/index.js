import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify/dist/react-toastify.js";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  async function handleSubmit(event) {
    event.preventDefault();
    if (!username || !password) {
      setErrors(["Please enter a username and password."]);
      return;
    }
    const data = { username, password };
    let response = await fetch("/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      setErrors(
        errorData.errors || [
          "An error occurred while logging in. Please try again.",
        ]
      );
    } else {
      const responseData = await response.json();
      //console.log(responseData);
      toast.success(responseData.message);
      setErrors([]);
      // Delay redirect and show toast notification
      setTimeout(() => {
        navigate("/user/profile");
      }, 3000);
    }
  }

  return (
    <>
    <div>
      <Form className="login-form">
      <h2 id="logIn">Log In</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
      {errors.length > 0 && (
          <div className="error-banner">
            {errors.map((error, index) => (
              <div key={index}>{error}</div>
            ))}
          </div>
        )}
    </div>
    <ToastContainer />
    </>
  );
};

export default Login;
