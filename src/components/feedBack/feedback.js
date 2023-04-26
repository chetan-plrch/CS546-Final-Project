import React, { useState } from 'react';
import FeedBackForm from './feedBackForm';
import FeedBackPop from './feedBackPop';
import FeedBackList from './feedBackList';
import styles from './feedback.css';
import Cookies from 'js-cookie';
import { useLocation } from "react-router-dom";

const Feedback = () => {
  const extractedUserId = Cookies.get('userId');
  const regex = /"([^"]+)"/;
  const userId = extractedUserId.match(regex)[1];
  console.log(extractedUserId);

  // const location = useLocation();
  // const chatId = location.state.chatId;

  //state to manage the update key
  const [updateKey, setUpdateKey] = useState(0);

  // Function to handle the feedback submission
  const handleFeedbackSubmit = () => {
    setUpdateKey((prevUpdateKey) => prevUpdateKey + 1);
  };

  return (
    <div className={styles.feedbackContainer}>
      <div className={styles.feedbackItem}>
        {/* Pass the handleFeedbackSubmit function to the FeedBackForm */}
        <FeedBackForm userId={userId} onSubmit={handleFeedbackSubmit} />
      </div>
      <div >
        {/* Pass the updateKey state to the FeedBackList */}
        <FeedBackList userId={userId} updateKey={updateKey} />
      </div>
      {/* <FeedBackPop /> */}
    </div>
  );
};

export default Feedback;
