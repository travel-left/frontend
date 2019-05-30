import React from 'react'
import Notification from './Notification'

const NotificationList = ({ notifications }) => {
    let list = notifications.map(n => {
        return <Notification text={n.text} />
    })

    return (
            <div className="">{list}</div>
    )
}

export default NotificationList
