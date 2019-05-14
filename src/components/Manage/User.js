import React, { Component } from 'react'
import AddCohortToUserForm from './AddCohortToUserForm';

class User extends Component {

    constructor(props) {
        super(props)
    }

    onSubmit = e => {
        e.preventDefault()
        this.props.toggleAddCohortToUserForm(this.props.user)
    }

    render() {
        let {user, cohorts, addCohortToUser} = this.props
        let cohortList = null

        if(cohorts.length > 0) {
            cohortList = <AddCohortToUserForm userId={user._id} currentCohort={user.currentCohort} cohorts={cohorts} submit={addCohortToUser}/> 
        } else {
            cohortList = <span>Add a cohort</span>
        }
        return (
            <li className="list-group-item" style={{minHeight: '', display: '', flexDirection: '', alignItems: ''}}>
                <div className="row">
                    <div className="col">{user.email}</div>
                    {cohortList}
                </div>
            </li>
        )
    }
}

export default User