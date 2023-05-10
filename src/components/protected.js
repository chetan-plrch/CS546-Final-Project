import React, { useEffect, useState } from "react";
import PageLoader from "./loading";
import AppBar from "../common/custom-navbar/index.js";
import AppFooter from "../common/custom-footer/index.js";
import { useNavigate } from "react-router-dom";
import { initialPage, delay } from "../helper";
import Journal from "./journal/journal";
import { Fab, Dialog, DialogTitle, DialogContent } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Typography } from "@mui/material";

const Protected = (props) => {
  const [unprotect, setUnprotect] = useState(props.isLoggedIn);
  const [journalOpen, setJournalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function navigateToRoute() {
      if (props.isLoggedIn && initialPage()) {
        // Login and signup page flow
        navigate("/home");
        await delay(1000);
        setUnprotect(true);
      } else if (!props.isLoggedIn && !initialPage()) {
        // When not loggedin
        navigate("/login");
        await delay(1000);
        setUnprotect(true);
      } else {
        // For all the other scenarios
        await delay(1000);
        setUnprotect(true);
      }
    }

    if (props.isLoggedIn === true || props.isLoggedIn === false) {
      navigateToRoute();
    }
  }, [props.isLoggedIn]);

  const handleJournalOpen = () => {
    setJournalOpen(true);
  };

  const handleJournalClose = () => {
    setJournalOpen(false);
  };

  if (unprotect) {
    return (
      <>
        <AppBar />
        {!initialPage() ? (
          <>
            <Fab
              color="primary"
              aria-label="add"
              size="large"
              style={{
                position: "fixed",
                bottom: 100,
                right: 16,
                padding: "10px",
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
              <Typography component = "div" sx={{ fontSize: "30px" }}>Journal</Typography>
              <DialogContent>
                <Journal onClose={handleJournalClose} />
              </DialogContent>
            </Dialog>
          </>
        ) : null}
        <div className="spacer-top" />
        {props.children}
        <div className="spacer-bottom" />
        <AppFooter />
      </>
    );
  }
  return (
    <>
      <AppBar />
      <PageLoader />
      <AppFooter />
    </>
  );
};

export default Protected;
