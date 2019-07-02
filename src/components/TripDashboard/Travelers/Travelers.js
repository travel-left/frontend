import React, { Component } from 'react'
import TravelerList from './Travelers/TravelerList'
import { apiCall } from '../../../util/api'
import Alert from '../../Other/Alert'
import DashboardHeader from '../../Other/DashboardHeader'
import AddTraveler from './Travelers/AddTraveler'

class Travelers extends Component {
    tripId = this.props.currentTrip._id

    cohortId = this.props.currentCohort._id

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

    getAndSetTravelers = async () => {
        const travelers = await apiCall('get', `/api/trips/${this.tripId}/cohorts/${this.cohortId}/travelers`)
        this.setState({ travelers })
    }

    addTraveler = async traveler => {
        const newTraveler = {
            ...traveler,
            accessType: 'user',
            password: 'password',
            currentTrip: this.props.currentTrip._id,
            currentCohort: this.props.currentCohort._id
        }

        const trav = await apiCall('post', '/api/travelers', newTraveler)
        await apiCall('PUT', `/api/trips/${this.tripId}/cohorts/${this.cohortId}/travelers/${trav._id}`)
        this.getAndSetTravelers()
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
                </div>
            </div>
        )
    }
}

export default Travelers
