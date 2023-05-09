import React, { useState, useEffect, useCallback } from "react";
import { List, ListItem, Tabs, Tab } from "@mui/material";
import { getFeeds } from "../api/feeds";
import Feedcard from "./Feedcard";
import { getUserId } from "../helper";
import Box from "@mui/material/Box";
import { getAllFeedbacks } from "../api/feedback";
import FeedbackCard from "./FeedbackCard";
import { feedInteractions } from "../helper/constants";

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
  const userId = getUserId();
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
      let fetchedFeedbacks = await getAllFeedbacks(true);
      //console.log(fetchedFeedbacks);
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

  const handleChange = (_event, newValue) => {
    setTabValue(newValue);
  };

  const getUpdatedArray = (list, booleanValue) => {
    if (booleanValue) {
      list.push(userId);
    } else {
      list.splice(list.indexOf(userId), 1);
    };
    return list;
  };
  const updateFeed = (feedId, action, value) => {
    const updatedFeeds = feeds.map((eachFeed) => {
      if (eachFeed?._id === feedId) {
        if (action === feedInteractions.like) {
          eachFeed.liked = getUpdatedArray(eachFeed.liked, value);
        };
        if (action === feedInteractions.save) {
          eachFeed.saved = getUpdatedArray(eachFeed.saved, value);
        };
        if (action === feedInteractions.comment) {
          const newComment = {
            comment: value?.comment,
            userName: value?.userName,
            commentedAt: new Date().toISOString()
          };
          if (Array.isArray(eachFeed?.comment?.[userId])) {
            eachFeed.comment[userId].push(newComment);
          } else {
            eachFeed.comment[userId] = [newComment];
          }
        };
      };
      return eachFeed;
    });
    setFeeds([...updatedFeeds]);
  };

  return (
    <>
      <Box>
        <Tabs value={tabValue} onChange={handleChange}>
          <Tab label="Feeds" />
          <Tab label="Reviews" />
        </Tabs>
        {tabValue === 0 && (
          <List>
            {feeds.map((feed, index) => (
              <ListItem key={index} sx={{display: 'flex', justifyContent: 'center'}}>
                <Feedcard
                  feed={feed}
                  userId={userId}
                  updateFeedInteractions={updateFeed}
                  />
              </ListItem>
            ))}
          </List>
        )}
        {tabValue === 1 && Array.isArray(feedbacks) && (
          <List>
          {feedbacks.map((feedback, index) => (
            <ListItem key={index}>
              <FeedbackCard feedback={feedback}/>
            </ListItem>
          ))}
        </List>
        )}
      </Box>
    </>
  );
};

export default Homepage;
