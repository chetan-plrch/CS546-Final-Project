import React, { useState, useEffect } from "react";
import FeedBackEditForm from "./feedBackEditForm";
import { useLocation } from "react-router-dom";
import styles from "./feedback.css";
import { getFeedbackByChatId } from "../../api/feedback";
import Cookies from 'js-cookie';

const Middle = () => {
  const location = useLocation();
  const chatId = location.state.chatId;
  const username = location.state.username;
  const directFeedbackId = location.state.feedbackId;
  const [feedbackId, setFeedbackId] = useState(null);
  const [userId, setUserID] = useState();

  useEffect(() => {
    const extractedUserId = Cookies.get('userId');
    const regex = /"([^"]+)"/;
    const matchedUserId = extractedUserId.match(regex)[1];
    setUserID(matchedUserId);
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (chatId) {
          const response = await getFeedbackByChatId(chatId, userId);
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
  }, [chatId, directFeedbackId, userId]);

  return (
    <div className={styles.feedbackContainer}>
      <div className={styles.feedbackItem}>
        <FeedBackEditForm feedbackId={feedbackId} username = {username}/>
      </div>
    </div>
  );
};

export default Middle;
