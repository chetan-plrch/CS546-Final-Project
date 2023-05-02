import React, { useState, useEffect } from "react";
import "./HomePage.css";
import Cookies from 'js-cookie';

import FeedBackPop from "../components/feedBack/feedBackPop";

import { getFeedbackByChatId } from "../api/feedback";

const HomePage = () => {
  const [feedbackExists, setFeedbackExists] = useState(false);
  const [userId, setUserID] = useState();

  useEffect(() => {
    const extractedUserId = Cookies.get('userId');
    const regex = /"([^"]+)"/;
    const matchedUserId = extractedUserId.match(regex)[1];
    setUserID(matchedUserId);
  }, []);

  useEffect(() => {
    if (!userId) return;

    const checkFeedback = async () => {
      try {
        const response = await getFeedbackByChatId("6445696e99e0f288c0614080", userId);
        console.log(response);
        if (response) {
          setFeedbackExists(true);
        } else {
          setFeedbackExists(false);
        }
      } catch (error) {
        console.error("Error fetching feedback:", error);
        setFeedbackExists(false);
      }
    };
    checkFeedback();
  }, [userId]);

  return (
    <>
      <div className="homepage">Home HomePage</div>
      <div>
        <FeedBackPop
          chatId="6445696e99e0f288c0614080"
          feedbackExists={feedbackExists}
          username="John Doe"
        />
      </div>
      {/* <div>
        <Logout/>
      </div> */}
    </>
  );
};

export default HomePage;
