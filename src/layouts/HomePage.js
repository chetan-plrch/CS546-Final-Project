import React, { useState, useEffect } from "react";
import "./HomePage.css";

import FeedBackPop from "../components/feedBack/feedBackPop";


const HomePage = () => {

  return (
    <>
      <div className="homepage">Home HomePage</div>
      <div>
        <FeedBackPop
          chatId="6445696e99e0f288c0614080"
          username = "john doe"
        />
      </div>
    </>
  );
};

export default HomePage;