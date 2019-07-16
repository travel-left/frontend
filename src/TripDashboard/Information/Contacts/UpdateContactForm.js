import React, { Component } from 'react'
import FileUploader from '../../../util/forms/FileUploader'

class UpdateContactForm extends Component {
    state = {
        name: this.props.firstName + this.props.lastName,
        image: this.props.photo,
        email: this.props.email,
        phone: this.props.phone,
        id: this.props.id
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

    handleSubmit = event => {
        event.preventDefault()
        this.props.submit(this.state)
    }

    render() {
        let { name, email, image, phone, id } = this.state

        return (
            <>
                <button className="btn btn btn-secondary text-light" data-toggle="modal" data-target={'#editcontact' + id}>
                    edit
                </button>
                <div className="modal fade" id={'editcontact' + id} tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit contact</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-row">
                                        <div className="form-group col-10">
                                            <label htmlFor="name">Name</label>
                                            <input value={name} onChange={this.handleChange} type="text" className="form-control" name="name" placeholder="name" />
                                            <div className="input-group">
                                                <input name="image" className="form-control" type="text" value={image} onChange={this.handleInputChange} placeholder="https://www.link-to-your=image.com" />
                                                <FileUploader id="addEvent" isAuth={true} onUpload={this.handleUpload} accept="image/*" />
                                            </div>
                                            <label htmlFor="email">Email</label>
                                            <input value={email} onChange={this.handleChange} type="text" className="form-control" name="email" placeholder="email" />
                                            <label htmlFor="phone">Phone</label>
                                            <input value={phone} onChange={this.handleChange} type="text" className="form-control" name="phone" placeholder="phone" />
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

export default UpdateContactForm
