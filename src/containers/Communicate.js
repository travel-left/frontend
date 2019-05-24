import React, { Component } from 'react'
import { connect } from 'react-redux'
import NotificationForm from '../components/Communicate/NotificationForm'
import NotificationList from '../components/Communicate/NotificationList'
import { apiCall } from '../services/api'
import ContactList from '../components/Communicate/ContactList'
import ContactForm from '../components/Communicate/ContactForm'
import Alert from "../components/Other/Alert";
import DashboardHeader from '../components/Other/DashboardHeader';

class Communicate extends Component {
    state = {
        contacts: [],
        showContactList: false,
        showContactForm: false,
        notifications: [],
        showNotificationsList: false,
        showNotificationsForm: false
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
                    contacts: [...prevState.contacts, contact],
                    showContactForm: false
                }
            })
        })
    }

    onNewContactClick = () => {
        this.setState({
            showContactForm: true
        })
    }

    render() {
        let { showNotificationsList, notifications, showContactForm, showContactList, contacts } = this.state
        let { currentTrip } = this.props
        let contactForm,
            contactList = null
        let notificationsList = showNotificationsList ? <NotificationList notifications={notifications} /> : null

        if (showContactForm) {
            contactForm = <ContactForm submit={this.createContact} />
        }

        if (showContactList) {
            contactList = <ContactList contacts={contacts} />
        }

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
                                <button onClick={this.onNewContactClick} class="btn btn-lg btn-square light" style={{ marginTop: '50px', fontSize: '.9em' }}>
                                    New Contact
                                </button>
                                {contactForm}
                                <NotificationForm submit={this.createNotification} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentTrip: state.currentTrip
    }
}

export default connect(
    mapStateToProps,
    null
)(Communicate)
