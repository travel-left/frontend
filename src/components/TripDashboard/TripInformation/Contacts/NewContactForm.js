import React, { Component } from 'react'
import FileUploader from '../../../Forms/FileUploader'

class NewContactForm extends Component {
    state = {
        name: this.props.name,
        photo: this.props.photo,
        email: this.props.email,
        phone: this.props.phone
    }

    handleUpload = url => {
        this.setState({
            photo: url
        })
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        this.props.submit(this.state)
    }

    render() {
        let { name, email, photo, phone } = this.state

        return (
            <>
                <button className="btn btn-primary mb-4" data-toggle="modal" data-target="#newContact">
                    add new
                </button>
                <div class="modal fade" id="newContact" tabindex="-1" role="dialog" aria-labelledby="addnewContactModal" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="addnewContactModal">
                                    New Contact
                                </h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="form-row">
                                        <div class="form-group col-10">
                                            <label htmlFor="name">Full Name</label>
                                            <input value={name} onChange={this.handleChange} type="text" class="form-control" name="name" placeholder="Jordan Boudreau" />
                                            <label htmlFor="photo">Photo link</label>
                                            <div className="input-group">
                                                <input name="photo" className="form-control" type="text" value={photo} onChange={this.handleInputChange} placeholder="https://www.link-to-your=image.com" />
                                                <FileUploader id="addEvent" isAuth={true} onUpload={this.handleUpload} accept="image/*" />
                                            </div>
                                            <label htmlFor="email">Email</label>
                                            <input value={email} onChange={this.handleChange} type="text" class="form-control" name="email" placeholder="jordan@travel-left.com" />
                                            <label htmlFor="title">Phone</label>
                                            <input value={phone} onChange={this.handleChange} type="text" class="form-control" name="phone" placeholder="867-5309" />
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

export default NewContactForm
