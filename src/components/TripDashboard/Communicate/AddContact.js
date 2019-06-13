import React, { Component } from 'react'

class AddContact extends Component {
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
            <>
                <button class="btn btn-lg btn-primary" data-toggle="modal" data-target="#newContact">
                    ADD CONTACT
                </button>
                <div class="modal fade" id="newContact" tabindex="-1" role="dialog" aria-labelledby="addnewContactModal" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="addnewContactModal">
                                    Add a contact
                                </h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
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

export default AddContact
