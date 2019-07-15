import React, { Component } from 'react'
import FileUploader from '../../../forms/FileUploader'

class UpdateTravelerForm extends Component {
    state = {
        name: this.props.name,
        img: this.props.img,
        email: this.props.email,
        phone: this.props.phone,
        _id: this.props._id,
        status: this.props.status,
        personalNotes: this.props.personalNotes
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
        let { name, email, img, phone, _id, status, personalNotes } = this.state

        return (
            <>
                <i className="far fa-edit fa-2x text-secondary hover" data-toggle="modal" data-target={'#editTraveler' + _id} />
                <div className="modal fade" id={'editTraveler' + _id} tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit traveler</h5>
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
                                            <label htmlFor="image">Image</label>
                                            <div className="input-group">
                                                <input name="image" className="form-control" type="text" value={img} onChange={this.handleInputChange} placeholder="https://www.link-to-your=image.com" />
                                                <FileUploader id="addEvent" isAuth={true} onUpload={this.handleUpload} accept="image/*" />
                                            </div>
                                            <label htmlFor="email">Email</label>
                                            <input value={email} onChange={this.handleChange} type="text" className="form-control" name="email" placeholder="email" />
                                            <label htmlFor="phone">Phone</label>
                                            <input value={phone} onChange={this.handleChange} type="text" className="form-control" name="phone" placeholder="559-867-5309" />
                                            <label htmlFor="personalNotes">Personal notes</label>
                                            <textarea value={personalNotes} onChange={this.handleChange} type="textarea" size={4} className="form-control" name="personalNotes" placeholder="List any personal notes about your traveler here" />
                                            <label htmlFor="status">Status</label>
                                            <br />
                                            <select className="" value={status} onChange={this.handleChange} name="status">
                                                <option value={'INVITED'}>Invited</option>
                                                <option value={'CONFIRMED'}>Confrimed</option>
                                                <option value={'ON-TRIP'}>On Trip</option>
                                                <option value={'POST-TRIP'}>Post Trip</option>
                                            </select>
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

export default UpdateTravelerForm
