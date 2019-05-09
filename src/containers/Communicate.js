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

        apiCall('get', `/api/notification/${this.props.user._id}`)
        .then(data => {
            return this.setState({
                notifications: data.notifications,
                showNotificationsList: true
            })
        })
    }

    createNotification = text => {
        apiCall('post', `/api/notification/${this.props.user._id}`, {text: text})
        .then(data => {
            return this.setState(prevState => {
                return {
                    notifications: [
                        ...prevState.notifications,
                        {
                            user_id: this.props.user._id,
                            text: text
                        }
                    ]
                }
            })
        })
    }

    render() {
        let notificationsList = null

        if(this.state.showNotificationsList === true) {
            notificationsList = <NotificationList notifications={this.state.notifications} />
        }
        return (
            <div className="container">
                <h1>Communicate with your {this.props.currentTrip.name} travelers! </h1>
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