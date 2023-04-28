import React, { useState } from "react";
import Signup from "../components/Signup";
import "./HomePage.css";
import FeedBackPop from "../components/feedBack/feedBackPop";

const HomePage = () => {
  const [feedbackExists, setFeedbackExists] = useState(false);

  
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
