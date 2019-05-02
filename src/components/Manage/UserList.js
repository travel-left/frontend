import React, { Component } from 'react'
import User from './User';

const UserList = ({users}) => {
    let userList = users.map(user => {
        return <User user={user} />
    })
    return (
        <div className="userList">
            <h2>Travelers</h2>
            <ul class="list-group" style={{display: 'flex', flexDirection: 'column'}}>
                {userList}
            </ul>
        </div>
    )
}

export default UserList