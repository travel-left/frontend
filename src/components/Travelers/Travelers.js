import React, { Component } from 'react'
import UserList from './User/UserList'
import { apiCall } from '../../services/api'
// import CohortList from "./Cohorts/CohortList";
import Alert from '../Other/Alert'
import TravelerSideBar from './TravelerSideBar'
import DashboardHeader from '../Other/DashboardHeader';

class Manage extends Component {
    state = {
        users: [],
        cohorts: []
    }

    constructor(props) {
        super(props)
        this.getAndSetUsers()
        this.getAndSetCohorts()
    }

    getAndSetUsers = () => {
        apiCall('get', `/api/users/trip/${this.props.currentTrip._id}`).then(data => {
            return this.setState({ users: data.users })
        })
    }

    getAndSetCohorts = () => {
        apiCall('get', `/api/trip/${this.props.currentTrip._id}/cohorts`).then(data => {
            return this.setState({ cohorts: data.cohorts })
        })
    }

    addUser = email => {
        let newUser = {
            email: email,
            password: 'password',
            accessType: 'user',
            currentTrip: this.props.currentTrip._id
        }

        apiCall('post', '/api/auth/signup', newUser).then(() => {
            return this.getAndSetUsers()
        })
    }

    addCohort = title => {
        let { currentTrip } = this.props
        const newCohort = {
            title: title
        }
        apiCall('post', `/api/trip/${currentTrip._id}/cohort`, newCohort).then(() => {
            return this.getAndSetCohorts()
        })
    }

    addCohortToUser = user => {
        let updatedUser = {
            currentCohort: user.cohort_id
        }
        apiCall('put', `/api/users/${user.id}`, updatedUser).then(() => {
            return this.getAndSetUsers()
        })
    }

    render() {
        let { currentTrip } = this.props
        let { cohorts, users, showNewCohortForm, showNewUserForm, showNewCohortButton, showNewUserButton } = this.state

        return (
            <div>
                <div className="row">
                    <div className="col-12">
                        <Alert />
                    </div>
                </div>
                <div className="row">
                    <div className="col-8">
                        <DashboardHeader title='People on this Trip' description='Add travelers here who are coming on this trip. Add them to a cohort to asign them group specific docs and itinerary' />
                        <div className="">
                            <div className="card trip-list-header" style={{ height: '50px', justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', boxShadow: 'rgb(136, 136, 136) 0px 2px 4px', marginBottom: '20px' }}>
                                <div className="col-1" />
                                <div className="col-3" style={{ borderBottom: '2px solid #0F61D8' }}>
                                    Name
                                </div>
                                <div className="col-3">Email</div>
                                <div className="col-3">Cohort</div>
                                <div className="col-2">Status</div>
                            </div>
                            <UserList users={users} cohorts={cohorts} addCohortToUser={this.addCohortToUser} />
                        </div>
                    </div>
                    <div className="col-4" style={{ backgroundColor: '#FBFBFB', height: '100vh', boxShadow: 'rgb(136, 136, 136) 0px 2px 4px' }}>
                        <TravelerSideBar addUser={this.addUser} addCohort={this.addCohort} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Manage
