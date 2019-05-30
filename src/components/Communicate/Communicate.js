import React, { Component } from 'react'
import NotificationForm from './NotificationForm'
import NotificationList from './NotificationList'
import { apiCall } from '../../services/api'
import ContactList from './ContactList'
import ContactForm from './ContactForm'
import Alert from "../Other/Alert";
import DashboardHeader from '../Other/DashboardHeader';

class Communicate extends Component {
    state = {
        contacts: [],
        showContactList: false,
        notifications: [],
        showNotificationsList: false,
    }

    constructor(props) {
        super(props)

        apiCall('get', `/api/notification/${this.props.currentTrip._id}`).then(data => {
            return this.setState({
                notifications: data.notifications,
                showNotificationsList: true
            })
        })

        apiCall('get', `/api/trip/${this.props.currentTrip._id}/contacts`).then(data => {
            return this.setState({
                contacts: data.contacts,
                showContactList: true
            })
        })
    }

    createNotification = text => {
        let { currentTrip } = this.props
        apiCall('post', `/api/notification/${this.props.currentTrip._id}`, { text: text }).then(() => {
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
        apiCall('post', `/api/contact`, { trip_id: this.props.currentTrip._id, ...contact }).then(() => {
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
                        <Alert />
                    </div>
                </div>
                <div className="row">
                    <div className="col-8">
                        <DashboardHeader title='Communicate' description='Add emergency contacts, create and send notifications, and make sure everyone is on the same page!'/>
                        <h4 style={{ marginTop: '30px', marginLeft: '30px' }}>
                            <strong>Emergency Contacts</strong>
                        </h4>
                        {contactList}
                        <h4 style={{ marginTop: '30px', marginLeft: '30px' }}>
                            <strong>Notifications</strong>
                        </h4>
                        {notificationsList}
                    </div>
                    <div className="col-4" style={{ backgroundColor: '#FBFBFB', height: '100vh', boxShadow: 'rgb(136, 136, 136) 0px 2px 4px' }}>
                        <div class="card" style={{ border: 'none', backgroundColor: '#FBFBFB' }}>
                            <div class="card-body" style={{ marginTop: '20px' }}>
                                <ContactForm submit={this.createContact} />
                                <NotificationForm submit={this.createNotification} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Communicate
