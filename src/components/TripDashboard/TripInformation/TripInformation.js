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

    addCohort = cohort => {
        apiCall('post', `/api/trips/${this.props.currentTrip._id}/cohorts`, cohort)
            .then(data => {
                console.log(data)
            }).then(() => {
                return apiCall('get', `/api/trips/${this.props.currentTrip._id}/cohorts`)
            })
            .then(cohorts => {
                this.props.setCurrentTrip({ ...this.props.currentTrip, cohorts: cohorts })
            })

    }

    render() {
        let { name, description, status, image, dateStart, dateEnd } = this.props.currentTrip

        return (
            <div className='mt-3 mx-3'>
                <div className="row">
                    <div className="col-md-8 mt-4 ml-3">
                        <h4 className='text-dark'>Trip Name</h4>
                        <h3 className='text-primary my-1 d-inline'> {name} </h3>
                        <TripNameForm name={name} submit={this.updateTrip}></TripNameForm>
                        <h4 className='text-dark my-3'>Trip Coordinators</h4>
                        <div className="row">
                            <TripCoordinator></TripCoordinator>
                            <TripCoordinator></TripCoordinator>
                            <TripCoordinator></TripCoordinator>
                            <TripCoordinator></TripCoordinator>
                        </div>
                        <h4 className='text-dark my-3'>Trip Dates</h4>
                        <div className="row">
                            <TripDates></TripDates>
                        </div>
                        <h4 className='text-dark my-3'>Trip Documents</h4>
                        <Documents currentTrip={this.props.currentTrip} currentCohort={this.props.currentTrip.cohorts[1]}></Documents>
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
