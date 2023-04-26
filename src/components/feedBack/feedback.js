import React from 'react';
import FeedBackForm from './feedBackForm';
import FeedBackPop from './feedBackPop';
import FeedBackList from './feedBackList';
import styles from './feedback.css';
import Cookies from 'js-cookie';

const Feedback = () => {
  //getting the userId from cookie and pasing it into the other components as required
  const extractedUserId = Cookies.get('userId');
  const regex = /"([^"]+)"/;
  const userId = extractedUserId.match(regex)[1];
  console.log(extractedUserId);

  return (
    <div className={styles.feedbackContainer}>
      <div className={styles.feedbackItem}>
        <FeedBackForm userId={userId} />
      </div>
      <div className={styles.feedbackItem}>
        <FeedBackList userId={userId} />
      </div>
    </div>
  );
};

export default Feedback;
