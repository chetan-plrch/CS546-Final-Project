import React, { useState } from "react";
import axios from "axios";
import "./login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const data = { userName: username, password: password };
    let response = await fetch("/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => {
        console.error(error);
        const errorMessage = error.Allerrors.join(", ");
        setError(errorMessage);
      });
  }

  return (
    <>
      <div className="login-container">
        <form className="login-form">
          <h1>Login</h1>
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
        {error && <div className="error-banner">{error}</div>}
      </div>
    </>
  );
};

export default Login;
