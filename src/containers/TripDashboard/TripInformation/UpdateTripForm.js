import React, { Component } from 'react'

class UpdateTripForm extends Component {

    state = {
    }

    constructor(props) {
        super(props)
    }

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        this.props.submit(this.state.date)
    }

    render() {
        let { name, description, status, image, dateStart, dateEnd } = this.props.trip

        return (
            <>
                <button class="btn btn-lg btn-primary" data-toggle="modal" data-target="#newDay">
                    Edit Trip Info
                </button>
                <div class="modal fade" id="newDay" tabindex="-1" role="dialog" aria-labelledby="addnewDayModal" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="addnewDayModal">
                                    Edit Trip Information
                            </h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="form-row">
                                        <div class="form-group col-10">
                                            <label htmlFor="name">Name</label>
                                            <input value={name} onChange={this.handleChange} type="text" class="form-control" name="name" placeholder="Trip name" />
                                            <label htmlFor="status">Status: </label>
                                            <select value={status} onChange={this.handleChange} name="status">
                                                <option value="planning">planning</option>
                                                <option value="planned">planned</option>
                                                <option value="active">active</option>
                                                <option value="past">past</option>
                                            </select>
                                            <br />
                                            <label htmlFor="description">Description</label>
                                            <input value={description} onChange={this.handleChange} type="text" class="form-control" name="description" placeholder="description" />
                                            <label htmlFor="image">Image</label>
                                            <input value={image} onChange={this.handleChange} type="text" class="form-control" name="image" placeholder="image" />
                                            <label htmlFor="dateStart">Start date</label>
                                            <input name="dateStart" className="form-control col-8" type="date" value={dateStart} onChange={this.handleChange} />
                                            <label htmlFor="dateEnd">End date</label>
                                            <input name="dateEnd" className="form-control col-8" type="date" value={dateEnd} onChange={this.handleChange} />
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

export default UpdateTripForm