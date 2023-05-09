import React from 'react';
import './Feedcard.css';
import {
  Favorite,
  TurnedIn,
  TurnedInNot,
  ChatBubbleOutline,
  FavoriteBorderOutlined
} from '@mui/icons-material';
import { toast , ToastContainer} from "react-toastify/dist/react-toastify.js";

import { handleLike, handleSavePost } from '../api/feeds';
import { feedInteractions } from '../helper/constants';


const FeedCard = (props) => {
  const {
    feed,
    userId,
    updateFeedInteractions
   } = props;

  const getDate = (date) => {
    return new Date(date)?.toDateString();
  };

  const likeCurrentPost = async () => {
    const likePostResponse = await handleLike({
      userId,
      feedId: feed?._id,
      isLike: !feed?.liked?.includes(userId)
    });

    if (likePostResponse?.status === 200) {
      updateFeedInteractions(feed?._id, feedInteractions.like, !feed?.liked?.includes(userId));
    } else {
      toast.error('Could not like the post! Please try again later.');
    };
  };

  const saveCurrentPost = async () => {
    const savePostResponse = await handleSavePost({
      userId,
      feedId: feed?._id,
      isSave: !feed?.saved?.includes(userId)
    });

    if (savePostResponse?.status === 200) {
      updateFeedInteractions(feed?._id, feedInteractions.save, !feed?.saved?.includes(userId));
    } else {
      toast.error('Could not save the post! Please try again later.');
    };
  };

  return (
  <div className='feed-container'>
    <div className='title-container'>
      <span className='post-title'>{feed?.title}</span>
      <span className='post-date'>{getDate(feed?.createdAt)}</span>
    </div>
    <img
        src={feed?.images[0]}
        alt={feed?.title}
        style={{ width: '100%', height: '500px', objectFit: 'fill', padding: '10px' }}
    />
    <div className='description-container'>
      <span className='description'>{feed?.description}</span>
    </div>
    <div className='interactions'>
      <div>
        <span>{feed?.liked?.length} Likes</span>
        {
          feed?.liked?.indexOf(userId) > -1 ? (
            <Favorite onClick={likeCurrentPost} sx={{cursor: 'pointer', marginLeft: '5px'}} />
          ) : (
            <FavoriteBorderOutlined onClick={likeCurrentPost} sx={{cursor: 'pointer', marginLeft: '5px'}} />
          )
        }
      </div>
      <div>
        <span>Comment</span>
        <ChatBubbleOutline sx={{cursor: 'pointer', marginLeft: '5px'}} />
      </div>
      <div>
        <span>{feed?.saved?.length} Saves</span>
        {
          feed?.saved?.indexOf(userId) > -1 ? (
            <TurnedIn onClick={saveCurrentPost} sx={{cursor: 'pointer', marginLeft: '5px'}} />
          ) : (
            <TurnedInNot onClick={saveCurrentPost} sx={{cursor: 'pointer', marginLeft: '5px'}} />
          )
        }
      </div>
    </div>
    <ToastContainer />
  </div>
  );
};

export default FeedCard;
