import React, { Component } from 'react'

class UserForm extends Component {

    state = {
        email: ''
    }

    constructor(props) {
        super(props)
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.submit(this.state.email)
    }

    render() {
        return (
            <div className="userForm">
                <form onSubmit={this.handleSubmit}>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <input value={this.state.email} onChange={this.handleChange} type="email" class="form-control" name='email' placeholder="Email"/>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Add User</button>
                </form>
            </div>
        )
    }
}

export default UserForm