import React, { Component } from 'react'
import FileUploader from '../../Other/FileUploader'

class TripImageForm extends Component {
    state = {
        image: this.props.image
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleUpload = url => {
        console.log('This one')
        this.setState({
            image: url
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        this.props.submit(this.state)
    }

    render() {
        let { image } = this.state

        return (
            <>
                <h5 className="text-light hover" data-toggle="modal" data-target="#newImage">
                    Change cover photo <i class="far fa-images"></i>
                </h5>
                <div class="modal fade" id="newImage" tabindex="-1" role="dialog" aria-labelledby="addnewImageModal" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="addnewImageModal">
                                    Cover photo
                                </h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="form-row">
                                        <div class="form-group col-10">
                                            <label htmlFor="image">Image</label>
                                            <div className="input-group">
                                                <input value={image} onChange={this.handleChange} type="text" class="form-control" name="image" placeholder="image" />
                                                <FileUploader key="tripImage" isAuth={true} onUpload={this.handleUpload} accept="image/*" />
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

export default TripImageForm
