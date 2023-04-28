import React, { useEffect, useState } from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom"
import HomePage from './layouts/HomePage'
import Profile from './components/profile'
import Connections from './components/connections';
import Login from './components/login';
import './App.css';
import SignUp from './components/Signup';
import Chat from '../src/common/custom-chat/index.js';
import Chat2 from '../src/common/custom-chat/index2.js';
import Feedback from './components/feedBack/feedback';
import FeedBackEditForm from './components/feedBack/feedBackEditForm';
import NotFound from './components/notfound';
import { checkLoggedInOnBackend } from "./api/index.js";


const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    async function checkAuthorized() {
      const isUserLoggedIn = await checkLoggedInOnBackend();
      setLoggedIn(isUserLoggedIn);
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
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/feedbacks" element={<Feedback />} />
            <Route exact path="/feedbacks/feedback" element = {<FeedBackEditForm />} />
            <Route exact path="/connections" element={<Connections />} />
            <Route
              exact
              path="/chat-1"
              element={
                <Chat
                  user1={"6438d7ac8e1c21e45686e198"}
                  user2={"6439851768f667131bd19b4a"}
                />
              }
            />
            <Route
              exact
              path="/chat-2"
              element={
                <Chat2
                  user1={"6439851768f667131bd19b4a"}
                  user2={"6438d7ac8e1c21e45686e198"}
                />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
};

export default App;
