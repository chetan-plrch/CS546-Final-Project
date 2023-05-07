import React, { useState, useEffect } from "react";
import FeedBackEditForm from "./feedBackEditForm";
import styles from "./feedback.css";
import { getFeedbackByChatId } from "../../api/feedback";

const Middle = (props) => {
  const [feedbackId, setFeedbackId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("in the middle")
        const response = await getFeedbackByChatId(props.chatId, props.userId);
        console.log(response);
        setFeedbackId(response._id);
      } catch (error) {
        console.error("Failed to fetch feedback data:", error);
      }
    };
    fetchData();
  }, [props.chatId, props.userId]);

  return (
    <div className={styles.feedbackContainer}>
      <div className={styles.feedbackItem}>
        <FeedBackEditForm feedbackId={feedbackId} username={props.username} />
      </div>
    </div>
  );
};

export default Middle;
