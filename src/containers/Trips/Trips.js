import React, { Component } from 'react'
import { apiCall } from '../../util/api'
import { connect } from 'react-redux'
import { handleSetCurrentTrip } from '../../store/actions/trip'
import Alert from '../../components/Other/Alert'
import TripList from '../../components/Trips/TripList'
import TripInfo from '../../components/Trips/TripInfo'
import { handleSetCurrentCohort } from '../../store/actions/cohort'
import AddTrip from '../../components/Trips/AddTrip'

class Trips extends Component {
    state = {
        trips: [],
        showTrips: false,
        selectedTrip: {}
    }

    constructor(props) {
        super(props)
        apiCall('get', '/api/trips/').then(trips => {
            return this.setState({
                trips: trips,
                showTrips: trips ? true : false,
                selectedTrip: trips ? trips[0] : null
            })
        })
    }

    selectTrip = tripId => {
        let selectedTrip = this.state.trips.filter(t => t._id === tripId)[0]

        this.props.handleSetCurrentTrip(selectedTrip).then(() => {
            return this.props.handleSetCurrentCohort(selectedTrip._id, selectedTrip.cohorts[0])
        }).then(() => {
            return this.props.history.push(`/trips/${tripId}/edit`)
        })
    }

    showTripForm = () => {
        this.setState({
            showTripForm: true
        })
    }

    hideTripForm = () => {
        this.setState({
            showTripForm: false
        })
    }

    addTrip = trip => {
        trip.status = 'PLANNING'
        apiCall('post', '/api/trips', trip) // Create Trip
            .then(data => {
                trip._id = data._id
                return this.setState(prevState => {
                    return {
                        trips: [...prevState.trips, trip],
                        selectedTrip: trip
                    }
                })
            })
    }

    setSelectedTrip = tripId => {
        this.setState({
            selectedTrip: this.state.trips.filter(t => t._id == tripId)[0]
        })
    }

    render() {
        let { showTrips, trips, selectedTrip } = this.state
        let tripList = showTrips ? <TripList trips={trips} setSelectedTrip={this.setSelectedTrip} /> : null
        let tripInfo = showTrips ? <TripInfo trip={selectedTrip} edit={this.selectTrip} /> : null

        return (
            <div className="row">
                <div className="col-md-2 shadow-lg">
                    <div className="row">
                        <div className="col px-0 py-5 d-flex justify-content-center">
                            <AddTrip submit={this.addTrip} />
                        </div>
                    </div>
                    <div className="row trips-side-bar bg-light">
                        <div className="col px-0">
                            <ul class="list-group ">
                                <LeftBarItem text="All Trips" total="18" active={true} />
                                <LeftBarItem text="Active Trips" total="14" active={false} />
                                <LeftBarItem text="Planned Trips" total="1" active={false} />
                                <LeftBarItem text="Past Trips" total="3" active={false} />
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-md-10">
                    <div className="row">
                        <div className="col-md-12 d-none d-md-block">
                            <Alert text='Welcome to left. Choose "add new trip" to get started. Feel free to contact us at support@travel-left.com if you have questions.' />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8 px-0 px-md-3">
                            <div className="card trip-list-header shadow d-none d-md-flex flex-row justify-content-around py-3 mb-3 font-weight-bold">
                                <div className="col-md-2 offset-md-2 border-bottom border-primary"> Trip</div>
                                <div className="col-md-3 offset-md-2">Date</div>
                                <div className="col-md-3">Status</div>
                            </div>
                            {tripList}
                        </div>
                        <div className="col-md-4 shadow px-0">{tripInfo}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    null,
    { handleSetCurrentTrip, handleSetCurrentCohort }
)(Trips)

const LeftBarItem = ({ text, total, active }) => {
    let classes = 'list-group-item d-flex justify-content-between align-items-center border-right-0 border-left-0 '
    if (active) {
        classes += ' active'
    }
    return (
        <a href="#" class={classes}>
            {text}
            <span class="badge badge-primary badge-pill">{total}</span>
        </a>
    )
}
