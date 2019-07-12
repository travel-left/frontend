import React, { Component } from 'react'
import FileUploader from '../../../Forms/FileUploader'

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
                <button className="btn btn-primary" data-toggle="modal" data-target="#newDocument">
                    add new
                </button>
                <div className="modal fade" id="newDocument" tabIndex="-1" role="dialog" aria-labelledby="addnewDocumentModal" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="addnewDocumentModal">
                                    Add a document
                                </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-row">
                                        <div className="form-group col-10">
                                            <label htmlFor="name">Name</label>
                                            <input value={name} onChange={this.handleChange} id="name" type="text" className="form-control" name="name" placeholder="New Document" />
                                            <label htmlFor="description">Description</label>
                                            <textarea value={description} onChange={this.handleChange} id="description" name="description" placeholder="Description" className="form-control" rows="3" />
                                            <label htmlFor="link">Document</label>
                                            <div className="input-group">
                                                <input value={link} onChange={this.handleChange} type="text" className="form-control" name="link" placeholder="document" />
                                                <FileUploader id="addDocument" isAuth={true} onUpload={this.handleUpload} />
                                            </div>
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

export default AddDocument
