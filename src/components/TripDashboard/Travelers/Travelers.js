import React, { Component } from 'react'
import TravelerList from './Travelers/TravelerList'
import { apiCall } from '../../../util/api'
import AddTraveler from './Travelers/AddTraveler'

class Travelers extends Component {
    state = {
        travelers: [],
        cohorts: []
    }

    constructor(props) {
        super(props)
        this.getAndSetTravelers()
    }

    componentDidUpdate(prevProps) {
        if (this.props.currentCohort !== prevProps.currentCohort) {
            this.getAndSetTravelers()
        }
    }

    getAndSetTravelers = () => {
        let tripId = this.props.currentTrip._id
        let cohortId = this.props.currentTrip.cohorts[0]._id
        apiCall('get', `/api/trips/${tripId}/cohorts/${cohortId}/travelers`).then(travelers => {
            return this.setState({ travelers })
        })
    }

    addTraveler = traveler => {
        let tripId = this.props.currentTrip._id

        traveler = {
            ...traveler,
            accessType: 'user',
            password: 'password',
            currentTrip: this.props.currentTrip._id,
            currentCohort: this.props.currentTrip.cohorts[0]._id,
            firstName: traveler.name.split(' ')[0],
            lastName: traveler.name.split(' ')[1]

        }

        apiCall('post', '/api/travelers', traveler)
            .then(traveler => {
                return apiCall('PUT', `/api/trips/${tripId}/cohorts/${this.props.currentTrip.cohorts[0]._id}/travelers/${traveler._id}`)
            })
            .then(() => this.getAndSetTravelers())
    }

    updateTraveler = async (travelerId, updateObject) => {
        await apiCall('put', `/api/travelers/${travelerId}`, updateObject)
        this.getAndSetTravelers()
    }

    render() {
        let { cohorts, travelers } = this.state

        return (
            <div className="mt-3 mx-3">
                <div className="row">
                    <div className="col-md-12 mt-4 mx-3 pr-5">
                        <div className="d-flex flex-row justify-content-between mb-4">
                            <h2 className="text-primary d-inline">People on this trip</h2>
                            <div>
                                <button className="btn btn-lg btn-secondary text-light mx-5">Import bulk</button>
                                <AddTraveler submit={this.addTraveler} />
                            </div>
                        </div>
                        <h4 className='d-block text-muted'>Add travelers here who are coming on the trip</h4>
                        <div className="card row d-flex flex-row no-gutters justify-content-around shadow mb-3 py-3 align-items-center px-3 px-md-0">
                            <div className="col-md-1 d-none d-md-block"> Image </div>
                            <div className="d-none d-md-flex col-md-2"> Name </div>
                            <div className="col-4 col-md-3">Email</div>
                            <div className="col-4 col-md-2"> Status</div>
                            <div className="col-4 col-md-1"></div>
                        </div>
                        <TravelerList travelers={travelers} cohorts={cohorts} addTravelerToCohort={this.addTravelerToCohort} updateTraveler={this.updateTraveler} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Travelers
