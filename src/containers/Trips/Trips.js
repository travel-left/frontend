import React, { Component } from 'react'
import { apiCall } from '../../util/api'
import { connect } from 'react-redux'
import { setCurrentTrip } from '../../store/actions/trip'
import TripForm from '../../components/Trips/TripForm'
import './Trip.css'
import Alert from '../../components/Other/Alert'
import TripList from '../../components/Trips/TripList'
import TripInfo from '../../components/Trips/TripInfo'

class Trips extends Component {
    state = {
        trips: [],
        showTrips: false,
        showTripForm: false,
        showNewTripButton: true,
        selectedTrip: {}
    }

    constructor(props) {
        super(props)
        apiCall('get', '/api/trips').then(data => {
            return this.setState({
                trips: data.trips,
                showTrips: data.trips.length > 0,
                selectedTrip: data.trips[0]
            })
        })
    }

    selectTrip = tripId => {
        this.props.setCurrentTrip(this.state.trips.filter(t => t._id == tripId)[0])
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
        let { user } = this.props
        let { showTrips, showTripForm, trips, selectedTrip } = this.state

        let tripList = showTrips ? <TripList trips={trips} setSelectedTrip={this.setSelectedTrip} /> : null
        let tripInfo = showTrips ? <TripInfo id={selectedTrip._id} status={selectedTrip.status} image={selectedTrip.image} descrption={selectedTrip.description} name={selectedTrip.name} date={selectedTrip.dateStart} edit={this.selectTrip} /> : null
        let newTripButton = (
            <button style={{ marginTop: '50px', marginBottom: '50px' }} onClick={this.showTripForm} class="btn-lg btn-square dark">
                ADD NEW TRIP
            </button>
        )
        let tripForm = showTripForm ? <TripForm submit={this.addTrip} hide={this.hideTripForm} /> : null

        return (
            <div className="row">
                <div className="col-md-2 shadow-lg">
                    <div className="row">
                        <div className="col d-flex justify-content-center">
                            {newTripButton}
                        </div>
                    </div>
                    <div className="row trips-side-bar">
                        <div className="col px-0">
                            <ul class="list-group pl-3">
                                <LeftBarItem text='All Trips' total='18' active={true}></LeftBarItem>
                                <LeftBarItem text='Active Trips' total='14' active={false} ></LeftBarItem>
                                <LeftBarItem text='Planned Trips' total='1' active={false}></LeftBarItem>
                                <LeftBarItem text='Past Trips' total='3' active={false}></LeftBarItem>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-10">
                    <div className="row">
                        <div className="col-12">
                            <Alert text='Welcome to left. Choose "add new trip" to get started. Feel free to contact us at support@travel-left.com if you have questions.' />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-8">
                            <div className="">
                                <div className="card trip-list-header" style={{ height: '50px', justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', boxShadow: 'rgb(136, 136, 136) 0px 2px 4px', marginBottom: '20px' }}>
                                    <div className="col-1" />
                                    <div className="col-2" style={{ borderBottom: '2px solid #0F61D8' }}>
                                        Trip Name
                                    </div>
                                    <div className="col-3" />
                                    <div className="col-2">Date</div>
                                    <div className="col-2">Status</div>
                                </div>
                                {tripList}
                            </div>
                        </div>
                        <div className="col-4" style={{ backgroundColor: '#FBFBFB', height: '100vh', boxShadow: 'rgb(136, 136, 136) 0px 2px 4px' }}>
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
    let classes = 'list-group-item d-flex justify-content-between align-items-center border-right-0 border-left-0'
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