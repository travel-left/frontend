import React, { Component } from 'react'
import TripImageForm from './TripImageForm'
import TripDatesForm from './TripDatesForm'
import { apiCall } from '../../util/api'
import TripStatusForm from './TripStatusForm'
import ShareTrip from '../../util/otherComponents/ShareTrip'
import './Cover.css'

class Cover extends Component {
    tripId = this.props.currentTrip._id
    state = {
        travelers: []
    }

    constructor(props) {
        super(props)

        this.getAndSetTravelers()
    }
    updateTrip = async updateObject => {
        try {
            const data = await apiCall(
                'put',
                `/api/trips/${this.tripId}`,
                updateObject
            )
            return this.props.setCurrentTrip(data)
        } catch (err) { }
    }

    getAndSetTravelers = async () => {
        const travelers = await apiCall(
            'get',
            `/api/trips/${this.tripId}/travelers`
        )
        this.setState({
            travelers
        })
    }

    render() {
        let currentTrip = this.props.currentTrip
        let invited = this.state.travelers.length
        let confirmed = this.state.travelers.filter(t => t.status !== 'INVITED')
            .length
        return (
            <div className="row">
                <div
                    className="col-12 d-flex flex-column justify-content-end px-5 py-2 Cover-image"
                    style={{
                        backgroundImage: `url(${currentTrip.image})`,
                        height: '183px',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        borderRadius: '3px'
                    }}
                >
                    <div className="row justify-content-between">
                        <TripStatusForm
                            submit={this.updateTrip}
                            status={currentTrip.status}
                        />
                        <div className="pr-2">
                            <ShareTrip
                                travelers={this.state.travelers}
                                tripId={this.tripId}
                            />
                        </div>
                    </div>
                    <div className="row justify-content-between">
                        <div className="btn">
                            <h5 className="d-inline Cover-bottom-row">
                                {invited} Invited
                            </h5>
                            <h5 className="d-inline ml-5 Cover-bottom-row">
                                {confirmed} Confirmed
                            </h5>
                        </div>
                        <TripDatesForm
                            dateStart={currentTrip.dateStart}
                            dateEnd={currentTrip.dateEnd}
                            submit={this.updateTrip}
                        />
                        <TripImageForm
                            image={currentTrip.image}
                            submit={this.updateTrip}
                        />
                    </div>
                </div>
                <div className="col-3" />
            </div>
        )
    }
}

export default Cover
