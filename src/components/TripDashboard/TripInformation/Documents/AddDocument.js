import React, { Component } from 'react'
import FileUploader from '../../../Other/FileUploader'

class AddDocument extends Component {
    state = {
        name: '',
        link: '',
        description: ''
    }

    handleUpload = url => {
        this.setState({
            link: url
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
            link: '',
            description: ''
        })
    }

    render() {
        let { name, link, description } = this.state
        return (
            <>
                <button class="btn btn-primary" data-toggle="modal" data-target="#newDocument">
                    add new
                </button>
                <div class="modal fade" id="newDocument" tabindex="-1" role="dialog" aria-labelledby="addnewDocumentModal" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="addnewDocumentModal">
                                    Add a document
                                </h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="form-row">
                                        <div class="form-group col-10">
                                            <label for="name">Name</label>
                                            <input value={name} onChange={this.handleChange} id="name" type="text" class="form-control" name="name" placeholder="New Document" />
                                            <label for="description">Description</label>
                                            <textarea value={description} onChange={this.handleChange} id="description" name="description" placeholder="Description" class="form-control" rows="3" />
                                            <label for="link">Document</label>
                                            <div className="input-group">
                                                <input value={link} onChange={this.handleChange} type="text" class="form-control" name="link" placeholder="document" />
                                                <FileUploader id="addDocument" isAuth={true} onUpload={this.handleUpload} />
                                            </div>
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

export default AddDocument
