import React from 'react';
import './Feedcard.css';
import {
  TurnedInNot,
  ChatBubbleOutline,
  FavoriteBorderOutlined
} from '@mui/icons-material';

const FeedCard = (props) => {
  const { feed, userId } = props;

  const getDate = (date) => {
    return new Date(date)?.toDateString();
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
        <span>Like</span>
        <FavoriteBorderOutlined />
      </div>
      <div>
        <span>Comment</span>
        <ChatBubbleOutline />
      </div>
      <div>
        <span>Save</span>
        <TurnedInNot />
      </div>
    </div>
  </div>
  );
};

export default FeedCard;
