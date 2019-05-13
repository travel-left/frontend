import React from 'react'
import User from './User';

const UserList = ({users, cohorts, addCohortToUser, currentCohort}) => {
    let userList = users.map(user => {
        return <User user={user} cohorts={cohorts} addCohortToUser={addCohortToUser}/>
    })
    return (
        <div className="userList">
            <h2>Travelers</h2>
            <div className="row">
                <div className="col">Email</div>
                <div className="col">Cohort</div>
            </div>
            <ul class="list-group" style={{display: 'flex', flexDirection: 'column'}}>
                {userList}
            </ul>
        </div>
    )
}

export default UserList