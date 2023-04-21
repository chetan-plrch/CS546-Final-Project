import React from 'react'

const CommonMessage = (props) => {
    let className = 'error-message'
    if (props.success) {
        className = 'success-message';
    }

    return <div className={`signup-message-spacing ${className}`}>
        {props.message}
    </div>
}

export default CommonMessage