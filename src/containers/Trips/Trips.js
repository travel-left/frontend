import React, { Component } from 'react'
import { apiCall } from '../../util/api'
import { connect } from 'react-redux'
import { setCurrentTrip } from '../../store/actions/trip'
import TripForm from '../../components/Trips/TripForm'
import Alert from '../../components/Other/Alert'
import TripList from '../../components/Trips/TripList'
import TripInfo from '../../components/Trips/TripInfo'

class Trips extends Component {
    state = {
        trips: [],
        showTrips: false,
        showTripForm: false,
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
        let selectedTrip = this.state.trips.filter(t => t._id == tripId)[0]

        this.props.setCurrentTrip(selectedTrip)
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
        trip.status = 'planning'
        apiCall('post', '/api/trips', trip) // Create Trip
            .then(data => {
                trip._id = data._id
                return this.setState(prevState => {
                    return {
                        trips: [...prevState.trips, trip],
                        showTripForm: false,
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
        let { showTrips, showTripForm, trips, selectedTrip } = this.state

        let tripList = showTrips ? <TripList trips={trips} setSelectedTrip={this.setSelectedTrip} /> : null
        let tripInfo = showTrips ? <TripInfo id={selectedTrip._id} status={selectedTrip.status} image={selectedTrip.image} descrption={selectedTrip.description} name={selectedTrip.name} date={selectedTrip.dateStart} edit={this.selectTrip} /> : null
        let tripForm = showTripForm ? <TripForm submit={this.addTrip} hide={this.hideTripForm} /> : null

        return (
            <div className="row">
                <div className="col-md-2 shadow-lg">
                    <div className="row">
                        <div className="col px-0 py-5 d-flex justify-content-center">
                            <button onClick={this.showTripForm} class="btn btn-lg btn-primary">
                                ADD NEW TRIP
                            </button>
                        </div>
                    </div>
                    <div className="row trips-side-bar bg-light">
                        <div className="col px-0">
                            <ul class="list-group ">
                                <LeftBarItem text='All Trips' total='18' active={true}></LeftBarItem>
                                <LeftBarItem text='Active Trips' total='14' active={false} ></LeftBarItem>
                                <LeftBarItem text='Planned Trips' total='1' active={false}></LeftBarItem>
                                <LeftBarItem text='Past Trips' total='3' active={false}></LeftBarItem>
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
                        <div className="col-md-4 shadow px-0">
                            {tripForm || tripInfo}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    null,
    { setCurrentTrip }
)(Trips)

const LeftBarItem = ({text, total, active}) => {
    let classes = 'list-group-item d-flex justify-content-between align-items-center border-right-0 border-left-0 '
    if(active){
        classes += ' active'
    }
    return (
        <a href="#" class={classes}>
            {text}
            <span class="badge badge-primary badge-pill">{total}</span>
        </a>
    )
}