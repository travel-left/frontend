import React, { Component } from 'react'
import UserList from '../components/Manage/UserList';
import UserForm from '../components/Manage/UserForm';

const Manage = () => {
    return (
        <div className="container manage">
            <h1>I am the manage container</h1>
            <div className="row">   
                <div className="col-1"></div>
                <div className="col-7">
                    <UserList/>
                </div>
                <div className="col-3">
                    <UserForm/>
                </div>
                <div className="col-1"></div>
            </div>
        </div>
    )
}

export default Manage