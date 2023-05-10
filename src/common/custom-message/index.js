import React from 'react'

const CommonMessage = (props) => {
    let className = 'error-message'
    let message = props.message
    if (props.success) {
        className = 'success-message';
    }

    if (Array.isArray(props.message)) {
        message = props.message.map((msg, index) => {
            return <div key={index} className={className}>
                {msg}
            </div>
        })
    }

    return <div className={`signup-message-spacing ${className}`}>
        {message}
    </div>
}

export default CommonMessage