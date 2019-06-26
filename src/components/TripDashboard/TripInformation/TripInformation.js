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

class TripInformation extends Component {
    constructor(props) {
        super(props)
    }

    updateTrip = updatedTrip => {
        apiCall('put', `/api/trips/${this.props.currentTrip._id}`, updatedTrip) // Update Trip
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
            <div>
                <div className="row">
                    <div className="col-md-8 mt-4 ml-3">
                        <h4 className='text-dark'>Trip Name</h4>
                        <h3 className='text-primary'> {name} <i class="far fa-edit"></i></h3>
                        <h4 className='text-dark'>Trip Coordinators</h4>
                        <div class="card shadow border-0 mb-3">
                            <div class="card-body">
                                <h2 className="card-title ">
                                    {' '}
                                    <span className="float-right h5 text-dark">
                                        <Moment date={dateStart} format="MMM Do" /> - <Moment date={dateEnd} format="MMM Do" />
                                    </span>
                                </h2>
                                <h5>Status</h5> <span class="badge badge-primary badge-pill">{status} </span> <br />
                                <h5>Description</h5> <p class="card-text">{description}</p>
                                <h5>Image link</h5>
                                <p class="card-text">{image}</p>
                                <UpdateTripForm submit={this.updateTrip} trip={{ name, description, status, image, dateStart, dateEnd }} />
                                <h5>Cohorts</h5>
                                <CohortList cohorts={this.props.currentTrip.cohorts}></CohortList>
                                <h5>Add a cohort</h5>
                                <CohortForm submit={this.addCohort}></CohortForm>
                            </div>
                        </div>
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
