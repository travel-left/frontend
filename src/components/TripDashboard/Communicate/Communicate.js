import React, { Component } from 'react'
import AddNotification from './AddNotification'
import NotificationList from './NotificationList'
import { apiCall } from '../../../util/api'
import ContactList from './ContactList'
import AddContact from './AddContact'
import Alert from '../../Other/Alert'
import DashboardHeader from '../../Other/DashboardHeader'

class Communicate extends Component {
    state = {
        contacts: [],
        showContactList: false,
        notifications: [],
        showNotificationsList: false
    }

    constructor(props) {
        super(props)

        this.getNotifications()
        this.getContacts()
    }

    componentDidUpdate(prevProps) {
        if (this.props.currentCohort !== prevProps.currentCohort) {
            this.getNotifications()
            this.getContacts()
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

    getContacts = () => {
        let tripId = this.props.currentTrip._id
        let cohortId = this.props.currentCohort._id
        apiCall('get', `/api/trips/${tripId}/cohorts/${cohortId}/contacts`).then(data => {
            // Get Contacts
            return this.setState({
                contacts: [...data],
                showContactList: true
            })
        })
    }

    createNotification = notification => {
        let tripId = this.props.currentTrip._id
        let cohortId = this.props.currentCohort._id
        apiCall('post', `/api/trips/${tripId}/cohorts/${cohortId}/notifications`, notification).then(() => {
            // Create Notification
            return this.setState(prevState => {
                return {
                    notifications: [
                        ...prevState.notifications,
                        notification
                    ]
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

    createContact = contact => {
        let tripId = this.props.currentTrip._id
        let cohortId = this.props.currentCohort._id
        apiCall('post', `/api/trips/${tripId}/cohorts/${cohortId}/contacts`, { trip_id: this.props.currentTrip._id, ...contact }).then(() => {
            // Create Contact
            return this.setState(prevState => {
                return {
                    contacts: [...prevState.contacts, contact]
                }
            })
        })
    }

    render() {
        let { showNotificationsList, notifications, showContactList, contacts } = this.state
        let contactList = showContactList ? <ContactList contacts={contacts} /> : null
        let notificationsList = showNotificationsList ? <NotificationList notifications={notifications} handleSend={this.sendNotification} /> : null

        return (
            <div class="">
                <div className="row">
                    <div className="col-12">
                        <Alert text="Use this area to improve communication among your travelers." />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <DashboardHeader title="Communicate" description="Add emergency contacts, create and send notifications, and make sure everyone is on the same page!" currentTrip={this.props.currentTrip} />
                        <h4>
                            {' '}
                            <strong>Emergency Contacts</strong>
                        </h4>
                        <div className="">
                            <div className="d-flex justify-content-around my-3">
                                <AddContact submit={this.createContact} />
                                <AddNotification submit={this.createNotification} />
                            </div>
                            <div className="card trip-list-header py-2 d-flex flex-row justify-content-between align-items-center shadow my-3 pl-2">
                                <div className="col-3 border-bottom border-primary"> Name</div>
                                <div className="col-3">Email</div>
                                <div className="col-3">Phone</div>
                            </div>
                            {contactList}
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
