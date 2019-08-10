import React, { Component } from 'react'
import Moment from 'react-moment'
import { apiCall } from '../util/api'
import TripStatus from '../util/otherComponents/TripStatus'

class TripInfo extends Component {
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
            `/api/trips/${this.props.trip._id}/travelers`
        )
        this.setState({
            travelers
        })
    }

    // This is used because the component isn't reconstructed each time the trip is changed
    componentDidUpdate(prevProps) {
        if (this.props.trip._id !== prevProps.trip._id) {
            this.getAndSetTravelers()
        }
    }

    handleEditClick = () => {
        this.props.edit(this.props.trip._id)
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
        let {
            name,
            dateStart,
            dateEnd,
            image,
            description,
            status
        } = this.props.trip

        let invited = this.state.travelers.length
        let confirmed = this.state.travelers.filter(t => t.status !== 'INVITED')
            .length

        return (
            <div className="pb-3 bg-light">
                <div className="" style={{ position: 'relative' }}>
                    <img
                        src={image}
                        className="card-img-top border-0 mb-4 px-2 mt-3 px-3"
                        alt="..."
                        style={{ backgroundColor: '#FBFBFB' }}
                    />
                </div>

                <div className="container bg-light">
                    <span className="h4">{name}</span>
                    <button
                        onClick={this.handleEditClick}
                        className="btn btn-lg btn-primary float-right"
                    >
                        VIEW
                    </button>
                    <p className="py-3 text-black-50">{description}</p>
                    <ul className="list-group list-group-flush px-0 mx-0 pb-4">
                        <li className="list-group-item bg-light">
                            Dates{' '}
                            <span className="float-right text-primary">
                                <Moment date={dateStart} format="MMM DD" />
                                {' - '}
                                <Moment date={dateEnd} format="MMM DD" />
                            </span>
                        </li>
                        <li className="list-group-item bg-light">
                            Status
                            <span className="float-right">
                                <TripStatus status={status} />
                            </span>
                        </li>
                        <li className="list-group-item bg-light">
                            Total Invited{' '}
                            <span className="float-right badge badge-primary badge-pill px-2">
                                {invited}
                            </span>
                        </li>
                        <li className="list-group-item bg-light">
                            Total Confirmed{' '}
                            <span className="float-right badge badge-primary badge-pill px-2">
                                {confirmed}
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
