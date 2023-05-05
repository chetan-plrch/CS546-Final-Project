
import React, { useState, useEffect, useCallback } from 'react';
import { List, ListItem } from '@mui/material';
import { getFeeds } from "../api/feeds";
import Feedcard from './Feedcard';
import { getUserId } from '../helper';
import Box from '@mui/material/Box';

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
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
};

const Homepage = () => {
  const [feeds, setFeeds] = useState([]);
  const [page, setPage] = useState(1);

  const loadMoreFeeds = async () => {
    setPage((prevPage) => prevPage + 1);
    const fetchedFeeds = await getFeeds(page);
    setFeeds((prevFeeds) => [...prevFeeds, ...fetchedFeeds]);
  };

  useInfiniteScroll(loadMoreFeeds);

  useEffect(() => {
    const fetchFeeds = async () => {
      const fetchedFeeds = await getFeeds(page);
      setFeeds(fetchedFeeds);
    };

    fetchFeeds();
  }, [page]);

  const userId = getUserId();

  return (
    <>
    <Box pt={10} pb={5}>
      <List>
        {feeds.map((feed, index) => (
          <ListItem key={index}>
            <Feedcard feed={feed} userId={userId} />
          </ListItem>
        ))}
      </List>
    </Box>
    </>
  );
};

export default Homepage;
