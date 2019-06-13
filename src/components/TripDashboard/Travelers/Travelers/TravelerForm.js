import React, { Component } from 'react'

class TravelerForm extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        img: ''
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
            email: '',
            img: ''
        })
    }

    render() {
        let { firstName, lastName, email, img } = this.state
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Add Traveler</h3>
                <div class="form-row">
                    <label htmlFor="first">First Name</label>
                    <input value={firstName} onChange={this.handleChange} type="text" class="form-control" name="firstName" placeholder="Steve" />
                    <label htmlFor="lastName">Last Name</label>
                    <input value={lastName} onChange={this.handleChange} type="text" class="form-control" name="lastName" placeholder="Jobs" />
                    <label htmlFor="email">Email</label>
                    <input value={email} onChange={this.handleChange} type="email" class="form-control" name="email" placeholder="steve@apple.com" />
                    <label htmlFor="img">Image Url</label>
                    <input value={img} onChange={this.handleChange} type="text" class="form-control" name="img" placeholder="www.img.com" />
                </div>
                <button type="submit" class="btn btn-lg btn-primary">
                    {' '}
                    SUBMIT{' '}
                </button>
            </form>
        )
    }
}

export default TravelerForm
