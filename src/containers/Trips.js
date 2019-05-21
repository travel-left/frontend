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
                showTrips: true,
                selectedTrip: data.trips[0]
            })
        })
    }

    selectTrip = tripId => {
        this.props.setCurrentTrip({
            ...this.state.trips.filter(t => t._id == tripId)[0]
        })

        this.props.history.push(`/trips/${tripId}/home`)
    }

    showTripForm = () => {
        this.setState({
            showNewTripButton: false,
            showTripForm: true
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
                    showNewTripButton: true
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
        let { showTrips, showTripForm, trips, showNewTripButton, selectedTrip } = this.state
        let tripTiles, content, tripForm, newTripButton = null

        if(showTrips) {

        }

        if(showNewTripButton) {
            newTripButton = <button style={{marginTop: '50px', marginBottom: '50px'}}onClick={this.showTripForm} class='btn-lg btn-square dark'>ADD NEW TRIP</button>
        }

        if(showTripForm)  {
            tripForm = 
            <div className="col-6 welcomeMessage">
                <TripForm submit={this.addTrip}/>
            </div>
        }
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
                            <TripList trips={trips} setSelectedTrip={this.setSelectedTrip}/>
                        </div>
                        </div>
                        <div className="col-4" style={{backgroundColor: 'white', height: '100vh', boxShadow: 'rgb(136, 136, 136) 0px 2px 4px'}}>
                            <TripInfo id={selectedTrip._id} image={selectedTrip.image} name={selectedTrip.name} date={selectedTrip.dateStart} edit={this.selectTrip}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, { setCurrentTrip })(Trips);