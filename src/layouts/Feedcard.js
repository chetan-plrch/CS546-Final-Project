import React from 'react';
import './Feedcard.css';

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
        <div>
      <span className='description'>{feed?.description}</span>
    </div>
  </div>
  );
};

export default FeedCard;
