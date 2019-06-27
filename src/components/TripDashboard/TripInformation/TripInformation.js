import React, { Component } from 'react'
import Alert from '../../Other/Alert'
import DashboardHeader from '../../Other/DashboardHeader'
import UpdateTripForm from './UpdateTripForm'
import { connect } from 'react-redux'
import { setCurrentTrip } from '../../../store/actions/trip'
import { apiCall } from '../../../util/api'
import Moment from 'react-moment'
import CohortList from '../Travelers/Cohorts/CohortList';
import CohortForm from '../Travelers/Cohorts/CohortForm';
import TripCoordinator from './TripCoordinator';
import TripDatesForm from '../Cover/TripDatesForm';
import TripDates from './TripDates'
import TripNameForm from './TripNameForm';
import Documents from './Documents/Documents';

class TripInformation extends Component {

    state = {
        coordinators: []
    }
    constructor(props) {
        super(props)

        this.getCoordinators()
    }

    updateTrip = async updateObject => {
        await apiCall('put', `/api/trips/${this.props.currentTrip._id}`, updateObject)
        let updatedTrip = await apiCall('get', `/api/trips/${this.props.currentTrip._id}`)
        this.props.setCurrentTrip({ ...updatedTrip })
    }

    // addCohort = async cohort => {
    //     await apiCall('post', `/api/trips/${this.props.currentTrip._id}/cohorts`, cohort)
    //     let cohorts = await apiCall('get', `/api/trips/${this.props.currentTrip._id}/cohorts`)
    //     this.props.setCurrentTrip({ ...this.props.currentTrip, cohorts })
    // }

    getCoordinators = async () => {
        let coordinators = await apiCall('get', `/api/trips/${this.props.currentTrip._id}/coordinators`)
        this.setState({ coordinators })
    }

    render() {
        let { name, description, status, image, dateStart, dateEnd } = this.props.currentTrip
        let coordinatorList = this.state.coordinators.length > 0 ? this.state.coordinators.map(c => <TripCoordinator coordinator={c}></TripCoordinator>) : null
        return (
            <div className='mt-3 mx-3'>
                <div className="row">
                    <div className="col-md-8 mt-4 ml-3">
                        <h4 className='text-dark'>Trip Name</h4>
                        <h3 className='text-primary my-1 d-inline'> {name} </h3>
                        <TripNameForm name={name} submit={this.updateTrip}></TripNameForm>
                        <h4 className='text-dark my-3'>Trip Coordinators</h4>
                        <div className="row">
                            {coordinatorList}
                        </div>
                        <h4 className='text-dark my-3'>Trip Dates</h4>
                        <div className="row">
                            <TripDates></TripDates>
                        </div>
                        <h4 className='text-dark my-3'>Trip Documents</h4>
                        <Documents currentTrip={this.props.currentTrip}></Documents>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentTrip: state.currentTrip
    }
}

export default connect(
    mapStateToProps,
    { setCurrentTrip }
)(TripInformation)
