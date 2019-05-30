import React, { Component } from 'react'

class TripForm extends Component {
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

    closeForm = () => {
        this.props.hide()
    }

    render() {
        let { name, image, dateStart, dateEnd, description } = this.state

        return (
            <div class="card" style={{ border: 'none', backgroundColor: '#FBFBFB' }}>
                <div class="card-body" style={{ marginTop: '20px' }}>
                    <form onSubmit={this.handleSubmitEvent} >
                        <h3 class="text-center">Enter your trip details: <span onClick={this.closeForm}>X</span></h3>
                        <div className="form-row" >
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
                                <textarea name="description" className="form-control col-8" type="text" value={description} onChange={this.handleInputChange} placeholder="A description for your trip"></textarea>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-lg btn-square dark pull-right" style={{ fontSize: '.9em' }}>
                            SUBMIT
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

export default TripForm
