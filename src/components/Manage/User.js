import React, { Component } from 'react'

const User = ({user}) => {
    return (
        <li className="list-group-item" style={{minHeight: '80px', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <span>{user.email}</span>
        </li>
    )
}

export default User