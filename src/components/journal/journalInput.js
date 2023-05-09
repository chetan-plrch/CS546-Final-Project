import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Box from "@mui/material/Box";
import { getUserId } from "../../helper";
import { createJournal } from "../../api/journal";
import { ToastContainer, toast } from "react-toastify/dist/react-toastify.js";
import "react-toastify/dist/ReactToastify.css";
import JournalList from "./journalList";

const JournalInput = ({ onClose }) => {
  const [message, setMessage] = useState("");
  const [showJournalList, setShowJournalList] = useState(false);

  const handleCreateJournal = async () => {
    try {
      const userId = getUserId();
      const date = new Date().toISOString();
      const response = await createJournal({ userId, message, date });
      if (response.status === 200) {
        toast.success("Journal created successfully!");
        setMessage("");
        onClose();
      } else {
        toast.error(
          "Failed to create journal: unexpected status code " + response.status
        );
      }
    } catch (error) {
      console.error("Error creating journal:", error);
      toast.error("Error creating journal. Please try again.");
    }
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          borderRadius: 2,
          p: 3,
          my: 2,
        }}
      >
        <TextareaAutosize
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your notes here..."
          minRows={6}
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "4px",
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateJournal}
          sx={{
            mt: 2,
            mr: 1,
          }}
        >
          Save
        </Button>
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{
            mt: 2,
          }}
        >
          Cancel
        </Button>
      </Box>
      <Button
        variant="outlined"
        onClick={() => setShowJournalList(!showJournalList)}
        sx={{
          mt: 2,
        }}
      >
        {showJournalList ? "Hide Journals" : "Show Journals"}
      </Button>
      {showJournalList && <JournalList />}
      <ToastContainer />
    </>
  );
};

export default JournalInput;
