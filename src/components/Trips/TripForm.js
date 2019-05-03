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
        console.log(e.target.name)
        console.log(e.target.value)
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
        console.log(this.state.trip)
        this.props.submit(this.state.trip)
    }

    render() {
        let { name, image } = this.state.trip

        return (
            <div className="trip-form">
                <form onSubmit={this.handleSubmitEvent}>
                    <div className="form-row">
                        <div className="col">
                        {/* name */}
                            <input name='name' className="form-control" type="text" value={name} onChange={this.handleInputChange} placeholder="Trip Name"/>
                        </div>
                        <div className="col">
                        {/* image */}
                            <input name='image' className="form-control" type="text" value={image} onChange={this.handleInputChange} placeholder="www.linkToYourImage.com"/>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary float-right" style={{backgroundColor: '#079992'}}>SUBMIT</button>
                </form>
            </div>
        )
    }
}

export default TripForm