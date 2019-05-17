import React from 'react'
import User from './User';

const UserList = ({users, cohorts, addCohortToUser, currentCohort}) => {
    let userList = users.map(user => {
        return <User user={user} cohorts={cohorts} addCohortToUser={addCohortToUser}/>
    })
    return (
        <div className="userList">
            <div className="row" style={{justifyContent: 'space-around'}}>
                <div className="col-1"></div>
                <div className="col-2"><h5>Name</h5></div>
                <div className="col-3"><h5>Email</h5></div>
                <div className="col-2"><h5>Cohort</h5></div>
                <div className="col-2"><h5>Status</h5></div>
            </div>
            <hr/>
            <ul class="list-group" style={{display: 'flex', flexDirection: 'column'}}>
                {userList}
            </ul>
        </div>
    )
}

export default UserList