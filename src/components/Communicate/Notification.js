import React from 'react'

const Notification = ({ text }) => {
    return (
        <div className="container">
            <div className="row">
                <h4>{text}</h4>
            </div>
        </div>
    )
}

export default Notification
