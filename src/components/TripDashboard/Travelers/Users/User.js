import React, { Component } from 'react'
import AddCohortToUserForm from './AddCohortToUserForm'

class User extends Component {
    constructor(props) {
        super(props)
    }

    onSubmit = e => {
        e.preventDefault()
        this.props.toggleAddCohortToUserForm(this.props.user)
    }

    render() {
        let { user, cohorts, addCohortToUser } = this.props
        let cohortList = null

        if (cohorts.length > 0) {
            cohortList = <AddCohortToUserForm userId={user._id} currentCohort={user.currentCohort} cohorts={cohorts} submit={addCohortToUser} />
        } else {
            cohortList = <span>Add a cohort</span>
        }
        return (
            <div className="card py-3 shadow my-2" >
                <div className="row no-gutters justify-content-between align-items-center px-3 px-md-0">
                    <div className="col-1 d-none d-md-block">
                        <img src="https://pbs.twimg.com/profile_images/1114204041431605249/p_TkPVR-_400x400.png" className="card-img ml-2 " alt="..." style={{ maxHeight: '60px', maxWidth: '60px', borderRadius: '50%' }} />
                    </div>
                    <div className="d-none d-md-flex col-2">
                        {user.firstName} {user.lastName} Lorem, ipsum.
                    </div>
                    <div className="col-4 col-md-3">
                        {user.email}
                    </div>
                    <div className="col-4 col-md-3">
                        {cohortList}
                    </div>
                    <div className="col-3 col-md-2">
                        <span class="badge badge-primary badge-pill">
                            PLANNING
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

export default User
