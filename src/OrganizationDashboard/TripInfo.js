import React, { Component } from 'react'
import Moment from 'react-moment'
import { apiCall } from '../util/api'

class TripInfo extends Component {
    tripId = this.props.trip._id
    state = {
        travelers: []
    }
    constructor(props) {
        super(props)
        this.getAndSetTravelers()
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

    handleEditClick = () => {
        this.props.edit(this.tripId)
    }

    handleDuplicate = async () => {
        const { trip, duplicateTrip } = this.props
        const newTrip = { ...trip, name: trip.name + ' Copy' }
        delete newTrip._id
        duplicateTrip(newTrip)
    }

    handleArchive = async () => {
        const { trip, archiveTrip } = this.props
        archiveTrip(trip._id)
    }

    render() {
        let { name, dateStart, dateEnd, image, description, status } = this.props.trip
        // let { statusCounts } = this.props
        let invited = this.state.travelers.filter(t => t.status === 'INVITED')
        let confirmed = this.state.travelers.filter(
            t => t.status === 'CONFIRMED'
        )

        return (
            <div className="pb-3 bg-light">
                <div className="" style={{ position: 'relative' }}>
                    <img
                        src={image}
                        className="card-img-top border-0 mb-4 px-2 mt-3 px-3"
                        alt="..."
                        style={{ backgroundColor: '#FBFBFB' }}
                    />
                    <span class="px-3 py-3 rounded-circle d-flex justify-content-center align-items-center hover shadow" style={{
                        position: 'absolute',
                        top: '68%',
                        right: '10%',
                        color: 'white',
                        backgroundColor: '#0F61D8'
                    }}><i class="far fa-paper-plane fa-lg"></i></span>
                </div>

                <div className="container bg-light">
                    <span className="h4">Trip to {name}</span>
                    <button
                        onClick={this.handleEditClick}
                        className="btn btn-lg btn-primary float-right"
                    >
                        VIEW
                    </button>
                    <p className="py-3 text-black-50">{description}</p>
                    <ul className="list-group list-group-flush px-0 mx-0 pb-4">
                        <li className="list-group-item bg-light">
                            Date{' '}
                            <span className="float-right text-primary">
                                <Moment date={dateStart} format="MMM DD" />{' - '}
                                <Moment date={dateEnd} format="MMM DD" />
                            </span>
                        </li>
                        <li className="list-group-item bg-light">
                            Status{' '}
                            <span className="float-right badge badge-primary badge-pill badge-secondary text-light px-3">
                                {status}
                            </span>
                        </li>
                        <li className="list-group-item bg-light">
                            Total Invited{' '}
                            <span className="float-right badge badge-primary badge-pill px-2">
                                {invited.length}
                            </span>
                        </li>
                        <li className="list-group-item bg-light">
                            Total Confirmed{' '}
                            <span className="float-right badge badge-primary badge-pill px-2">
                                {confirmed.length}
                            </span>
                        </li>
                    </ul>
                    <button
                        className="btn btn-lg btn-secondary text-light"
                        onClick={this.handleDuplicate}
                    >
                        DUPLICATE
                    </button>
                    <button
                        className="btn btn-lg btn-secondary text-light float-right"
                        onClick={this.handleArchive}
                    >
                        ARCHIVE
                    </button>
                </div>
            </div>
        )
    }
}

export default TripInfo
