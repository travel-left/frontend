import React from 'react'
import Moment from 'react-moment'

const Text = ({ message, createdAt }) => (
    <>
        <u>
            <Moment
                date={createdAt}
                format="MMMM DD, hh:mm A"
                className="text-dark"
            />
        </u>
        <p>{message}</p>
    </>
)

export default Text
