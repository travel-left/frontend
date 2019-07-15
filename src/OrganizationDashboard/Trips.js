import React, { Component } from 'react'
import { apiCall } from '../util/api'
import { connect } from 'react-redux'
import { setCurrentTrip } from '../redux/actions/trip'
import Alert from '../OtherComponents/Alert'
import TripList from './TripList'
import TripInfo from './TripInfo'
import { handleSetCurrentCohort } from '../redux/actions/cohort'
import AddTrip from './AddTrip'

class Trips extends Component {
    state = {
        trips: [],
        filteredTrips: [],
        filter: 'All Trips',
        showTrips: false,
        selectedTrip: {},
        tripStatusCounts: {
            ACTIVE: 0,
            PLANNED: 0,
            PLANNING: 0,
            PAST: 0
        },
        travelers: [],
        travelerStatusCounts: {
            INVITED: 0,
            CONFIRMED: 0
        },
        showAlert: false
    }

    constructor(props) {
        super(props)
        this.getShowAlertAndSetState()
        this.getAllTripsAndSetState()
    }

    getShowAlertAndSetState = async () => {
        const { coordinatorId } = this.props
        const coordinator = await apiCall('get', `/api/coordinators/${coordinatorId}`)
        if (coordinator.showAlerts.trips === 'true') {
            this.setState({
                showAlert: true
            })
        }
    }

    getAllTripsAndSetState = async () => {
        const trips = await apiCall('get', '/api/trips')
        let newStatusCount = { ...this.state.tripStatusCounts }
        trips.forEach(trip => {
            newStatusCount[trip.status]++
        })
        this.setState({
            trips: trips,
            filteredTrips: trips,
            showTrips: trips && trips.length > 0 ? true : false,
            selectedTrip: trips ? trips[0] : null,
            tripStatusCounts: newStatusCount
        })
        this.setSelectedTrip(trips[0]._id)
    }

    selectTrip = async tripId => {
        const [selectedTrip] = this.state.trips.filter(t => t._id === tripId)

        await this.props.setCurrentTrip(selectedTrip)
        //setting the cohort to be the all travelers cohort
        await this.props.handleSetCurrentCohort(selectedTrip._id, selectedTrip.cohorts[0])
        this.props.history.push(`/trips/${tripId}/edit`)
    }

    showTripForm = () => {
        this.setState({
            showTripForm: true
        })
    }

    closeAlert = async () => {
        const { coordinatorId } = this.props
        await apiCall('put', `/api/coordinators/${coordinatorId}`, { showAlerts: { trips: false } })
        this.setState({
            showAlert: false
        })
    }

    hideTripForm = () => {
        this.setState({
            showTripForm: false
        })
    }

    addTrip = async trip => {
        console.log(trip)
        await apiCall('post', '/api/trips', trip)
        this.getAllTripsAndSetState()
    }

    setSelectedTrip = async tripId => {
        const travelers = await apiCall('get', `/api/trips/${tripId}/travelers`)
        this.setState({
            selectedTrip: this.state.trips.filter(t => t._id === tripId)[0]
        })
        let newStatusCountT = { ...this.state.travelerStatusCounts }
        travelers.forEach(traveler => {
            newStatusCountT[traveler.status]++
        })
        this.setState({ travelers, travelerStatusCounts: newStatusCountT })
    }

    onSideNavClick = e => {
        e.preventDefault()
        let { filteredTrips, trips } = this.state
        filteredTrips = e.target.name === 'All Trips' ? trips : trips.filter(t => t.status === e.target.name.toUpperCase())
        this.setState({ filteredTrips, filter: e.target.name })
    }

    render() {
        let { showTrips, filteredTrips, selectedTrip, trips, tripStatusCounts, travelerStatusCounts, filter, showAlert } = this.state
        let tripList = showTrips ? <TripList trips={filteredTrips} setSelectedTrip={this.setSelectedTrip} doubleClick={this.selectTrip} /> : null
        let tripInfo = showTrips ? <TripInfo trip={selectedTrip} edit={this.selectTrip} statusCounts={travelerStatusCounts} /> : null
        let alert = showAlert ? <Alert text='Welcome to left. Choose "add new trip" to get started. Feel free to contact us at support@travel-left.com if you have questions.' closeAlert={this.closeAlert} /> : null

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
                            <ul className="list-group ">
                                <LeftBarItem text="All Trips" total={trips.length} active={filter === 'All Trips'} handleClick={this.onSideNavClick} />
                                <LeftBarItem text="Active" total={tripStatusCounts.ACTIVE} active={filter === 'Active'} handleClick={this.onSideNavClick} />
                                <LeftBarItem text="Planned" total={tripStatusCounts.PLANNED} active={filter === 'Planned'} handleClick={this.onSideNavClick} />
                                <LeftBarItem text="Planning" total={tripStatusCounts.PLANNING} active={filter === 'Planning'} handleClick={this.onSideNavClick} />
                                <LeftBarItem text="Past" total={tripStatusCounts.PAST} active={filter === 'Past'} handleClick={this.onSideNavClick} />
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-md-10">
                    <div className="row">
                        <div className="col-md-12 d-none d-md-block">{alert}</div>
                    </div>
                    <div className="row">
                        <div className="col-md-8 px-0 px-md-3">
                            <div className="card shadow d-none d-md-flex flex-row justify-content-around py-3 mb-3 font-weight-bold align-items-center">
                                <div className="col-md-3 border-bottom border-primary text-uppercase ml-5"> Trip</div>
                                <div className="col-md-4" />
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

const mapStateToProps = state => {
    const { currentUser } = state
    return { coordinatorId: currentUser.user._id }
}

export default connect(
    mapStateToProps,
    { setCurrentTrip, handleSetCurrentCohort }
)(Trips)

const LeftBarItem = ({ text, total, active, handleClick }) => {
    let classes = 'list-group-item d-flex justify-content-between align-items-center border-right-0 border-left-0 '
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
