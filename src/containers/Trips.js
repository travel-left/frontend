import React, { Component } from 'react'
import { apiCall } from '../services/api'
import { connect } from 'react-redux'
import { setCurrentTrip } from '../store/actions/trip';
import TripForm from '../components/Trips/TripForm';
import './Trip.css'
import Alert from '../components/Other/Alert';
import TripList from '../components/Trips/TripList';
import TripInfo from '../components/Trips/TripInfo';

class Trips extends Component {
    state = {
        trips: [],
        showTrips: false,
        showTripForm: false,
        showNewTripButton: true,
        selectedTrip: {}
    }
    
    constructor(props){
        super(props)
        apiCall('get', `/api/users/${this.props.user._id}/trips`)
        .then(data => {
            return this.setState({
                trips: data.trips,
                showTrips: data.trips.length > 0,
                selectedTrip: data.trips[0]
            })
        })
    }

    selectTrip = tripId => {
        this.props.setCurrentTrip(
            this.state.trips.filter(t => t._id == tripId)[0]
        )
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
        apiCall('post', `/api/trip/${this.props.user._id}`, trip)
        .then(data => {
            return this.setState(prevState => {
                return {
                    trips: [
                        ...prevState.trips,
                        data.trip
                    ],
                    showTripForm: false,
                    selectedTrip: data.trip
                }
            })
        })
    }

    setSelectedTrip = tripId => {
        this.setState({
            selectedTrip: this.state.trips.filter(t => t._id == tripId)[0]
        })
    }

    render(){
        let { user } = this.props
        let { showTrips, showTripForm, trips, selectedTrip } = this.state

        let tripList = showTrips ? <TripList trips={trips} setSelectedTrip={this.setSelectedTrip}/> : null
        let tripInfo = showTrips ? <TripInfo id={selectedTrip._id} status={selectedTrip.status} image={selectedTrip.image} descrption={selectedTrip.description} name={selectedTrip.name} date={selectedTrip.dateStart} edit={this.selectTrip}/> : null
        let newTripButton = <button style={{marginTop: '50px', marginBottom: '50px'}} onClick={this.showTripForm} class='btn-lg btn-square dark'>ADD NEW TRIP</button>
        let tripForm = showTripForm ? <TripForm submit={this.addTrip} hide={this.hideTripForm} /> : null

        return (
            <div className="row">
                <div className="col-2" style={{padding: '0px 0px 30px 0px', backgroundColor: 'white', height: '100vh', boxShadow: 'rgb(136, 136, 136) 1px 0px 20px'}} >
                    <div className='row' style={{justifyContent: 'center'}}>
                        {newTripButton}
                    </div>
                    <div className='trips-side-bar'>
                        <ul class="list-group">
                            <a href='#' class="list-group-item list-group-item-action active justify-content-between align-items-center">
                                All Trips
                            </a>
                            <a href='#' class="list-group-item d-flex justify-content-between align-items-center" style={{borderRight: 'none', borderLeft: 'none'}}>
                                Active Trips
                                <span class="badge badge-primary badge-pill">14</span>
                            </a>
                            <a href='#' class="list-group-item d-flex justify-content-between align-items-center" style={{borderRight: 'none', borderLeft: 'none'}}>
                                Planned Trips
                                <span class="badge badge-primary badge-pill">2</span>
                            </a>
                            <a href='#' class="list-group-item d-flex justify-content-between align-items-center" style={{borderRight: 'none', borderLeft: 'none'}}>
                                Planning Trips
                                <span class="badge badge-primary badge-pill">1</span>
                            </a>
                            <a href='#' class="list-group-item d-flex justify-content-between align-items-center" style={{borderRight: 'none', borderLeft: 'none'}}>
                                Past Trips
                                <span class="badge badge-primary badge-pill">1</span>
                            </a>
                        </ul>
                    </div>
                </div>
                <div className="col-10">
                    <div className="row">
                        <div className="col-12">
                            <Alert />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-8">
                            <div className="">
                                <div className="card trip-list-header" style={{height: '50px', justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', boxShadow: 'rgb(136, 136, 136) 0px 2px 4px', marginBottom: '20px'}}>
                                    <div className="col-1" ></div>
                                    <div className="col-2" style={{borderBottom: '2px solid #0F61D8'}}>Trip Name</div>
                                    <div className="col-3" ></div>
                                    <div className="col-2" >Date</div>
                                    <div className="col-2" >Status</div>
                                </div>
                                {tripList}
                            </div>
                        </div>
                        <div className="col-4" style={{backgroundColor: '#FBFBFB', height: '100vh', boxShadow: 'rgb(136, 136, 136) 0px 2px 4px'}}>
                            {tripForm || tripInfo}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, { setCurrentTrip })(Trips);