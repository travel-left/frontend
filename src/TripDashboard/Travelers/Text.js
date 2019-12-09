import React from 'react'
import Moment from 'react-moment'

const Text = ({ message, createdAt }) => (
    <div className='col-12'>
        <Moment
            date={createdAt}
            format="MMMM DD"
            className="TravelerInfo-text-date"
        />
        <p>{message.substring(0, message.length - 32)}</p>
    </div>
)

export default Text
