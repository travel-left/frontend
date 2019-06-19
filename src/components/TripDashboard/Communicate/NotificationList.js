import React from 'react'
import Notification from './Notification'

const NotificationList = ({ notifications }) => {
    let list = notifications.map(n => {
        return <Notification key={n._id} sent={n.sent} text={n.text} subject={n.subject} />
    })

    return <div className="">{list}</div>
}

export default NotificationList
