import React, { Component } from 'react'
import NotificationForm from './NotificationForm'
import NotificationList from './NotificationList'
import { apiCall } from '../../../util/api'
import ContactList from './ContactList'
import ContactForm from './ContactForm'
import Alert from '../../Other/Alert'
import DashboardHeader from '../../Other/DashboardHeader'
import SideBar from '../SideBar'

class Communicate extends Component {
    state = {
        contacts: [],
        showContactList: false,
        notifications: [],
        showNotificationsList: false
    }

    constructor(props) {
        super(props)

        apiCall('get', `/api/trips/${this.props.currentTrip._id}/notifications`).then(data => {
            // Get Notifications
            return this.setState({
                notifications: [...data],
                showNotificationsList: true
            })
        })

        apiCall('get', `/api/trips/${this.props.currentTrip._id}/contacts`).then(data => {
            // Get Contacts
            return this.setState({
                contacts: [...data],
                showContactList: true
            })
        })
    }

    createNotification = text => {
        let { currentTrip } = this.props
        apiCall('post', `/api/trips/${this.props.currentTrip._id}/notifications`, { text: text }).then(() => {
            // Crate Notification
            return this.setState(prevState => {
                return {
                    notifications: [
                        ...prevState.notifications,
                        {
                            trip_id: currentTrip.id,
                            text: text
                        }
                    ]
                }
            })
        })
    }

    createContact = contact => {
        apiCall('post', `/api/trips/${this.props.currentTrip._id}/contacts`, { trip_id: this.props.currentTrip._id, ...contact }).then(() => {
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
        let notificationsList = showNotificationsList ? <NotificationList notifications={notifications} /> : null

        return (
            <div class="">
                <div className="row">
                    <div className="col-12">
                        <Alert text="Use this area to improve communication among your travelers." />
                    </div>
                </div>
                <div className="row">
                    <div className="col-8">
                        <DashboardHeader title="Communicate" description="Add emergency contacts, create and send notifications, and make sure everyone is on the same page!" />
                        <h4 style={{ marginTop: '30px', marginLeft: '30px' }}>
                            {' '}
                            <strong>Emergency Contacts</strong>
                        </h4>
                        <div className="">
                            <div className="card trip-list-header" style={{ height: '50px', justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', boxShadow: 'rgb(136, 136, 136) 0px 2px 4px', marginBottom: '20px' }}>
                                <div className="col-1" />
                                <div className="col-3" style={{ borderBottom: '2px solid #0F61D8' }}>
                                    {' '}
                                    Name
                                </div>
                                <div className="col-2" />
                                <div className="col-3">Phone</div>
                                <div className="col-3">Email</div>
                            </div>
                            {contactList}
                        </div>
                        <h4 style={{ marginTop: '30px', marginLeft: '30px' }}>
                            <strong>Notifications</strong>
                        </h4>
                        <div className="">
                            <div className="card trip-list-header" style={{ height: '50px', justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', boxShadow: 'rgb(136, 136, 136) 0px 2px 4px', marginBottom: '20px' }}>
                                <div className="col-1" />
                                <div className="col-7" style={{ borderBottom: '2px solid #0F61D8' }}>
                                    {' '}
                                    Message
                                </div>
                                <div className="col-4" />
                            </div>
                            {notificationsList}
                        </div>
                    </div>
                    <SideBar ctr={[<ContactForm submit={this.createContact} />, <NotificationForm submit={this.createNotification} />]} />
                </div>
            </div>
        )
    }
}

export default Communicate
