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
    }

    render() {
        let { firstName, lastName, phone, email } = this.state
        return (
            <form onSubmit={this.handleSubmit}>
                <div class="form-row">
                    <div class="form-group col-10">
                        <input value={firstName} onChange={this.handleChange} type="text" class="form-control" name="firstName" placeholder="Johnny" />
                        <input value={lastName} onChange={this.handleChange} type="text" class="form-control" name="lastName" placeholder="Appleseed" />
                        <input value={phone} onChange={this.handleChange} type="text" class="form-control" name="phone" placeholder="559-867-5309" />
                        <input value={email} onChange={this.handleChange} type="text" class="form-control" name="email" placeholder="tim@apple.com" />
                    </div>
                </div>
                <button type="submit" class="btn btn-lg btn-square dark pull-right" style={{ fontSize: '.9em' }}>
                    Create Contact
                </button>
            </form>
        )
    }
}

export default ContactForm
