import React, { Component } from 'react'

class ContactForm extends Component {
    state = {
        firstName: '',
        lastName: '',
        phone: '',
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
        this.props.submit(this.state)
        this.setState({
            firstName: '',
            lastName: '',
            phone: '',
            email: ''
        })
    }

    render() {
        let { firstName, lastName, phone, email } = this.state
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Add a contact</h3>
                <div class="form-row">
                    <div class="form-group col-10">
                        <label htmlFor="firstName">First name</label>
                        <input value={firstName} onChange={this.handleChange} type="text" class="form-control" name="firstName" placeholder="Johnny" />
                        <label htmlFor="lastName">Last name</label>
                        <input value={lastName} onChange={this.handleChange} type="text" class="form-control" name="lastName" placeholder="Appleseed" />
                        <label htmlFor="phone">Phone number</label>
                        <input value={phone} onChange={this.handleChange} type="text" class="form-control" name="phone" placeholder="559-867-5309" />
                        <label htmlFor="email">Email</label>
                        <input value={email} onChange={this.handleChange} type="text" class="form-control" name="email" placeholder="tim@apple.com" />
                    </div>
                </div>
                <button type="submit" class="btn btn-lg btn-square dark pull-right" style={{ fontSize: '.9em' }}> Create Contact </button>
            </form>
        )
    }
}

export default ContactForm
