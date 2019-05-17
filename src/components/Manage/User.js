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
            <div class="card">
                <div class="row no-gutters" style={{justifyContent: 'space-around'}}>
                    <div class="col-1">
                        <img src="..." class="card-img" alt="..."  style={{padding: '15px 5px 15px 5px'}}></img>
                    </div>
                    <div class="col-2">
                        <p class="card-text" style={{padding: '15px 5px 15px 5px'}}><small class="text-muted">First Last</small></p>
                    </div>
                    <div class="col-3" style={{flexGrow: 2}}>
                        <p class="card-text" style={{padding: '15px 5px 15px 5px'}}><small class="text-muted">{user.email}</small></p>
                    </div>
                    <div class="col-2">
                        {cohortList}
                    </div>
                    <div class="col-2">
                        <p class="card-text pull-right" style={{padding: '15px 5px 15px 5px'}}><small class="text-muted" >Pending</small></p>
                    </div>
                </div>
            </div>
        )
    }
}

export default User