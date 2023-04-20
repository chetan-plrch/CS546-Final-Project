import React from 'react'

const CommonMessage = (props) => {
    let className = props.success && 'success-message';
    className = props.error && 'error-message'

    return <div className={`signup-message-spacing ${className}`}>
        {props.message}
    </div>
}

export default CommonMessage