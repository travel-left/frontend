import React, { Component } from 'react'
import AddNotification from './AddNotification'
import NotificationList from './NotificationList'
import { apiCall } from '../../../util/api'
import Alert from '../../Other/Alert'

class Communicate extends Component {
    state = {
        notifications: [],
        showNotificationsList: false
    }

    constructor(props) {
        super(props)
        this.getShowAlertAndSetState()
        this.getNotifications()
    }

    componentDidUpdate(prevProps) {
        if (this.props.currentCohortId !== prevProps.currentCohortId) {
            this.getNotifications()
        }
    }

    getShowAlertAndSetState = async () => {
        const { _id } = this.props.currentUser.user
        const coordinator = await apiCall('get', `/api/coordinators/${_id}`)
        if (coordinator.showAlerts.communicate === 'true') {
            this.setState({
                showAlert: true
            })
        }
    }

    closeAlert = async () => {
        const { _id } = this.props.currentUser.user
        await apiCall('put', `/api/coordinators/${_id}`, { showAlerts: { communicate: false } })
        this.setState({
            showAlert: false
        })
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
        let { showNotificationsList, notifications, showAlert } = this.state
        let notificationsList = showNotificationsList ? <NotificationList notifications={notifications} handleSend={this.sendNotification} /> : null
        let alert = showAlert ? <Alert text='This is where you can communicate with the travelers on your trip.  Click "NEW NOTIFICATION" to create and send a real-time notification to your travelers.' closeAlert={this.closeAlert} /> : null

        return (
            <div class="">
                <div className="row">
                    <div className="col-md-12 d-none d-md-block">{alert}</div>
                </div>
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
