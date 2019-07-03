import React, { Component } from 'react'
import AddNotification from './AddNotification'
import NotificationList from './NotificationList'
import { apiCall } from '../../../util/api'
import DashboardHeader from '../../Other/DashboardHeader'

class Communicate extends Component {
    state = {
        notifications: [],
        showNotificationsList: false
    }

    constructor(props) {
        super(props)

        this.getNotifications()
    }

    componentDidUpdate(prevProps) {
        if (this.props.currentCohortId !== prevProps.currentCohortId) {
            this.getNotifications()
        }
    }

    getNotifications = () => {
        let tripId = this.props.currentTrip._id
        let cohortId = this.props.currentCohort._id
        apiCall('get', `/api/trips/${tripId}/cohorts/${cohortId}/notifications`).then(data => {
            // Get Notifications
            return this.setState({
                notifications: [...data],
                showNotificationsList: true
            })
        })
    }

    createNotification = notification => {
        let tripId = this.props.currentTrip._id
        let cohortId = this.props.currentCohort._id
        apiCall('post', `/api/trips/${tripId}/cohorts/${cohortId}/notifications`, notification).then(createReturn => {
            // Create Notification
            notification._id = createReturn._id
            return this.setState(prevState => {
                return {
                    notifications: [...prevState.notifications, notification]
                }
            })
        })
    }

    sendNotification = notificationId => {
        let tripId = this.props.currentTrip._id
        let cohortId = this.props.currentCohort._id
        apiCall('put', `/api/trips/${tripId}/cohorts/${cohortId}/notifications/${notificationId}/send`).then(() => {
            // Send Notification
            return this.setState(prevState => {
                return {
                    notifications: prevState.notifications.map(n => {
                        if (n._id === notificationId) {
                            n.sent = true
                            return n
                        }
                        return n
                    })
                }
            })
        })
    }

    render() {
        let { showNotificationsList, notifications } = this.state
        let notificationsList = showNotificationsList ? <NotificationList notifications={notifications} handleSend={this.sendNotification} /> : null

        return (
            <div class="">
                <div className="row">
                    <div className="col-md-8">
                        <div className="">
                            <div className="d-flex justify-content-around my-3">
                                <AddNotification submit={this.createNotification} />
                            </div>
                        </div>
                        <h4>
                            <strong>Notifications</strong>
                        </h4>
                        <div className="">
                            <div className="card trip-list-header py-2 d-flex flex-row justify-content-between align-items-center shadow my-3 pl-2">
                                <div className="col-4 border-bottom border-primary">Subject</div>
                                <div className="col-6">Message</div>
                                <div className="col-2">Send</div>
                            </div>
                            {notificationsList}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Communicate
