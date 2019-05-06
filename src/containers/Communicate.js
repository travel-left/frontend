import React, { Component } from 'react'
import { connect } from 'react-redux'
import NotificationForm from '../components/Communicate/NotificationForm';
import NotificationList from '../components/Communicate/NotificationList';

class Communicate extends Component {

    state = {

    }

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="container">
                <h1>Communicate with your {this.props.currentTrip.name} travelers! </h1>
                <div className="row">
                    <div className="col">
                        <NotificationList />
                    </div>
                    <div className="col">
                        <NotificationForm />
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