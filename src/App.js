import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./layouts/HomePage";
import Profile from "./components/profile";
import Connections from "./components/connections";
import Login from "./components/login";
import Users from "./components/users";
import "./App.css";
import SignUp from "./components/Signup";
import Chat from "../src/common/custom-chat/index.js";
import Chat2 from "../src/common/custom-chat/index2.js";
import Middle from "./components/feedBack/middle";
import Feedback from "./components/feedBack/feedback";
import FeedBackList from "./components/feedBack/feedBackList";
import NotFound from "./components/notfound";
import { checkLoggedInOnBackend } from "./api/index.js";
import AppBar from "./common/custom-navbar/index.js";
import AppFooter from "./common/custom-footer/index.js";
import Protected from "./components/protected";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  useEffect(() => {
    async function checkAuthorized() {
      const isUserLoggedIn = await checkLoggedInOnBackend();
      setIsLoggedIn(isUserLoggedIn);
    }

    checkAuthorized();
  }, []);

  if (isLoggedIn === null) {
    return <div className="app-loader">Loading...</div>;
  } else {
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
              exact
              path="/chat-1"
              element={
                <>
                  <Chat
                    user1={"6438d7ac8e1c21e45686e198"}
                    user2={"6439851768f667131bd19b4a"}
                  />
                </>
              }
            />
            <Route
              exact
              path="/chat-2"
              element={
                <>
                  <Chat2
                    user1={"6439851768f667131bd19b4a"}
                    user2={"6438d7ac8e1c21e45686e198"}
                  />
                </>
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
  }
};

export default App;
