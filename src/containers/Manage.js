import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserList from '../components/Manage/UserList';
import UserForm from '../components/Manage/UserForm';
import { apiCall } from '../services/api';
import CohortForm from '../components/Manage/CohortForm';
import AddCohortToUserForm from '../components/Manage/AddCohortToUserForm';

class Manage extends Component {
    state = {
        users: [],
        showAddCohortToUserForm: false,
        cohorts: [],
        selectedUser: {}
    }

    constructor(props){
        super(props)
        apiCall('get', `/api/users/trip/${this.props.currentTrip.id}`)
        .then(data => {
            return this.setState({users: data.users})
        })

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
        let {currentTrip} = this.props
        const newCohort = {
            title: title
        }
        apiCall('post', `/api/trip/${currentTrip.id}/cohort`, newCohort)
        .then(() => {
            return this.setState(prevState => {
                return {
                    ...prevState,
                    cohorts: [
                        ...prevState.cohorts,
                        {
                            trip_id: currentTrip.id,
                            title: title
                        }
                    ]
                }
            })
        })
    }

    addCohortToUser = cohort => {
        let updatedUser = {
            ...this.state.selectedUser,
            currentCohort: cohort
        }

        apiCall('put', `/api/users/${this.state.selectedUser._id}`, updatedUser)
        .then(() => {
            return this.setState(prevState => {
                return {
                    users: prevState.users.map(user => {
                        return user._id == updatedUser._id 
                        ?
                            {
                                ...updatedUser,
                                currentCohort: this.state.cohorts.filter(c => c._id === updatedUser.currentCohort)[0]
                            }
                        :
                            user
                    })
                }
            })
        })
    }

    toggleAddCohortToUserForm = user => {
        return this.setState({
            showAddCohortToUserForm: true,
            selectedUser: user
        })
    }

    render() {
        let {currentTrip} = this.props
        let {cohorts, users} = this.state
        let addCohortToUserForm = null

        if(this.state.showAddCohortToUserForm) {
            addCohortToUserForm = <AddCohortToUserForm cohorts={cohorts} submit={this.addCohortToUser} />
        }

        return (
            <div className="container manage">
                <h1>Manage your {currentTrip.name} Trip!</h1>
                <div className="row">   
                    <div className="col-1"></div>
                    <div className="col-6">
                        <UserList users={users} toggleAddCohortToUserForm = {this.toggleAddCohortToUserForm}/>
                    </div>
                    <div className="col-1"></div>
                    <div className="col-4">
                        <UserForm submit={this.addUser} />
                        <CohortForm submit={this.addCohort} />
                        {addCohortToUserForm}
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