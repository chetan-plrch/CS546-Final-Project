import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import HomePage from "./layouts/HomePage";
import Profile from "./components/profile";
import Connections from "./components/connections";
import Login from "./components/login";
import Users from "./components/users";
import "./App.css";
import SignUp from "./components/signup";
import FeedBackList from "./components/feedBack/feedBackList";
import NotFound from "./components/notfound";
import { checkLoggedInOnBackend } from "./api/index.js";
import AppBar from "./common/custom-navbar/index.js";
import AppFooter from "./common/custom-footer/index.js";
import Protected from "./components/protected";

import { ToastContainer } from "react-toastify/dist/react-toastify";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  
  useEffect(() => {
    async function checkAuthorized() {
      const isUserLoggedIn = await checkLoggedInOnBackend();
      setIsLoggedIn(isUserLoggedIn);
    }

    checkAuthorized();
  }, [window.location.pathname]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Navigate to='/home' />
            }
          />
          <Route
            exact
            path="/home"
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <HomePage />
              </Protected>
            }
          />
          <Route
            exact
            path="/signup"
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <SignUp />
              </Protected>
            }
          />
          <Route
            exact
            path="/login"
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <Login />
              </Protected>
            }
          />
          <Route
            exact
            path="/profile"
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <Profile />
              </Protected>
            }
          />
          <Route
            exact
            path="/feedbackslist"
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <FeedBackList />
              </Protected>
            }
          />
          <Route
            exact
            path="/experts"
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <Users />
              </Protected>
            }
          />
          <Route
            exact
            path="/connections"
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <Connections />
              </Protected>
            }
          />
          <Route
            path="*"
            element={
              <>
                <AppBar />
                <NotFound />
                <AppFooter />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
};

export default App;
