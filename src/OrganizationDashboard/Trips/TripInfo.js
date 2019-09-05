import React, { Component } from 'react'
import Moment from 'react-moment'
import { apiCall } from '../../util/api'
import TripStatus from '../../util/otherComponents/TripStatus'
import './TripInfo.css'

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

        dateStart = dateStart.split('T')[0]
        dateEnd = dateEnd.split('T')[0]

        let invited = this.state.travelers.length
        let confirmed = this.state.travelers.filter(t => t.status !== 'INVITED')
            .length

        return (
            <div className="pb-3 Trip-info">
                <div className="" style={{ position: 'relative' }}>
                    <img
                        src={image}
                        className="card-img-top mb-4 px-2 mt-3 px-3 TripInfo-image"
                        alt="..."
                    />
                </div>

                <div className="container px-4 mt-4">
                    <div className="mb-5">
                        <span className="TripInfo-title">{name}</span>
                        <button
                            onClick={this.handleEditClick}
                            className="btn btn-lg btn-primary float-right"
                        >
                            EDIT
                    </button>
                    </div>

                    <p className="TripInfo-description">{description}</p>
                    <div className='TripInfo-details'>
                        <div className='d-flex justify-content-between align-items-center '>
                            <span className='TripInfo-details-title'>Date</span>
                            <span className='TripInfo-details-date'><Moment date={dateStart} format="MMM DD" /></span>
                        </div>
                        <div className='d-flex justify-content-between align-items-center'>
                            <span className='TripInfo-details-title'>Status</span>
                            <span><TripStatus status={status} /></span>
                        </div>
                        <div className='d-flex justify-content-between align-items-center'>
                            <span className='TripInfo-details-title'>Total Invited</span>
                            <span className='badge badge-primary badge-pill d-flex align-items-center justify-content-center TripInfo-bubble'>{invited}</span>
                        </div>
                        <div className='d-flex justify-content-between align-items-center'>
                            <span className='TripInfo-details-title'>Total Confirmed</span>
                            <span className='badge badge-primary badge-pill d-flex align-items-center justify-content-center TripInfo-bubble'>{confirmed}</span>
                        </div>
                    </div>
                    <div className='d-flex justify-content-end my-5 row'>
                        <button
                            className="btn btn-lg btn-secondary mb-5 mb-xl-0"
                            onClick={this.handleDuplicate}
                        >
                            DUPLICATE
                    </button>
                        <button
                            className="btn btn-lg btn-secondary ml-5 mb-5 mb-xl-0"
                            onClick={this.handleArchive}
                        >
                            ARCHIVE
                    </button>
                    </div>

                </div>
            </div>
        )
    }
}

export default TripInfo