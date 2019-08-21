import React, { Component } from 'react'
import TripImageForm from './TripImageForm'
import TripDatesForm from './TripDatesForm'
import { apiCall } from '../../util/api'
import TripStatusForm from './TripStatusForm'
import ShareTrip from '../../util/otherComponents/ShareTrip'

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
        } catch (err) {}
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
                    className="col-12 d-flex flex-column justify-content-between px-4 py-2"
                    style={{
                        backgroundImage: `url(${currentTrip.image})`,
                        minHeight: '240px',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover'
                    }}
                >
                    <div className="row">
                        <h2
                            className="text-light left-shadow"
                            style={{ paddingLeft: '.75rem' }}
                        >
                            {currentTrip.name}
                        </h2>
                    </div>
                    <div className="row justify-content-between">
                        <TripStatusForm
                            submit={this.updateTrip}
                            status={currentTrip.status}
                        />
                        <div className="pr-2">
                            <span className="px-3 py-3 rounded-circle d-flex justify-content-center align-items-center hover bg-primary">
                                <ShareTrip
                                    travelers={this.state.travelers}
                                    tripId={this.tripId}
                                />
                            </span>
                        </div>
                    </div>
                    <div className="row justify-content-between">
                        <div className="btn">
                            <h5 className="d-inline text-light left-shadow">
                                {invited} Invited
                            </h5>
                            <h5 className="d-inline text-light ml-3 left-shadow">
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
