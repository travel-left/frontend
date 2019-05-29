import React, { Component } from 'react'
import { connect } from 'react-redux'
import NotificationForm from '../components/Communicate/NotificationForm'
import NotificationList from '../components/Communicate/NotificationList'
import { apiCall } from '../services/api'
import ContactList from '../components/Communicate/ContactList'
import ContactForm from '../components/Communicate/ContactForm'

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

        apiCall('get', `/api/trips/${this.props.currentTrip.id}/notifications`).then(data => {
            return this.setState({
                notifications: data.notifications,
                showNotificationsList: true
            })
        })

        apiCall('get', `/api/trips/${this.props.currentTrip.id}/contacts`).then(data => {
            return this.setState({
                contacts: data.contacts,
                showContactList: true
            })
        })
    }

    createNotification = text => {
        let { currentTrip } = this.props
        apiCall('post', `/api/trips/${this.props.currentTrip.id}/notifications`, { text: text }).then(() => {
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
        apiCall('post', `/api/contact`, { trip_id: this.props.currentTrip.id, ...contact }).then(() => {
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
            <div className="container">
                <div className="row">
                    <div className="col-9">
                        <h4 style={{ marginTop: '30px', marginLeft: '30px' }}>
                            <strong>Emergency Contacts</strong>
                        </h4>
                        {contactList}
                    </div>
                    <div className="col-3">
                        <button onClick={this.onNewContactClick} class="btn btn-lg" style={{ marginTop: '50px', fontSize: '.9em' }}>
                            New Contact
                        </button>
                        {contactForm}
                    </div>
                </div>
                <div className="row">
                    <div className="col-9">
                        <h4 style={{ marginTop: '30px', marginLeft: '30px' }}>
                            <strong>Notifications</strong>
                        </h4>
                        <div className="col">{notificationsList}</div>
                        <div className="col">
                            <NotificationForm submit={this.createNotification} />
                        </div>
                    </div>
                    <div className="col-3" />
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
