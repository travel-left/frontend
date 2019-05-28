import React, { Component } from 'react'

class TripForm extends Component {
    state = {
        trip: {
            name: '',
            image: '',
            dateStart: '',
            dateEnd: '',
            description: ''
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

    closeForm = () => {
        this.props.hide()
    }

    render() {
        let { name, image, dateStart, dateEnd, description } = this.state.trip

        return (
            <div class="card" style={{border: 'none', backgroundColor: '#FBFBFB'}}>
                <h3 class="text-center">Enter your trip details: <span onClick={this.closeForm}>X</span></h3>
                <form onSubmit={this.handleSubmitEvent} >
                    <div className="form-row" >
                        <div className="form-group col-10">
                            <input name="name" className="form-control col-8" type="text" value={name} onChange={this.handleInputChange} placeholder="Trip Name" />
                            <input name="image" className="form-control col-8" type="text" value={image} onChange={this.handleInputChange} placeholder="www.linkToYourImage.com" />
                            <input name="dateStart" className="form-control col-8" type="date" value={dateStart} onChange={this.handleInputChange} placeholder="www.linkToYourImage.com" />
                            <input name="dateEnd" className="form-control col-8" type="date" value={dateEnd} onChange={this.handleInputChange} placeholder="www.linkToYourImage.com" />
                            <textarea name="description" className="form-control col-8" type="text" value={description} onChange={this.handleInputChange} placeholder="A description for your trip"></textarea>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-lg btn-square dark pull-right" style={{ fontSize: '.9em' }}>
                        SUBMIT
                    </button>
                </form>
            </div>
        )
    }
}

export default TripForm
