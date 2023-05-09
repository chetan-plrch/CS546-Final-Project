import React, { useState, useEffect, useCallback } from "react";
import { List, ListItem, Tabs, Tab } from "@mui/material";
import { getFeeds } from "../api/feeds";
import Feedcard from "./Feedcard";
import { getUserId } from "../helper";
import Box from "@mui/material/Box";
import { getAllFeedbacks } from "../api/feedback";
import FeedbackCard from "./FeedbackCard";

const useInfiniteScroll = (callback) => {
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      callback();
    }
  }, [callback]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);
};

const Homepage = () => {
  const [feeds, setFeeds] = useState([]);
  const [page, setPage] = useState(1);
  const [feedbacks, setFeedbacks] = useState([]);
  const [tabValue, setTabValue] = useState(0);


  const loadMoreFeeds = async () => {
    setPage((prevPage) => prevPage + 1);
    const fetchedFeeds = await getFeeds(page);
    setFeeds((prevFeeds) => [...prevFeeds, ...fetchedFeeds]);
  };

  useInfiniteScroll(loadMoreFeeds);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const fetchedFeedbacks = await getAllFeedbacks(true);
      if (Array.isArray(fetchedFeedbacks.data)) {
        setFeedbacks(fetchedFeedbacks.data);
      } else {
        console.error("getAllFeedbacks did not return an array");
      }
    };

    fetchFeedbacks();
  }, []);

  useEffect(() => {
    const fetchFeeds = async () => {
      const fetchedFeeds = await getFeeds(page);
      setFeeds(fetchedFeeds);
    };

    fetchFeeds();
  }, [page]);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const userId = getUserId();

  return (
    <>
      <Box pt={10} pb={5}>
        <Tabs value={tabValue} onChange={handleChange}>
          <Tab label="Feeds" />
          <Tab label="Reviews" />
        </Tabs>
        {tabValue === 0 && (
          <List>
            {feeds.map((feed, index) => (
              <ListItem key={index}>
                <Feedcard feed={feed} userId={userId} />
              </ListItem>
            ))}
          </List>
        )}
        {tabValue === 1 && Array.isArray(feedbacks) && (
          <List>
            {feedbacks.map((feedback, index) => (
              <ListItem key={index}>
                <FeedbackCard feedback={feedback} userId={userId} />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </>
  );
};

export default Homepage;
