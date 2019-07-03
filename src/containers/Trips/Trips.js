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
        filteredTrips: [],
        filter: 'All Trips',
        showTrips: false,
        selectedTrip: {},
        statusCounts: {
            ACTIVE: 0,
            PLANNED: 0,
            PLANNING: 0,
            PAST: 0
        }
    }

    constructor(props) {
        super(props)
        apiCall('get', '/api/trips/').then(trips => {
            let newStatusCount = { ...this.state.statusCounts }

            trips.forEach(trip => {
                newStatusCount[trip.status]++
            })
            return this.setState({
                trips: trips,
                filteredTrips: trips,
                showTrips: trips && trips.length > 0 ? true : false,
                selectedTrip: trips ? trips[0] : null,
                statusCounts: newStatusCount
            })
        })
    }

    selectTrip = tripId => {
        let selectedTrip = this.state.trips.filter(t => t._id === tripId)[0]

        this.props
            .handleSetCurrentTrip(selectedTrip)
            .then(() => {
                return this.props.handleSetCurrentCohort(selectedTrip._id, selectedTrip.cohorts[0])
            })
            .then(() => {
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
            selectedTrip: this.state.trips.filter(t => t._id == tripId)[0]
        })
    }

    onSideNavClick = e => {
        e.preventDefault()
        let { filteredTrips, trips } = this.state
        filteredTrips = e.target.name === 'All Trips' ? trips : trips.filter(t => t.status === e.target.name.toUpperCase())
        this.setState({ filteredTrips, filter: e.target.name })
    }

    render() {
        let { showTrips, filteredTrips, selectedTrip, trips, statusCounts, filter } = this.state
        let tripList = showTrips ? <TripList trips={filteredTrips} setSelectedTrip={this.setSelectedTrip} doubleClick={this.selectTrip} /> : null
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
                                <LeftBarItem text="All Trips" total={trips.length} active={filter === 'All Trips'} handleClick={this.onSideNavClick} />
                                <LeftBarItem text="Active" total={statusCounts.ACTIVE} active={filter === 'Active'} handleClick={this.onSideNavClick} />
                                <LeftBarItem text="Planned" total={statusCounts.PLANNED} active={filter === 'Planned'} handleClick={this.onSideNavClick} />
                                <LeftBarItem text="Planning" total={statusCounts.PLANNING} active={filter === 'Planning'} handleClick={this.onSideNavClick} />
                                <LeftBarItem text="Past" total={statusCounts.PAST} active={filter === 'Past'} handleClick={this.onSideNavClick} />
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

const LeftBarItem = ({ text, total, active, handleClick }) => {
    let classes = 'list-group-item d-flex justify-content-between align-items-center border-right-0 border-left-0 '
    if (active) {
        classes += ' active'
    }
    return (
        <a href="" className={classes} onClick={handleClick} name={text}>
            {text}
            <span className="badge badge-primary badge-pill">{total}</span>
        </a>
    )
}
