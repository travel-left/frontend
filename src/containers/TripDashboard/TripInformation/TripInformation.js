import React, { Component } from 'react'
import Alert from '../../../components/Other/Alert'
import DashboardHeader from '../../../components/Other/DashboardHeader'
import UpdateTripForm from './UpdateTripForm'
import { connect } from 'react-redux'
import { setCurrentTrip } from '../../../store/actions/trip'
import { apiCall } from '../../../util/api'
import Moment from 'react-moment'

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
                this.setState({ ...data.trip })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        let { name, description, status, image, dateStart, dateEnd } = this.props.currentTrip

        return (
            <div>
                <div className="row">
                    <div className="col-12">
                        <Alert text="This is where all the general information about your trip will live! See statistics and update the info on the right." />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <DashboardHeader title="Trip Information" description="Edit your trip information here" />
                        <div class="card shadow border-0 mb-3">
                            <div class="card-body">
                                <h2 className="card-title text-primary">
                                    {name}{' '}
                                    <span className="float-right h5 text-dark">
                                        <Moment date={dateStart} format="MMM Do" /> - <Moment date={dateEnd} format="MMM Do" />
                                    </span>
                                </h2>
                                <h5>Status</h5> <span class="badge badge-primary badge-pill">{status} </span> <br />
                                <h5>Description</h5> <p class="card-text">{description}</p>
                                <h5>Image link</h5>
                                <p class="card-text">{image}</p>
                                <UpdateTripForm submit={this.updateTrip} trip={{ name, description, status, image, dateStart, dateEnd }} />
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
