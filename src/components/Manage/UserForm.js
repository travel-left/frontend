import React, { Component } from 'react'

const UserForm = () => {
    return (
        <div className="userForm">
            <form>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <input type="email" class="form-control" id="inputEmail4" placeholder="Email"></input>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary">Add User</button>
            </form>
        </div>
    )
}

export default UserForm