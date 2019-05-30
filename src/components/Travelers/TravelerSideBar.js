import React, { Component } from 'react'
import UserForm from './User/UserForm'
import CohortForm from './Cohorts/CohortForm'

class UserInfo extends Component {

    constructor(props) {
        super(props)
    }

    submitTravelerClick = data => {
        this.props.addUser(data)
    }

    submitCohortClick = data => {
        this.props.addCohort(data)
    }

    render() {
        return (
            <div class="card" style={{ border: 'none', backgroundColor: '#FBFBFB' }}>
                <img src="https://images.unsplash.com/photo-1500839690715-11c1f02ffcd9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1953&q=80" class="card-img-top" style={{ boxShadow: 'rgb(136, 136, 136) 0px 2px 4px', border: 'none', borderRadius: '0%', marginTop: '15px' }} alt="..." />
                <div class="card-body" style={{ marginTop: '20px' }}>
                    <UserForm submit={this.submitTravelerClick} />
                    <CohortForm submit={this.submitCohortClick} />
                </div>
            </div>
        )
    }
}

export default UserInfo
