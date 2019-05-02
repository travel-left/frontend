import React, { Component } from 'react'
import User from './User';

const UserList = () => {
    return (
        <div className="userList">
            <h2>Travelers</h2>
            <ul class="list-group">
                <User />    
                <User />    
                <User />    
                <User />    
            </ul>
        </div>
    )
}

export default UserList