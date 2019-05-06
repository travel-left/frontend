import React, { Component } from 'react'
import Notification from './Notification'

class NotificationList extends Component {

    constructor(props) {
        super(props)
        
    }

    render() {
        return (
            <div className="container">
                <h2>Notification List</h2>
                <div className="row">
                    <Notification />        
                    <Notification />        
                    <Notification />        
                </div>
            </div>
        )
    }
}

export default NotificationList