import React from 'react'

const Notification = ({ text, subject, sent }) => {
    return (
        <div className="card py-2 my-3 shadow">
            <div className="row no-gutters d-flex flex-row justify-content-around align-items-center">
                <div className="col-4">{subject}</div>
                <div className="col-7">{text}</div>
            </div>
        </div>
    )
}

export default Notification
