import React from 'react'
import Notification from './Notification'

const NotificationList = ({notifications}) => {

    let list = notifications.map(n => {
            return <Notification text={n.text} />
        })

    return (
        <div className="container">
            <h2>Notification List</h2>
            <div className="row">
                {list}
            </div>
        </div>
    )
}

export default NotificationList