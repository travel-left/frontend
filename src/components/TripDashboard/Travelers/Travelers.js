import React, { Component } from 'react'
import TravelerList from './Travelers/TravelerList'
import { apiCall } from '../../../util/api'
import Alert from '../../Other/Alert'
import DashboardHeader from '../../Other/DashboardHeader'
import SideBar from '../SideBar'
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
        let cohortId = this.props.currentCohort._id
        apiCall('get', `/api/trips/${tripId}/cohorts/${cohortId}/travelers`).then(travelers => {
            return this.setState({ travelers })
        })
    }

    addTraveler = traveler => {
        let tripId = this.props.currentTrip._id
        let cohortId = this.props.currentCohort._id
        traveler = {
            ...traveler,
            accessType: 'user',
            password: 'password',
            currentTrip: this.props.currentTrip._id,
            currentCohort: this.props.currentCohort._id
        }

        apiCall('post', '/api/travelers', traveler)
            .then(traveler => {
                return apiCall('PUT', `/api/trips/${tripId}/cohorts/${cohortId}/travelers/${traveler._id}`)
            })
            .then(() => this.getAndSetTravelers())
    }

    render() {
        let { cohorts, travelers } = this.state

        return (
            <div>
                <div className="row">
                    <div className="col-12">
                        <Alert text="Organize your travelers and cohorts here." />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <DashboardHeader title="People on this Trip" description="Add travelers here who are coming on this trip. Add them to a cohort to asign them group specific docs and itinerary" currentTrip={this.props.currentTrip} />
                        <AddTraveler submit={this.addTraveler} />
                        <div className="">
                            <div className="card trip-list-header d-flex flex-row justify-content-between shadow mb-3 py-3 px-md-2 px-1">
                                <div className="col-md-3 offset-md-2 border-bottom border-primary d-none d-md-flex">Name</div>
                                <div className="col-5 col-md-3">Email</div>
                                <div className="col-5 col-md-2">Status</div>
                            </div>
                            <TravelerList travelers={travelers} cohorts={cohorts} addTravelerToCohort={this.addTravelerToCohort} />
                        </div>
                    </div>
                    <SideBar ctr={[]} />
                </div>
            </div>
        )
    }
}

export default Travelers
