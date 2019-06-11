import React from 'react'
import User from './User'

const UserList = ({ users, cohorts, addCohortToUser, currentCohort }) => {
    let userList = users.map(user => {
        return <User user={user} cohorts={cohorts} addCohortToUser={addCohortToUser} />
    })
    return (
        <ul className="list-group d-flex flex-column">
            {userList}
        </ul>
    )
}

export default UserList
