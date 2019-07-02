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
        this.getAllTripsAndSetState()
    }

    getAllTripsAndSetState = async () => {
        const trips = await apiCall('get', '/api/trips')
        this.setState({
            trips: trips,
            showTrips: trips && trips.length > 0 ? true : false,
            selectedTrip: trips ? trips[0] : null
        })
    }

    selectTrip = async tripId => {
        const [selectedTrip] = this.state.trips.filter(t => t._id === tripId)

        await this.props.handleSetCurrentTrip(selectedTrip)

        const [allTripCohort] = selectedTrip.cohorts

        let atcId = allTripCohort

        // Sometimes these are filled out, sometimes not - this works either way
        if (allTripCohort._id) {
            atcId = allTripCohort._id
        }

        await this.props.handleSetCurrentCohort(selectedTrip._id, atcId)
        this.props.history.push(`/trips/${tripId}/edit`)
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
        apiCall('post', '/api/trips', trip).then(data => {
            trip._id = data._id
            console.log(trip)
            return this.setState(prevState => {
                return {
                    trips: [...prevState.trips, trip],
                    selectedTrip: trip,
                    showTrips: true
                }
            })
        })
    }

    setSelectedTrip = tripId => {
        this.setState({
            selectedTrip: this.state.trips.filter(t => t._id === tripId)[0]
        })
    }

    render() {
        let { showTrips, trips, selectedTrip } = this.state
        let tripList = showTrips ? <TripList trips={trips} setSelectedTrip={this.setSelectedTrip} doubleClick={this.selectTrip} /> : null
        let tripInfo = showTrips ? <TripInfo trip={selectedTrip} edit={this.selectTrip} /> : null

        return (
            <div className="row">
                <div className="col-md-2 border-right shadow">
                    <div className="row">
                        <div className="col px-0 py-5 d-flex justify-content-center">
                            <AddTrip submit={this.addTrip} />
                        </div>
                    </div>
                    <div className="row trips-side-bar bg-light" style={{ minHeight: '80vh' }}>
                        <div className="col px-0">
                            <ul class="list-group ">
                                <LeftBarItem text="All Trips" total="18" active={true} />
                                <LeftBarItem text="Active Trips" total="14" active={false} />
                                <LeftBarItem text="Planned Trips" total="1" active={false} />
                                <LeftBarItem text="Planning" total="" active={false} />
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
                            <div className="card shadow d-none d-md-flex flex-row justify-content-around py-3 mb-3 font-weight-bold align-items-center">
                                <div className="col-md-3 border-bottom border-primary text-uppercase ml-5"> Trip</div>
                                <div className="col-md-4"></div>
                                <div className="col-md-2 offset-md-1 text-uppercase">Date</div>
                                <div className="col-md-2 text-uppercase">Status</div>
                            </div>
                            {tripList}
                        </div>
                        <div className="col-md-4 shadow px-0 bg-light">{tripInfo}</div>
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
            <span class="badge badge-primary badge-pill">{!active && total}</span>
        </a>
    )
}
