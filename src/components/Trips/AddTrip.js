import React, { Component } from 'react'

class AddTrip extends Component {
    state = {
        name: '',
        image: '',
        dateStart: '',
        dateEnd: '',
        description: ''
    }

    constructor(props) {
        super(props)
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

    handleSubmitEvent = event => {
        event.preventDefault()
        this.props.submit(this.state)
    }

    render() {
        let { name, image, dateStart, dateEnd, description } = this.state

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
                                            <label htmlFor="name">Trip name</label>
                                            <input name="name" className="form-control col-8" type="text" value={name} onChange={this.handleInputChange} placeholder="Trip Name" />
                                            <label htmlFor="image">Image link</label>
                                            <input name="image" className="form-control col-8" type="text" value={image} onChange={this.handleInputChange} placeholder="www.linkToYourImage.com" />
                                            <label htmlFor="dateStart">Start date</label>
                                            <input name="dateStart" className="form-control col-8" type="date" value={dateStart} onChange={this.handleInputChange} placeholder="www.linkToYourImage.com" />
                                            <label htmlFor="dateEnd">End date</label>
                                            <input name="dateEnd" className="form-control col-8" type="date" value={dateEnd} onChange={this.handleInputChange} placeholder="www.linkToYourImage.com" />
                                            <label htmlFor="description">Description</label>
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
