// import React, { useState } from 'react';
// import FeedBackForm from './feedBackForm';
// import FeedBackList from './feedBackList';
// import styles from './feedback.css';
// import Cookies from 'js-cookie';
// import { useLocation } from "react-router-dom";
// import { getUserId } from '../../helper/index';

// const Feedback = () => {
  
//   const userId = getUserId()
//   console.log("userID from feedbacks page",userId);
//   const location = useLocation();
//   const chatId = location.state.chatId;
//   const username = location.state.username;

//   return (
//     <div className={styles.feedbackContainer}>
//       <div className={styles.feedbackItem}>
//         <FeedBackForm userId={userId} chatId= {chatId} username = {username}/>
//       </div>
//     </div>
//   );
// };

// export default Feedback;
