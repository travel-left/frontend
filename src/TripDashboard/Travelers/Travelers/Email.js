import React from 'react'
import Moment from 'react-moment'

const Email = ({ body, subject, createdAt }) => (
    <>
        <u className="row">
            <Moment
                date={createdAt}
                format="MMMM DD, hh:mm A"
                className="text-dark col-12"
            />
        </u>
        <div className="row">
            <strong className="col-12">{subject}</strong>
        </div>
        <div className="row">
            <p className="col-12">{body}</p>
        </div>
    </>
)

export default Email
