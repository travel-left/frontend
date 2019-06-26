import React, { Component } from 'react'
import TripImageForm from '../../containers/TripDashboard/TripInformation/TripImageForm'
import Moment from 'react-moment'
import { apiCall } from '../../util/api'

class CoverPhoto extends Component {

    constructor(props) {
        super(props)
    }

    updateCoverPhoto = newImage => {
        apiCall('put', `/api/trips/${this.props.currentTrip._id}`, { image: newImage }) // Update Trip
            .then(data => {
                return apiCall('get', `/api/trips/${this.props.currentTrip._id}`) // Get Trip by Id
            })
            .then(data => {
                this.props.setCurrentTrip({ ...data })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        let currentTrip = this.props.currentTrip

        return (
            <div className="row">
                <div className="col-9 d-flex flex-column justify-content-between px-5 py-2" style={{ backgroundImage: `url(${currentTrip.image})`, height: '20vh', backgroundPosition: 'center' }}>
                    <div className="row">
                        <h2 className='text-light'>Your {currentTrip.name} Trip</h2>
                    </div>
                    <div className="row align-items-start">
                        <h5 className='text-light'>Status: </h5>
                        <span class="badge badge-primary badge-pill h5 align-self-center ml-2 bg-secondary">{currentTrip.status} </span>
                    </div>
                    <div className="row justify-content-between">
                        <div>
                            <h5 className='d-inline text-light'>32 Invited</h5>
                            <h5 className='d-inline text-light ml-3'>12 Booked</h5>
                        </div>
                        <h5 className='text-light'><Moment date={currentTrip.dateStart} format="MMMM DD" /> {' - '} <Moment date={currentTrip.dateEnd} format="MMMM DD" /></h5>
                        <TripImageForm image={currentTrip.image} submit={this.updateCoverPhoto}></TripImageForm>
                    </div>
                </div>
                <div className="col-3">

                </div>
            </div>
        )
    }
}

export default CoverPhoto
