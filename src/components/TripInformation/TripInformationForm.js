import React, { Component } from 'react'

class TripInformation extends Component {

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
        return this.setState({
            ...updatedTrip,
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        this.props.submit(this.state)
    }

    render() {
        let { name, description, status, image} = this.state
        
        return (
            <form onSubmit={this.handleSubmit}>
                <div class="form-row">
                    <div class="form-group col-10">
                        <input value={name} onChange={this.handleChange} type="text" class="form-control" name="name" placeholder="Trip name" />
                        <input value={status} onChange={this.handleChange} type="text" class="form-control" name="status" placeholder="Trip status" />
                        <input value={description} onChange={this.handleChange} type="text" class="form-control" name="description" placeholder="description" />
                        <input value={image} onChange={this.handleChange} type="text" class="form-control" name="image" placeholder="image" />
                    </div>
                </div>
                <button type="submit" class="btn btn-lg btn-square dark pull-right" style={{ fontSize: '.9em' }}>
                    UPDATE TRIP INFO
                </button>
            </form>
        )
    }
}

export default TripInformation
