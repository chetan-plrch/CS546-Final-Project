import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import Dialog from '@mui/material/Dialog';
import './PostComments.css';
import CustomButton from '../common/custom-button';
import CustomTextField from '../common/custom-textfield';

const PostComments = (props) => {
  // comment = current comment
  // comments = object containing all the comments on the post
  const {
    isOpen,
    onClose,
    comments,
    addComment,
    comment,
    updateComment,
    refreshComments,
    updateRefreshStatus
   } = props;
  // Holds comments from all users in single array to view in the list
  const [feedComments, setFeedComments] = useState([]);

  const setText = (_key, value) => {
    updateComment(value);
  };

  useEffect(() => {
    if (refreshComments) {
      setFeedComments([]);
      let allComments = [];
      Object.keys(comments)?.forEach((userCmts) => {
        allComments = allComments.concat(comments?.[userCmts]);
      });
      setFeedComments([...allComments]);
      let element = document.getElementById('list-container');
      if (element) {
          element.scrollTop = element.scrollHeight - element.clientHeight
      };
      updateRefreshStatus();
    };
  }, [refreshComments]);

  const getFormattedDate = (date) => {
    return date ? new Date(date)?.toDateString() : '';
  };

  return (
    <Dialog
      open={isOpen}
      aria-labelledby='view-comments'
      aria-describedby='view-comments'
      onClose={onClose}
      PaperProps={{ style: {
        height: '50%',
        width: '50%',
      }}}
    >
      {
        feedComments?.length ? (
          <div className='list-container'>
            {
              feedComments?.map(function(eachComment, index) {
                return (
                  <div key={index} className='comment-list-item'>
                    <span className='commented-user-details'>
                      {eachComment?.userName}
                      {` (`}
                      {getFormattedDate(eachComment?.commentedAt)}
                      {`)`}
                    </span>
                    <span>{eachComment?.comment}</span>
                  </div>
                )
              })
            }
          </div>
        ): (
          <div>
            No comments yet
          </div>
        )
      }
      <div className='footer-container'>
          <CustomTextField
              name='Type Comment'
              value={comment}
              onChange={setText}
          />
          <CustomButton title={'Comment'} onClick={addComment} disabled={!comment} />
      </div>
    </Dialog>
  )
};

PostComments.defaultProps = {
  isOpen: false,
  onClose: () => {},
  comments: {}, // struct: {'576547865a': ['this is comment 1', 'next comment', 'last comment']}
  addComment: () => {},
  comment: '',
  updateComment: () => {},
  refreshComments: false,
  updateRefreshStatus: () => {}
};

PostComments.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  comments: PropTypes.object,
  addComment: PropTypes.func,
  comment: PropTypes.string,
  updateComment: PropTypes.func,
  refreshComments: PropTypes.bool,
  updateRefreshStatus: PropTypes.func
};

export default PostComments;
