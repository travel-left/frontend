import React, { Component } from 'react'

class AddTraveler extends Component {
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
            <>
                <button class="btn btn-lg btn-primary" data-toggle="modal" data-target="#newTraveler">
                    ADD TRAVELER
                </button>
                <div class="modal fade" id="newTraveler" tabindex="-1" role="dialog" aria-labelledby="addnewTravelerModal" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="addnewTravelerModal">
                                    Add Traveler
                                </h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
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
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button onClick={this.handleSubmit} type="button" class="btn btn-primary" data-dismiss="modal">
                                    SUBMIT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default AddTraveler
