import React, { Component } from 'react'

class TripForm extends Component {
    state = {
        trip: {
            name: '',
            image: ''
        }
    }

    constructor(props) {
        super(props)
    }

    handleInputChange = e => {
        const updatedTrip = {
            ...this.state.trip
        }
        updatedTrip[e.target.name] = e.target.value
        this.setState({
            trip: updatedTrip
        })
    }

    handleSubmitEvent = event => {
        event.preventDefault()
        this.props.submit(this.state.trip)
    }

    render() {
        let { name, image } = this.state.trip

        return (
            <div className="container trip-form">
                <form onSubmit={this.handleSubmitEvent} style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className="form-row" style={{ justifyContent: 'center' }}>
                        <h3>Enter your trip details:</h3>
                        <input name="name" className="form-control col-8" type="text" value={name} onChange={this.handleInputChange} placeholder="Trip Name" />
                        <input name="image" className="form-control col-8" type="text" value={image} onChange={this.handleInputChange} placeholder="www.linkToYourImage.com" />
                        <button type="submit" className="btn btn-primary float-right col-5" style={{ backgroundColor: '#83c9f4', color: '#fbfef9' }}>
                            SUBMIT
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default TripForm
