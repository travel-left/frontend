import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserList from '../components/Manage/UserList'
import UserForm from '../components/Manage/UserForm'
import { apiCall } from '../services/api'
import CohortForm from '../components/Manage/CohortForm'
import CohortList from "../components/Manage/CohortList"

class Manage extends Component {
    state = {
        users: [],
        cohorts: []
    }

    constructor(props){
        super(props)
        this.getAndSetUsers()
        this.getAndSetCohorts()
    }

    getAndSetUsers = () => {
        apiCall('get', `/api/users/trip/${this.props.currentTrip.id}`)
        .then(data => {
            return this.setState({users: data.users})
        })
    }

    getAndSetCohorts = () => {
        apiCall('get', `/api/trip/${this.props.currentTrip.id}/cohorts`)
        .then(data => {
            return this.setState({cohorts: data.cohorts})
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
            return this.getAndSetUsers()
        })
    }

    addCohort = title => {
        let {currentTrip} = this.props
        const newCohort = {
            title: title
        }
        apiCall('post', `/api/trip/${currentTrip.id}/cohort`, newCohort)
        .then(() => {
            return this.getAndSetCohorts()
        })
    }

    addCohortToUser = user => {
        let updatedUser = {
            currentCohort: user.cohort_id
        }
        apiCall('put', `/api/users/${user.id}`, updatedUser)
        .then(() => {
            return this.getAndSetUsers()
        })
    }

    render() {
        let {currentTrip} = this.props
        let {cohorts, users} = this.state

        return (
            <div className="container manage">
                <h1>Manage your {currentTrip.name} Trip!</h1>
                <div className="row">   
                    <div className="col-1"></div>
                    <div className="col-6">
                        <UserList users={users} cohorts={cohorts} addCohortToUser={this.addCohortToUser}/>
                    </div>
                    <div className="col-1"></div>
                    <div className="col-4">
                        <UserForm submit={this.addUser} />
                        <CohortForm submit={this.addCohort} />
                        <CohortList cohorts={cohorts}/>
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