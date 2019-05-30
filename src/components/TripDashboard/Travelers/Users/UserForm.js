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
        this.setState({email: ''})
    }

    render() {
        let { email } = this.state
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Add a user</h3>
                <div class="form-row">
                    <label htmlFor="email">Email</label>
                    <input value={email} onChange={this.handleChange} type="email" class="form-control" name="email" placeholder="Email" />
                </div>
                <button type="submit" class="btn btn-lg btn-square dark pull-right"> Add User </button>
            </form>
        )
    }
}

export default UserForm
