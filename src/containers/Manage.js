import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserList from '../components/Manage/UserList';
import UserForm from '../components/Manage/UserForm';
import { apiCall } from '../services/api';
import CohortForm from '../components/Manage/CohortForm';

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

    addUser = email => {

        let newUser = {
            email: email,
            password: 'password',
            accessType: 'user',
            currentTrip: this.props.currentTrip.id
        }

        apiCall('post', '/api/auth/signup', newUser)
        .then(() => {
            return this.setState(prevState => {
                return {
                    users: [
                        ...prevState.users,
                        newUser
                    ]
                }
            })
        })
    }

    addCohort = title => {
        const newCohort = {
            title: title
        }
        apiCall('post', `/api/trip/${this.props.currentTrip.id}/cohort`, newCohort)
        .then(data => {
            // return this.setState(prevState => {
            //     return {
            //         users: [
            //             ...prevState.users,
            //             newUser
            //         ]
            //     }
            // })
            return console.log(data)
        })
    }

    render() {
        return (
            <div className="container manage">
                <h1>Manage your {this.props.currentTrip.name} Trip!</h1>
                <div className="row">   
                    <div className="col-1"></div>
                    <div className="col-6">
                        <UserList users={this.state.users}/>
                    </div>
                    <div className="col-1"></div>
                    <div className="col-4">
                        <UserForm submit={this.addUser} />
                        <CohortForm submit={this.addCohort} />
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

export default connect(mapStateToProps, null)(Manage)