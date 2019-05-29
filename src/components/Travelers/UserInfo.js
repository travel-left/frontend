import React, { Component } from 'react'
import UserForm from '../Manage/UserForm'
import CohortForm from '../Manage/CohortForm'

class UserInfo extends Component {
    state = {
        showNewUserForm: false,
        showNewCohortForm: false
    }
    constructor(props) {
        super(props)
    }

    addTravelerClick = () => {
        this.setState({showNewUserForm: true})
    }

    addCohortClick = () => {
        this.setState({showNewCohortForm: true})
    }

    submitTravelerClick = data => {
        this.props.addUser(data)
        this.setState({showNewUserForm: false})
    }

    submitCohortClick = data => {
        this.props.addCohort(data)
        this.setState({showNewCohortForm: false})
    }

    render() {
        let { name, date, image, showTravelerButton, showCohortButton } = this.props
        let { showNewUserForm, showNewCohortForm } = this.state
        let userButton, cohortButton, userForm, cohortForm = null

        if (showTravelerButton) {
            userButton = (
                <div>
                    <span style={{ fontSize: '1.3em', color: '#3A3A3A', fontWeight: '600', display: 'block' }}>Add Travelers</span>
                    <button className="btn btn-lg btn-square light">IMPORT BULK</button>
                    <button onClick={this.addTravelerClick} className="btn btn-lg btn-square dark pull-right">
                        ADD TRAVELER
                    </button>
                </div>
            )
        }

        if (showCohortButton) {
            cohortButton = (
                <div>
                    <span style={{ fontSize: '1.3em', color: '#3A3A3A', fontWeight: '600', display: 'block' }}>Add Cohorts</span>
                    <button onClick={this.addCohortClick} className="btn btn-lg btn-square light">ADD COHORT</button>
                </div>
            )
        }

        if (showNewUserForm) {
            userForm = <UserForm submit={this.submitTravelerClick} />
        }

        if (showNewCohortForm) {
            cohortForm = <CohortForm submit={this.submitCohortClick} />
        }

        return (
            <div class="card" style={{ border: 'none', backgroundColor: '#FBFBFB' }}>
                <img src="https://images.unsplash.com/photo-1500839690715-11c1f02ffcd9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1953&q=80" class="card-img-top" style={{ boxShadow: 'rgb(136, 136, 136) 0px 2px 4px', border: 'none', borderRadius: '0%', marginTop: '15px' }} alt="..." />
                <div class="card-body" style={{ marginTop: '20px' }}>
                    {userButton}
                    {userForm}
                    {cohortButton}
                    {cohortForm}
                </div>
            </div>
        )
    }
}

export default UserInfo
