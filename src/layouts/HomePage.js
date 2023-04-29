import React, { useState, useEffect } from "react";
import Signup from "../components/Signup";
import "./HomePage.css";

import FeedBackPop from "../components/feedBack/feedBackPop";

import { getFeedbackByChatId } from "../api/feedback";

const HomePage = () => {

  const [feedbackExists, setFeedbackExists] = useState(false);

  useEffect(() => {
    const checkFeedback = async () => {
      try {
        const response = await getFeedbackByChatId("6445696e99e0f288c0614080")
        console.log(response);
        if (response) {
            setFeedbackExists(true);
        } else {
          console.log("hitting second else");
          setFeedbackExists(false);
        }
      } catch (error) {
        console.error("Error fetching feedback:", error);
        setFeedbackExists(false);
      }
    };
    checkFeedback();
  }, []);
  
  return (
    <>
      <div className="homepage">Home HomePage</div>
      <div>
        <FeedBackPop chatId = "6445696e99e0f288c0614080" feedbackExists = {feedbackExists} username = "John Doe" />
      </div>
    </>
  );
};

export default HomePage;
