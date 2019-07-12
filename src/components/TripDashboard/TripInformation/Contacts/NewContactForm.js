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
                <div className="modal fade" id="newContact" tabIndex="-1" role="dialog" aria-labelledby="addnewContactModal" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="addnewContactModal">
                                    New Contact
                                </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-row">
                                        <div className="form-group col-10">
                                            <label htmlFor="name">Full Name</label>
                                            <input value={name} onChange={this.handleChange} type="text" className="form-control" name="name" placeholder="Jordan Boudreau" />
                                            <label htmlFor="photo">Photo link</label>
                                            <div className="input-group">
                                                <input name="photo" className="form-control" type="text" value={photo} onChange={this.handleInputChange} placeholder="https://www.link-to-your=image.com" />
                                                <FileUploader id="addEvent" isAuth={true} onUpload={this.handleUpload} accept="image/*" />
                                            </div>
                                            <label htmlFor="email">Email</label>
                                            <input value={email} onChange={this.handleChange} type="text" className="form-control" name="email" placeholder="jordan@travel-left.com" />
                                            <label htmlFor="title">Phone</label>
                                            <input value={phone} onChange={this.handleChange} type="text" className="form-control" name="phone" placeholder="867-5309" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button onClick={this.handleSubmit} type="button" className="btn btn-primary" data-dismiss="modal">
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
