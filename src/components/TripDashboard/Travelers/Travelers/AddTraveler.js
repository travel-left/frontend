import React, { Component } from 'react'
import FileUploader from '../../../Other/FileUploader'

class AddTraveler extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        image: ''
    }

    handleUpload = url => {
        this.setState({
            image: url
        })
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
        let { firstName, lastName, email, image } = this.state
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
                                        <label htmlFor="image">Image link</label>
                                        <div className="input-group">
                                            <input name="image" className="form-control" type="text" value={image} onChange={this.handleChange} placeholder="https://www.link-to-your=image.com" />
                                            <FileUploader id="addEvent" isAuth={true} onUpload={this.handleUpload} accept="image/*" />
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

export default AddTraveler
