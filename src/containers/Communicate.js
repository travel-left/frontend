import React, { Component } from 'react'
import { connect } from 'react-redux'
import NotificationForm from '../components/Communicate/NotificationForm';
import NotificationList from '../components/Communicate/NotificationList';
import { apiCall } from '../services/api';

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
            <div className="container">
                <h1>Communicate with your {currentTrip.name} travelers! </h1>
                <div className="row">
                    <div className="col">
                        {notificationsList}
                    </div>
                    <div className="col">
                        <NotificationForm submit={this.createNotification}/>
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