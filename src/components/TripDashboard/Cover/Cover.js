import React, { Component } from 'react'
import TripImageForm from './TripImageForm'
import TripDatesForm from './TripDatesForm'
import { apiCall } from '../../../util/api'
import TripStatusForm from './TripStatusForm';

class Cover extends Component {

    constructor(props) {
        super(props)
    }

    updateTrip = updateObject => {
        console.log(updateObject)
        apiCall('put', `/api/trips/${this.props.currentTrip._id}`, updateObject)
            .then(data => {
                return apiCall('get', `/api/trips/${this.props.currentTrip._id}`)
            })
            .then(data => {
                return this.props.setCurrentTrip({ ...data })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        let currentTrip = this.props.currentTrip

        return (
            <div className="row">
                <div className="col-12 d-flex flex-column justify-content-between px-5 py-2" style={{ backgroundImage: `url(${currentTrip.image})`, minHeight: '200px', backgroundPosition: 'center' }}>
                    <div className="row">
                        <h2 className='text-light'>{currentTrip.name} Trip</h2>
                    </div>
                    <div className="row align-items-start">
                        <h5 className='text-light'>Status: </h5>
                        <span class="badge badge-primary badge-pill h5 align-self-center ml-2 bg-secondary">{currentTrip.status} </span>
                        <TripStatusForm submit={this.updateTrip} status={currentTrip.status} />
                    </div>
                    <div className="row justify-content-between">
                        <div>
                            <h5 className='d-inline text-light'>32 Invited</h5>
                            <h5 className='d-inline text-light ml-3'>12 Booked</h5>
                        </div>
                        <TripDatesForm dateStart={currentTrip.dateStart} dateEnd={currentTrip.dateEnd} submit={this.updateTrip}></TripDatesForm>
                        <TripImageForm image={currentTrip.image} submit={this.updateTrip}></TripImageForm>
                    </div>
                </div>
                <div className="col-3">

                </div>
            </div>
        )
    }
}

export default Cover
