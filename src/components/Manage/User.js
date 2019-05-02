import React, { Component } from 'react'

const User = () => {
    return (
        <li className="list-group-item" style={{minHeight: '80px', alignItems:'center'}}>
            <span>user@user.com</span>
            <div className="pull-right">
                <select className='custom-select custom-select-lg' name="cohort" id="" style={{display: 'inline'}}>
                    <option disabled selected value="add">add to a cohort</option>
                    <option value="cohort 1">cohort 1</option>
                </select>
                <i class="fa fa-trash fa-2x pull-right" aria-hidden="true"></i>
            </div>
        </li>
    )
}

export default User