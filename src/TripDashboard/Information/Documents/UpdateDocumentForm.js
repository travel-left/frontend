import React, { Component } from 'react'
import FileUploader from '../../../forms/FileUploader'

class UpdateDocumentForm extends Component {
    state = {
        ...this.props
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

    handleSubmit = event => {
        event.preventDefault()
        this.props.submit(this.state)
    }

    render() {
        let { name, description, link, id } = this.state

        return (
            <>
                <i className="far fa-edit fa-2x float-right text-secondary hover" data-toggle="modal" data-target={'#editDocument' + id} />
                <div className="modal fade" id={'editDocument' + id} tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Document</h5>
                                <button type="button" className="close" data-dismiss="modal">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-row">
                                        <div className="form-group col-10">
                                            <label htmlFor="name">Name</label>
                                            <input value={name} onChange={this.handleChange} type="text" className="form-control" name="name" placeholder="Special Waiver" />
                                            <label htmlFor="description">Description</label>
                                            <input value={description} onChange={this.handleChange} type="text" className="form-control" name="description" placeholder="Lorem ipsum dolor sit." />
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

export default UpdateDocumentForm
