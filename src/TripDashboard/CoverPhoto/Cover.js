import React, { Component } from 'react'
import TripImageForm from './TripImageForm'
import TripDatesForm from './TripDatesForm'
import { apiCall } from '../../util/api'
import TripStatusForm from './TripStatusForm'

class Cover extends Component {
    updateTrip = async updateObject => {
        try {
            console.log(updateObject)
            await apiCall('put', `/api/trips/${this.props.currentTrip._id}`, updateObject)
            const data = await apiCall('get', `/api/trips/${this.props.currentTrip._id}`)
            return this.props.setCurrentTrip(data)
        } catch (err) {
            console.error(err)
        }
    }

    render() {
        let currentTrip = this.props.currentTrip

        return (
            <div className="row">
                <div className="col-12 d-flex flex-column justify-content-between px-5 py-2" style={{ backgroundImage: `url(${currentTrip.image})`, minHeight: '240px', backgroundPosition: 'center', backgroundSize: 'cover' }}>
                    <div className="row">
                        <h2 className="text-light">{currentTrip.name} Trip</h2>
                    </div>
                    <div className="row">
                        <TripStatusForm submit={this.updateTrip} status={currentTrip.status} />
                    </div>
                    <div className="row justify-content-between">
                        <div>
                            <h5 className="d-inline text-light">32 Invited</h5>
                            <h5 className="d-inline text-light ml-3">12 Booked</h5>
                        </div>
                        <TripDatesForm dateStart={currentTrip.dateStart} dateEnd={currentTrip.dateEnd} submit={this.updateTrip} />
                        <TripImageForm image={currentTrip.image} submit={this.updateTrip} />
                    </div>
                </div>
                <div className="col-3" />
            </div>
        )
    }
}

export default Cover
