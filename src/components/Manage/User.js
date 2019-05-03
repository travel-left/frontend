import React, { Component } from 'react'

class User extends Component {

    constructor(props) {
        super(props)
    }

    onSubmit = e => {
        e.preventDefault()
        this.props.toggleAddCohortToUserForm(this.props.user)
    }

    render() {
        let {user} = this.props
        return (
            <li className="list-group-item" style={{minHeight: '', display: '', flexDirection: '', alignItems: ''}}>
                <div className="row">
                    <div className="col">{user.email}</div>
                    <div className="col">{user.currentCohort ? user.currentCohort.title : <button className="btn btn-primary" onClick={this.onSubmit}>Select Cohort</button>}</div>
                </div>
            </li>
        )
    }
}

export default User