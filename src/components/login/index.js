import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify/dist/react-toastify.js";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';


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
    const data = { userName: username, password: password };
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
      <div className="login-container">
        <form className="login-form">
          <h2>Login</h2>
          <input
            className="login-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login-button" onClick={handleSubmit}>
            Submit
          </button>
        </form>
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
