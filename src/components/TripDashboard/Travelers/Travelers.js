import React, { Component } from 'react'
import UserList from './Users/UserList'
import { apiCall } from '../../../util/api'
import Alert from '../../Other/Alert'
import DashboardHeader from '../../Other/DashboardHeader'
import SideBar from '../SideBar'
import CohortForm from './Cohorts/CohortForm'
import UserForm from './Users/UserForm'

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
        let { cohorts, users } = this.state

        return (
            <div>
                <div className="row">
                    <div className="col-12">
                        <Alert text='Organize your travelers and cohorts here.'/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <DashboardHeader title='People on this Trip' description='Add travelers here who are coming on this trip. Add them to a cohort to asign them group specific docs and itinerary' />
                        <div className="">
                            <div className="card trip-list-header d-flex flex-row justify-content-between shadow mb-3 py-3 px-md-2 px-1">
                                <div className="col-3 border-bottom border-primary d-none d-md-flex">
                                    Name
                                </div>
                                <div className="col-4 col-md-3">Email</div>
                                <div className="col-4 col-md-3">Cohort</div>
                                <div className="col-4 col-md-2">Status</div>
                            </div>
                            <UserList users={users} cohorts={cohorts} addCohortToUser={this.addCohortToUser} />
                        </div>
                    </div>
                    <SideBar ctr={[<UserForm submit={this.submitTravelerClick} />,<CohortForm submit={this.submitCohortClick} />]}/>
                </div>
            </div>
        )
    }
}

export default Manage
