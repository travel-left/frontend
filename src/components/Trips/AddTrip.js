import React, { Component } from 'react'
import FileUploader from '../Other/FileUploader'
import TextInput from '../Other/TextInput'

class AddTrip extends Component {
    state = {
        name: '',
        image: '',
        dateStart: '',
        dateEnd: '',
        description: ''
    }

    handleInputChange = e => {
        const updatedTrip = {
            ...this.state
        }
        updatedTrip[e.target.name] = e.target.value
        this.setState({
            ...updatedTrip
        })
    }

    handleChange = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    handleUpload = url => {
        this.setState({
            image: url
        })
    }

    handleSubmitEvent = event => {
        event.preventDefault()
        this.props.submit(this.state)
        this.setState({
            name: '',
            image: '',
            dateStart: '',
            dateEnd: '',
            description: ''
        })
    }

    render() {
        let { name, image, dateStart, dateEnd, description } = this.state

        const classes = ['form-control', 'col-8']

        return (
            <>
                <button onClick={this.showTripForm} class="btn btn-lg btn-primary" data-toggle="modal" data-target="#newTrip">
                    ADD NEW TRIP
                </button>
                <div class="modal fade" id="newTrip" tabindex="-1" role="dialog" aria-labelledby="addNewTripModal" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="addNewTripModal">
                                    Enter your trip details
                                </h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form onSubmit={this.handleSubmitEvent}>
                                    <div className="form-row">
                                        <div className="form-group col-12">
                                            <TextInput name="name" type="text" classes={classes} value={name} label="Trip Name" placeholder="Trip Name" change={this.handleChange} />
                                            <label htmlFor="image" className="text-dark mt-2">
                                                Image
                                            </label>
                                            <div className="input-group">
                                                <input name="image" className="form-control col-6" type="text" value={image} onChange={this.handleInputChange} placeholder="https://www.link-to-your=image.com" />
                                                <FileUploader isAuth={true} onUpload={this.handleUpload} accept="image/*" />
                                            </div>
                                            <TextInput name="dateStart" type="date" classes={classes} value={dateStart} label="Start Date" placeholder="07/01/2019" change={this.handleChange} />
                                            <TextInput name="dateEnd" type="date" classes={classes} value={dateEnd} label="End Date" placeholder="07/01/2019" change={this.handleChange} />
                                            <label htmlFor="description" className="text-dark mt-2">
                                                Description
                                            </label>
                                            <textarea name="description" className="form-control col-8" type="text" value={description} onChange={this.handleInputChange} placeholder="A description for your trip" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button onClick={this.handleSubmitEvent} type="button" class="btn btn-primary" data-dismiss="modal">
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

export default AddTrip
