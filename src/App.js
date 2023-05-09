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
import Journal from "./components/journal/journal";
import { Fab, Dialog, DialogTitle, DialogContent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { ToastContainer } from "react-toastify/dist/react-toastify";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [journalOpen, setJournalOpen] = useState(false);
  useEffect(() => {
    async function checkAuthorized() {
      const isUserLoggedIn = await checkLoggedInOnBackend();
      setIsLoggedIn(isUserLoggedIn);
    }

    checkAuthorized();
  }, [window.location.pathname]);

  const handleJournalOpen = () => {
    setJournalOpen(true);
  };

  const handleJournalClose = () => {
    setJournalOpen(false);
  };

  
  return (
    <div className="App">
      
      <BrowserRouter>
      <Fab
          color="primary"
          aria-label="add"
          style={{
            position: 'fixed',
            bottom: 16,
            right: 16,
          }}
          onClick={handleJournalOpen}
        >
          <AddIcon />
        </Fab>

        <Dialog
          open={journalOpen}
          onClose={handleJournalClose}
          aria-labelledby="journal-dialog-title"
        >
          <DialogTitle id="journal-dialog-title">Journal</DialogTitle>
          <DialogContent>
            <Journal onClose={handleJournalClose} />
          </DialogContent>
        </Dialog>
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
