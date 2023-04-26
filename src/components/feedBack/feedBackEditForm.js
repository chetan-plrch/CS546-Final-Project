import React from 'react'
import { useLocation } from 'react-router-dom'

const FeedBackEditForm = () => {
  const location = useLocation();
  const feedbackId = location.state.feedbackId;

  return (
    <>  
    <h1>Editing Form</h1>
    <p>{feedbackId}</p>
    </>
  )
}

export default FeedBackEditForm