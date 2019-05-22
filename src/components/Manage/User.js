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
            <div className="card" onClick={this.onTripClick} style={{minHeight: '80px', boxShadow: 'rgb(136, 136, 136) 0px 0px 8px', marginBottom: '10px'}}>
                <div className="row no-gutters" style={{justifyContent: 'space-around', height: '100px', flexDirection: 'row', alignItems: 'center',}}>
                    <div className="col-1">
                        <img src="https://pbs.twimg.com/profile_images/1114204041431605249/p_TkPVR-_400x400.png" className="card-img" alt="..." style={{maxHeight: '60px', maxWidth: '60px', borderRadius: '50%', marginLeft: '15px'}}></img>
                    </div>
                    <div className="col-3 hover">
                        <p className="card-text" style={{padding: '15px 5px 15px 5px', fontSize: '1em', color: '#3A3A3A', fontWeight: '600', marginLeft: '25px'}}>Jordan Boudreau</p>
                    </div>
                    <div className="col-3 hover">
                        <p className="card-text" style={{padding: '15px 0px', fontSize: '1em', color: '#3A3A3A', fontWeight: '600'}}>{user.email}</p>
                    </div>
                    <div className="col-3">
                        <p className="card-text" style={{padding: '15px 5px 15px 0px', color: '#A3A3A3'}}>{cohortList}</p>
                    </div>
                    <div className="col-2">
                        <p className="card-text" style={{padding: '15px 5px 15px 5px'}}><span class="badge badge-primary badge-pill" style={{padding: '5px 10px', backgroundColor: '#8ECFF5'}}>PLANNING</span></p>
                    </div>
                </div>
            </div>
        )
    }
}

export default User