import React, { useState } from 'react';
import FeedBackForm from './feedBackForm';
import FeedBackList from './feedBackList';
import styles from './feedback.css';
import Cookies from 'js-cookie';
import { useLocation } from "react-router-dom";

const Feedback = () => {
  
  const extractedUserId = Cookies.get('userId');
  const regex = /"([^"]+)"/;
  const userId = extractedUserId.match(regex)[1];
  console.log(extractedUserId);

  const location = useLocation();
  const chatId = location.state.chatId;

  return (
    <div className={styles.feedbackContainer}>
      <div className={styles.feedbackItem}>
        <FeedBackForm userId={userId} chatId= {chatId}/>
      </div>
    </div>
  );
};

export default Feedback;
