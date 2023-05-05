import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./layouts/HomePage.js";
import Profile from "./components/profile/index.js";
import Connections from "./components/connections/index.js";
import Login from "./components/login/index.js";
import Users from "./components/users/index.js";
import "./App.css";
import SignUp from "./components/signup/index.js";
import Middle from "./components/feedBack/middle.js";
import Feedback from "./components/feedBack/feedback.js";
import FeedBackList from "./components/feedBack/feedBackList.js";
import NotFound from "./components/notfound.js";
import { checkLoggedInOnBackend } from "./api/index.js";
import AppBar from "./common/custom-navbar/index.js";
import AppFooter from "./common/custom-footer/index.js";
import Protected from "./components/protected.js";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  useEffect(() => {
    async function checkAuthorized() {
      const isUserLoggedIn = await checkLoggedInOnBackend();
      setIsLoggedIn(isUserLoggedIn);
    }

    checkAuthorized();
  }, []);

  
  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
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
            path="/feedbacks"
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <Feedback />
              </Protected>
            }
          />
          <Route
            exact
            path="/feedbacks/feedback"
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <Middle />
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
    </div>
  );
};

export default App;
