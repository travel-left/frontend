import React, { Component } from 'react'
import FileUploader from '../../../forms/FileUploader'

class AddTraveler extends Component {
    state = {
        name: '',
        email: '',
        img: '',
        phone: '',
        personalNotes: ''
    }

    handleUpload = url => {
        this.setState({
            img: url
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
            name: '',
            email: '',
            img: '',
            phone: '',
            personalNotes: ''
        })
    }

    render() {
        let { name, email, img, phone, personalNotes } = this.state
        return (
            <>
                <button className="btn btn-lg btn-primary" data-toggle="modal" data-target="#newTraveler">
                    ADD TRAVELER
                </button>
                <div className="modal fade" id="newTraveler" tabIndex="-1" role="dialog" aria-labelledby="addnewTravelerModal" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="addnewTravelerModal">
                                    Add Traveler
                                </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-row">
                                        <label htmlFor="first">Full Name</label>
                                        <input value={name} onChange={this.handleChange} type="text" className="form-control" name="name" placeholder="Steve Jobs" />
                                        <label htmlFor="email">Email</label>
                                        <input value={email} onChange={this.handleChange} type="email" className="form-control" name="email" placeholder="steve@apple.com" />
                                        <label htmlFor="phone">Phone</label>
                                        <input value={phone} onChange={this.handleChange} type="text" className="form-control" name="phone" placeholder="559-867-5309" />
                                        <label htmlFor="personalNotes">Personal notes</label>
                                        <textarea value={personalNotes} onChange={this.handleChange} type="textarea" size={4} className="form-control" name="personalNotes" placeholder="List any personal notes about your traveler here" />
                                        <label htmlFor="image">Image link</label>
                                        <div className="input-group">
                                            <input name="image" className="form-control" type="text" value={img} onChange={this.handleChange} placeholder="https://www.link-to-your=image.com" />
                                            <FileUploader id="addEvent" isAuth={true} onUpload={this.handleUpload} accept="image/*" />
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

export default AddTraveler
