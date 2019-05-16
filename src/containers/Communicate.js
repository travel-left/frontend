import React, { Component } from 'react'
import { connect } from 'react-redux'
import NotificationForm from '../components/Communicate/NotificationForm';
import NotificationList from '../components/Communicate/NotificationList';
import { apiCall } from '../services/api';
import Contact from '../components/Communicate/Contact';

class Communicate extends Component {

    state = {
        notifications: [],
        showNotificationsList: false
    }

    constructor(props) {
        super(props)

        apiCall('get', `/api/notification/${this.props.currentTrip.id}`)
        .then(data => {
            return this.setState({
                notifications: data.notifications,
                showNotificationsList: true
            })
        })
    }

    createNotification = text => {
        let {currentTrip} = this.props
        apiCall('post', `/api/notification/${this.props.currentTrip.id}`, {text: text})
        .then(() => {
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

    render() {
        let {showNotificationsList, notifications} = this.state
        let {currentTrip} = this.props
        let notificationsList = showNotificationsList 
        ?
            <NotificationList notifications={notifications} />
        :   
            null

        return (
            <div className='container'>
                <div className="row">
                    <div className="col-9">
                        <h4 style={{marginTop: '30px', marginLeft: '30px'}}><strong>Emergency Contacts</strong></h4>
                        <div className="row" style={{justifyContent: 'center'}}>
                            <Contact />
                            <Contact />
                            <Contact />
                            <Contact />
                            <Contact />
                            <Contact />
                            <Contact />
                            <Contact />
                            <Contact />
                        </div>
                    </div>
                    <div className="col-3">
                    </div>
                </div>
                <div className="row">
                    <div className="col-9">
                        <h4 style={{marginTop: '30px', marginLeft: '30px'}}><strong>Notifications</strong></h4>
                        <div className="col">
                            {notificationsList}
                        </div>
                        <div className="col">
                            <NotificationForm submit={this.createNotification}/>
                        </div>
                    </div>
                    <div className="col-3">
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

export default connect(mapStateToProps, null)(Communicate)