import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserList from '../components/Manage/UserList'
import UserForm from '../components/Manage/UserForm'
import { apiCall } from '../services/api'
import CohortForm from '../components/Manage/CohortForm'
import CohortList from "../components/Manage/CohortList"
import Alert from "../components/Other/Alert";
import UserInfo from '../components/Manage/UserInfo';

class Manage extends Component {
    state = {
        users: [],
        cohorts: [],
        showNewUserButton: true,
        showNewCohortButton: true,
        showNewUserForm: false,
        showNewCohortForm: false
    }

    constructor(props){
        super(props)
        this.getAndSetUsers()
        this.getAndSetCohorts()
    }

    getAndSetUsers = () => {
        apiCall('get', `/api/users/trip/${this.props.currentTrip._id}`)
        .then(data => {
            return this.setState({users: data.users})
        })
    }

    getAndSetCohorts = () => {
        apiCall('get', `/api/trip/${this.props.currentTrip._id}/cohorts`)
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

        this.setState({
            showNewUserButton: true,
            showNewUserForm: false
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

        this.setState({
            showNewCohortButton: true,
            showNewCohortForm: false
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

    onNewUserClick = () => {
        this.setState({
            showNewUserForm: true,
            showNewUserButton: false
        })
    }

    onNewCohortClick = () => {
        this.setState({
            showNewCohortForm: true,
            showNewCohortButton: false
        })
    }

    render() {
        let {currentTrip} = this.props
        let {cohorts, users, showNewCohortForm, showNewUserForm, showNewCohortButton, showNewUserButton} = this.state
        let userForm, cohortForm, userButton, cohortButton = null

        if(showNewUserForm) {
            userForm = <UserForm submit={this.addUser} />
        }

        if(showNewCohortForm) {
            cohortForm = <CohortForm submit={this.addCohort} />
        }

        if(showNewUserButton) {
            userButton = <button onClick={this.onNewUserClick} class="btn btn-lg" style={{marginTop: '50px', fontSize: '.9em'}}>New User</button> 
        }

        if(showNewCohortButton) {
            cohortButton = <button onClick={this.onNewCohortClick} class="btn btn-lg" style={{marginTop: '50px', fontSize: '.9em'}}>New Cohort</button> 
        }

        return (
            <div>
                <div className="row">
                    <div className="col-12">
                        <Alert />
                    </div>
                </div>
                <div className="row">
                    <div className="col-8">
                        <h2>People on this Trip</h2>
                        <p>Add travelers here who are coming on this trip. Add them to a cohort to asign them group specific docs and itinerary</p>
                        <div className="">
                            <div className="card trip-list-header" style={{height: '50px', justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', boxShadow: 'rgb(136, 136, 136) 0px 2px 4px', marginBottom: '20px'}}>
                                <div className="col-1" ></div>
                                <div className="col-3" style={{borderBottom: '2px solid #0F61D8'}}>Name</div>
                                <div className="col-3" >Email</div>
                                <div className="col-3" >Cohort</div>
                                <div className="col-2" >Status</div>
                            </div>
                            <UserList users={users} cohorts={cohorts} addCohortToUser={this.addCohortToUser}/>
                        </div>
                    </div>
                    <div className="col-4" style={{backgroundColor: '#FBFBFB', height: '100vh', boxShadow: 'rgb(136, 136, 136) 0px 2px 4px'}}>
                        <UserInfo />
                    </div>
                </div>
            </div>
            // <div className="container manage">
            //     <div className="users" style={{marginTop: '30px'}}>
            //         <h2>Travelers</h2>
            //         <div className="row">   
            //             <div className="col-8">
            //                 <UserList users={users} cohorts={cohorts} addCohortToUser={this.addCohortToUser}/>
            //             </div>
            //             <div className="col-1"></div>
            //             <div className="col-3">
            //                 {userButton}
            //                 {userForm}
            //             </div>
            //         </div>
            //     </div>
            //     <div className="cohorts" style={{marginTop: '30px'}}>
            //         <h2>Cohorts</h2>
            //         <div className="row">   
            //             <div className="col-8">
            //                 <CohortList cohorts={cohorts}/>
            //             </div>
            //             <div className="col-1"></div>
            //             <div className="col-3">
            //                 {cohortButton}
            //                 {cohortForm}
            //             </div>
            //         </div>
            //     </div>
            // </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentTrip: state.currentTrip
    }
}

export default connect(mapStateToProps, null)(Manage)