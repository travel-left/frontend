import React, { Component } from 'react'
import FileUploader from '../../../Other/FileUploader'

class NewCoordinatorForm extends Component {
    state = {
        name: this.props.name,
        image: this.props.image,
        email: this.props.email,
        tite: ''
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
        let { name, email, image, title } = this.state

        return (
            <>
                <button className="btn btn-primary mb-4" data-toggle="modal" data-target="#newCoordinator">
                    add new
                </button>
                <div class="modal fade" id="newCoordinator" tabindex="-1" role="dialog" aria-labelledby="addnewCoordinatorModal" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="addnewCoordinatorModal">
                                    New Coordinator
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
                                            <label htmlFor="name">Image</label>
                                            <div className="input-group">
                                                <input value={image} onChange={this.handleChange} type="text" class="form-control" name="image" placeholder="image" />
                                                <FileUploader isAuth={true} onUpload={this.handleUpload} accept="image/*" />
                                            </div>
                                            <label htmlFor="name">Email</label>
                                            <input value={email} onChange={this.handleChange} type="text" class="form-control" name="email" placeholder="jordan@travel-left.com" />
                                            <label htmlFor="title">Title</label>
                                            <input value={title} onChange={this.handleChange} type="text" class="form-control" name="title" placeholder="Travel Coordinator" />
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

export default NewCoordinatorForm
