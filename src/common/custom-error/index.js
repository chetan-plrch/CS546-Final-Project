import React from 'react';

export default function ErrorMessage(props) {
  return (
    <div id="error-message">
        {props.message}
    </div>
  )
}