import React, { useState, useEffect } from "react";
import FeedBackEditForm from "./feedBackEditForm";
import { useLocation } from "react-router-dom";
import styles from "./feedback.css";
import { getFeedbackByChatId } from "../../api/feedback";


const Middle = () => {
  const location = useLocation();
  const chatId = location.state.chatId;
  const directFeedbackId = location.state.feedbackId;
  const [feedbackId, setFeedbackId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (chatId) {
          const response = await getFeedbackByChatId(chatId);
          console.log(response);
          setFeedbackId(response._id);
        } else if (directFeedbackId) {
          setFeedbackId(directFeedbackId);
        }
      } catch (error) {
        console.error("Failed to fetch feedback data:", error);
      }
    };
    fetchData();
  }, [chatId, directFeedbackId]);

  return (
    <div className={styles.feedbackContainer}>
      <div className={styles.feedbackItem}>
        <FeedBackEditForm feedbackId={feedbackId} />
      </div>
    </div>
  );
};

export default Middle;
