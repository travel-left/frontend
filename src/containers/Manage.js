import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserList from '../components/Manage/UserList';
import UserForm from '../components/Manage/UserForm';
import { apiCall } from '../services/api';

class Manage extends Component {
    state = {
        users: []
    }

    constructor(props){
        super(props)
        apiCall('get', `/api/users/trip/${this.props.currentTrip.id}`)
        .then(data => {
            return this.setState({users: data.users})
        })
    }

    render() {
        return (
            <div className="container manage">
                <h1>Manage your Trip!</h1>
                <div className="row">   
                    <div className="col-1"></div>
                    <div className="col-7">
                        <UserList users={this.state.users}/>
                    </div>
                    <div className="col-3">
                        <UserForm/>
                    </div>
                    <div className="col-1"></div>
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

export default connect(mapStateToProps, null)(Manage)