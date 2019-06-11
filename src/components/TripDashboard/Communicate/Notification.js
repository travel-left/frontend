import React from 'react'

const Notification = ({ text }) => {
    return (
        <div className="card py-2 my-3 shadow">
            <div className="row no-gutters d-flex flex-row justify-content-around align-items-center">
                <div className="col-4">
                    Lorem ipsum dolor sit amet.
                </div>
                <div className="col-7">
                    {text}
                </div>
            </div>
        </div>
    )
}

export default Notification
