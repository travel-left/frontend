import React, { Component } from 'react'

class TripInformationForm extends Component {

    state = {
        ...this.props.trip
    }

    constructor(props) {
        super(props)
    }

    handleChange = e => {
        let updatedTrip = {
            ...this.state
        }
        updatedTrip[e.target.name] = e.target.value
        this.setState({
            ...updatedTrip,
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        this.props.submit(this.state)
    }

    render() {
        let { name, description, status, image, dateStart, dateEnd } = this.state
        
        return (
            <div>
                <h3 class='text-center'>Edit Trip Information</h3>
                <form onSubmit={this.handleSubmit}>
                    <div class="form-row">
                        <div class="form-group col-10">
                            <label htmlFor="name">Name</label>
                            <input value={name} onChange={this.handleChange} type="text" class="form-control" name="name" placeholder="Trip name" />
                            <label htmlFor="status">Status: </label>
                            <select value={status.toLowerCase()} onChange={this.handleChange} name="status">
                                <option value="planning">planning</option>
                                <option value="planned">planned</option>
                                <option value="active">active</option>
                                <option value="past">past</option>
                            </select>
                            <br/>
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
                    <button type="submit" class="btn btn-lg btn-square dark pull-right" style={{ fontSize: '.9em' }}>
                        UPDATE TRIP INFO
                    </button>
                </form>
            </div>
        )
    }
}

export default TripInformationForm
