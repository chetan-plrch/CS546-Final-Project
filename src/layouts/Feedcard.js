import React, { useState } from 'react';
import './Feedcard.css';
import {
  Favorite,
  TurnedIn,
  ChatBubble,
  TurnedInNot,
  ChatBubbleOutline,
  FavoriteBorderOutlined
} from '@mui/icons-material';
import { toast , ToastContainer} from "react-toastify/dist/react-toastify.js";

import { handleLike, handleComment, handleSavePost } from '../api/feeds';
import { feedInteractions } from '../helper/constants';
import PostComments from './PostComments';
import { getUserName } from '../helper';


const FeedCard = (props) => {
  const {
    feed,
    userId,
    updateFeedInteractions
   } = props;

  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState();
  const [refreshComments, setRefreshComments] = useState(true);

  const getDate = (date) => {
    return date ? new Date(date)?.toDateString(): '';
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

  const commentOnPost = async () => {
    const userName = getUserName();
    const commentResponse = await handleComment({
      userId,
      userName,
      feedId: feed?._id,
      message: comment
    });
    if (commentResponse?.status === 200) {
      updateFeedInteractions(feed?._id, feedInteractions.comment, {comment, userName});
      setComment();
      setRefreshComments(true)
    } else {
      toast.error('Could not comment on the post! Please try again later.');
    };
  };

  const closeCommentModal = () => {
    setComment();
    setShowComments(false);
  };

  const getNumberOfComments = (cmtObj) => {
    let numberOfCmts = 0;
    Object.keys(cmtObj)?.forEach((userKey) => {
      numberOfCmts += cmtObj?.[userKey]?.length;
    });
    return numberOfCmts;
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
        <span>{getNumberOfComments(feed?.comment)} Comments</span>
        {
          feed?.comment?.[userId]?.length ? (
            <ChatBubble onClick={() => setShowComments(true)} sx={{cursor: 'pointer', marginLeft: '5px'}} />
          ) :(
            <ChatBubbleOutline onClick={() => setShowComments(true)} sx={{cursor: 'pointer', marginLeft: '5px'}} />
          )
        }
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
    <PostComments
      comment={comment}
      isOpen={showComments}
      comments={feed?.comment}
      addComment={commentOnPost}
      onClose={closeCommentModal}
      refreshComments={refreshComments}
      updateRefreshStatus={() => setRefreshComments(false)}
      updateComment={(value) => setComment(value)}
    />
  </div>
  );
};

export default FeedCard;
