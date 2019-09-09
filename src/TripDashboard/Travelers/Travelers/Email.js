import React from 'react'
import Moment from 'react-moment'

const Email = ({ body, subject, createdAt }) => (
    <div className='col-12'>
        <Moment
            date={createdAt}
            format="MMMM DD"
            className="TravelerInfo-text-date"
        />
        <p>{subject}</p>
    </div>

)

export default Email
