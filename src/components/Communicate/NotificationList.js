import React, { Component } from 'react'
import Notification from './Notification'

class NotificationList extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        let list = null

        if(this.props.notifications) {
            list = this.props.notifications.map(n => {
                return <Notification text={n.text} />
            })
        }

        return (
            <div className="container">
                <h2>Notification List</h2>
                <div className="row">
                    {list}
                </div>
            </div>
        )
    }
}

export default NotificationList