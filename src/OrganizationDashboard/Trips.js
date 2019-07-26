import React, { Component } from 'react'
import { apiCall } from '../util/api'
import { connect } from 'react-redux'
import Alert from '../util/otherComponents/Alert'
import TripList from './TripList'
import TripInfo from './TripInfo'
import { setCurrentTrip } from '../util/redux/actions/trip'
import AddTrip from './AddTrip'

class Trips extends Component {
    state = {
        trips: [],
        filteredTrips: [],
        filter: 'All Trips',
        selectedTrip: null,
        tripStatusCounts: {
            ACTIVE: 0,
            PLANNED: 0,
            PLANNING: 0,
            PAST: 0,
            ARCHIVED: 0
        },
        travelers: [],
        travelerStatusCounts: {
            INVITED: 0,
            CONFIRMED: 0
        },
        showAlert: this.props.currentUser.showAlerts.trips
    }

    constructor(props) {
        super(props)
        this.getAllTripsAndSetState()
    }

    getAllTripsAndSetState = async () => {
        const trips = await apiCall('get', '/api/trips')
        this.setStatusesAndState(trips)
    }

    setStatusesAndState = trips => {
        const newStatusCount = { ...this.state.tripStatusCounts }
        trips.forEach(trip => {
            newStatusCount[trip.status]++
        })
        this.filterTripsAndSetState(trips, 'All Trips', {
            tripStatusCounts: newStatusCount
        })
    }

    editTrip = async tripId => {
        const [selectedTrip] = this.state.trips.filter(t => t._id === tripId)

        await this.props.setCurrentTrip(selectedTrip)
        this.props.history.push(`/trips/${tripId}/edit`)
    }

    closeAlert = () => {
        const { _id } = this.props.currentUser
        this.setState({
            showAlert: false
        })
        apiCall('put', `/api/coordinators/${_id}`, {
            showAlerts: { trips: false }
        })
    }

    addTrip = async trip => {
        let createdTrip = await apiCall('post', '/api/trips', trip)
        const { trips, filteredTrips, filter } = this.state
        trips.push(createdTrip)

        if (createdTrip.status === filter || filter === 'All Trips') {
            filteredTrips.push(createdTrip)
        }
        let newStatusCount = { ...this.state.tripStatusCounts }
        newStatusCount[createdTrip.status]++
        this.setState({
            trips: trips,
            filteredTrips: filteredTrips,
            selectedTrip: createdTrip,
            tripStatusCounts: newStatusCount
        })
        this.setSelectedTrip(createdTrip._id)
    }

    archiveTrip = async id => {
        const { trips, filter } = this.state
        const updatedTrip = await apiCall('put', `/api/trips/${id}`, {
            status: 'ARCHIVED'
        })
        const updatedIndex = trips.findIndex(e => e._id.toString() === id)
        const { status } = trips[updatedIndex]
        trips[updatedIndex] = updatedTrip
        const newStatusCount = { ...this.state.tripStatusCounts }
        newStatusCount.ARCHIVED++
        newStatusCount[status]--
        this.setState({ trips })
        this.filterTripsAndSetState(trips, filter, {
            tripStatusCounts: newStatusCount
        })
    }

    setSelectedTrip = tripId => {
        let newSelection = this.state.trips.filter(t => t._id === tripId)[0]
        let newStatusCountT = { ...this.state.travelerStatusCounts }
        newSelection.travelers.forEach(traveler => {
            newStatusCountT[traveler.status]++
        })
        this.setState({
            selectedTrip: newSelection,
            travelerStatusCounts: newStatusCountT
        })
    }

    onSideNavClick = e => {
        e.preventDefault()
        const filter = e.target.name.toUpperCase()
        this.filterTripsAndSetState(this.state.trips, filter)
    }

    filterTripsAndSetState = (trips, filter, state = {}) => {
        const filteredTrips =
            filter === 'All Trips'
                ? trips.filter(t => t.status !== 'ARCHIVED')
                : trips.filter(t => t.status === filter)
        this.setState({ trips, filteredTrips, filter, ...state })
    }

    render() {
        let {
            filteredTrips,
            selectedTrip,
            trips,
            tripStatusCounts,
            travelerStatusCounts,
            filter,
            showAlert
        } = this.state

        const showTrips = filteredTrips.length > 0

        let tripList = showTrips ? (
            <TripList
                trips={filteredTrips}
                setSelectedTrip={this.setSelectedTrip}
                doubleClick={this.editTrip}
            />
        ) : null
        const selectedTripClass = selectedTrip ? 'col-md-8' : 'col-12'
        let tripInfo = selectedTrip ? (
            <div className="col-md-4 shadow px-0 bg-light">
                <TripInfo
                    trip={selectedTrip}
                    edit={this.editTrip}
                    statusCounts={travelerStatusCounts}
                    duplicateTrip={this.addTrip}
                    archiveTrip={this.archiveTrip}
                />
            </div>
        ) : null
        let alert = showAlert ? (
            <Alert
                text='Welcome to left. Choose "add new trip" to get started. Feel free to contact us at support@travel-left.com if you have questions.'
                closeAlert={this.closeAlert}
            />
        ) : null

        return (
            <div className="row">
                <div className="col-md-2 border-right shadow">
                    <div className="row">
                        <div className="col px-0 py-5 d-flex justify-content-center">
                            <AddTrip submit={this.addTrip} />
                        </div>
                    </div>
                    <div
                        className="row trips-side-bar bg-light"
                        style={{ minHeight: '80vh' }}
                    >
                        <div className="col px-0">
                            <ul className="list-group ">
                                <LeftBarItem
                                    text="All Trips"
                                    total={trips.length}
                                    active={filter === 'All Trips'}
                                    handleClick={this.onSideNavClick}
                                />
                                <LeftBarItem
                                    text="Active"
                                    total={tripStatusCounts.ACTIVE}
                                    active={filter === 'Active'}
                                    handleClick={this.onSideNavClick}
                                />
                                <LeftBarItem
                                    text="Planned"
                                    total={tripStatusCounts.PLANNED}
                                    active={filter === 'Planned'}
                                    handleClick={this.onSideNavClick}
                                />
                                <LeftBarItem
                                    text="Planning"
                                    total={tripStatusCounts.PLANNING}
                                    active={filter === 'Planning'}
                                    handleClick={this.onSideNavClick}
                                />
                                <LeftBarItem
                                    text="Past"
                                    total={tripStatusCounts.PAST}
                                    active={filter === 'Past'}
                                    handleClick={this.onSideNavClick}
                                />
                                <LeftBarItem
                                    text="Archived"
                                    total={tripStatusCounts.ARCHIVED}
                                    active={filter === 'Archived'}
                                    handleClick={this.onSideNavClick}
                                />
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-md-10">
                    <div className="row">
                        <div className="col-md-12 d-none d-md-block">
                            {alert}
                        </div>
                    </div>
                    <div className="row">
                        <div className={`${selectedTripClass} px-0 px-md-3`}>
                            <div className="card shadow d-none d-md-flex flex-row justify-content-around py-3 mb-3 font-weight-bold align-items-center">
                                <div className="col-md-3 border-bottom border-primary text-uppercase ml-5">
                                    {' '}
                                    Trip
                                </div>
                                <div className="col-md-4" />
                                <div className="col-md-2 offset-md-1 text-uppercase">
                                    Date
                                </div>
                                <div className="col-md-2 text-uppercase">
                                    Status
                                </div>
                            </div>
                            {tripList}
                        </div>
                        {tripInfo}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStatetoProps = state => {
    return {
        currentUser: state.currentUser
    }
}

export default connect(
    mapStatetoProps,
    { setCurrentTrip }
)(Trips)

const LeftBarItem = ({ text, total, active, handleClick }) => {
    let classes =
        'list-group-item d-flex justify-content-between align-items-center border-right-0 border-left-0 '
    if (active) {
        classes += ' active'
    }
    return (
        <a href="/" className={classes} onClick={handleClick} name={text}>
            {text}
            <span className="badge badge-primary badge-pill">{total}</span>
        </a>
    )
}
