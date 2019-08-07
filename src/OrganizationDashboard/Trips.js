import React, { Component } from 'react'
import { apiCall } from '../util/api'
import { connect } from 'react-redux'
// import Alert from '../util/otherComponents/Alert'
import TripList from './TripList'
import TripInfo from './TripInfo'
import { setCurrentTrip } from '../util/redux/actions/trip'
import AddTrip from './AddTrip'
import SideNavItem from '../util/otherComponents/SideNavItem'

class Trips extends Component {
    state = {
        trips: [],
        filteredTrips: [],
        filter: 'All Trips',
        selectedTrip: null,
        tripStatusCounts: {
            LEFT: 0,
            COMPLETED: 0,
            PLANNING: 0,
            PAST: 0,
            ARCHIVED: 0
        }
        // showAlert: this.props.currentUser.showAlerts.trips
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
        const { tripStatusCounts } = this.state
        for (const trip of trips) {
            tripStatusCounts[trip.status]++
        }
        this.filterTripsAndSetState(trips, 'ALL TRIPS', {
            tripStatusCounts
        })
    }

    editTrip = async tripId => {
        const [selectedTrip] = this.state.trips.filter(t => t._id === tripId)

        await this.props.setCurrentTrip(selectedTrip)
        this.props.history.push(`/trips/${tripId}/edit`)
    }

    // closeAlert = () => {
    //     const { _id } = this.props.currentUser
    //     this.setState({
    //         showAlert: false
    //     })
    //     apiCall('put', `/api/coordinators/${_id}`, {
    //         showAlerts: { trips: false }
    //     })
    // }

    addTrip = async trip => {
        const createdTrip = await apiCall('post', '/api/trips', trip)
        const { trips, filter, tripStatusCounts } = this.state
        trips.push(createdTrip)
        tripStatusCounts[createdTrip.status]++
        this.filterTripsAndSetState(trips, filter, {
            trips: trips,
            selectedTrip: createdTrip,
            tripStatusCounts
        })
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
        this.setState({
            selectedTrip: newSelection
        })
    }

    onSideNavClick = e => {
        e.preventDefault()
        const filter = e.target.name.toUpperCase()
        this.filterTripsAndSetState(this.state.trips, filter)
    }

    filterTripsAndSetState = (trips, filter, state = {}) => {
        const filteredTrips =
            filter === 'ALL TRIPS'
                ? trips.filter(t => t.status !== 'ARCHIVED')
                : trips.filter(t => t.status === filter)
        this.setState({
            trips,
            filteredTrips,
            filter,
            ...state,
            selectedTrip: trips[0]
        })
    }

    render() {
        let {
            filteredTrips,
            selectedTrip,
            trips,
            tripStatusCounts,
            filter
        } = this.state

        const showTrips = filteredTrips.length > 0

        let tripList = showTrips ? (
            <TripList
                trips={filteredTrips}
                setSelectedTrip={this.setSelectedTrip}
                doubleClick={this.editTrip}
            />
        ) : null

        let tripInfo = selectedTrip ? (
            <div className="col-md-4 shadow px-0 bg-light">
                <TripInfo
                    trip={selectedTrip}
                    edit={this.editTrip}
                    duplicateTrip={this.addTrip}
                    archiveTrip={this.archiveTrip}
                />
            </div>
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
                                <SideNavItem
                                    text="All Trips"
                                    total={
                                        trips.length - tripStatusCounts.ARCHIVED
                                    }
                                    active={filter === 'ALL TRIPS'}
                                    handleClick={this.onSideNavClick}
                                />
                                <SideNavItem
                                    text="Planning"
                                    total={tripStatusCounts.PLANNING}
                                    active={filter === 'PLANNING'}
                                    handleClick={this.onSideNavClick}
                                />
                                <SideNavItem
                                    text="Completed"
                                    total={tripStatusCounts.COMPLETED}
                                    active={filter === 'COMPLETED'}
                                    handleClick={this.onSideNavClick}
                                />
                                <SideNavItem
                                    text="LEFT"
                                    total={tripStatusCounts.LEFT}
                                    active={filter === 'LEFT'}
                                    handleClick={this.onSideNavClick}
                                />
                                <SideNavItem
                                    text="Past"
                                    total={tripStatusCounts.PAST}
                                    active={filter === 'PAST'}
                                    handleClick={this.onSideNavClick}
                                />
                                <SideNavItem
                                    text="Archived"
                                    total={tripStatusCounts.ARCHIVED}
                                    active={filter === 'ARCHIVED'}
                                    handleClick={this.onSideNavClick}
                                />
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-md-10 mt-3">
                    {/* <div className="row">
                        <div className="col-md-12 d-none d-md-block">
                            {alert}
                        </div>
                    </div> */}
                    <div className="row">
                        <div className="col-md-8 px-0 px-md-3">
                            <div className="card shadow d-none d-md-flex flex-row justify-content-around py-3 mb-3 font-weight-bold align-items-center">
                                <div className="col-md-3 border-bottom-5 border-primary text-uppercase ml-5">
                                    TRIP NAME
                                </div>
                                <div className="col-md-4" />
                                <div className="col-md-2 offset-md-1 text-uppercase text-dark">
                                    Date
                                </div>
                                <div className="col-md-2 text-uppercase text-dark">
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
