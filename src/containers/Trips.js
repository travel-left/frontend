import React, { Component } from 'react'
import { apiCall } from '../services/api'
import { connect } from 'react-redux'
import { setCurrentTrip } from '../store/actions/trip';
import TripForm from '../components/Trips/TripForm';
import './Trip.css'
import Alert from '../components/Other/Alert';

class Trips extends Component {
    state = {
        trips: [],
        showTrips: false,
        showTripForm: false,
        showNewTripButton: true
    }
    
    constructor(props){
        super(props)
        apiCall('get', `/api/users/${this.props.user._id}/trips`)
        .then(data => {
            return this.setState({
                trips: data.trips,
                showTrips: true
            })
        })
    }

    selectTrip = e => {
        let selectedTrip = this.state.trips.filter(trip => trip._id === e.target.name)[0]

        this.props.setCurrentTrip({
            id: selectedTrip._id,
            name: selectedTrip.name,
            image: selectedTrip.image
        })

        this.props.history.push(`/trips/${selectedTrip._id}/home`)
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

    render(){
        let { user } = this.props
        let { showTrips, showTripForm, trips, showNewTripButton } = this.state
        let tripTiles, content, tripForm, newTripButton = null

        if(showTrips) {
            tripTiles = trips.map(trip => {
                return (
                    <div className="container">
                        <div className="item blue">
                            <img src={trip.image}/>
                            <button name={trip._id} onClick={this.selectTrip}className=""> <i className="fa fa-globe" aria-hidden="true"></i> {trip.name}</button>
                        </div>
                    </div>
                )
            })
        }

        if(showNewTripButton) {
            newTripButton = <button style={{marginTop: '50px', marginBottom: '50px'}}onClick={this.showTripForm} class='btn-lg btn-square dark'>ADD NEW TRIP</button>
        }

        if(user) {
            content = (
                <div>
                    <div className="row">
                        <div className="welcomeMessage">   
                            <h2>Which trip would you like to coordinate?</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            {tripTiles}
                        </div>
                    </div>
                    <div className="row">
                        <div className="" style={{justifyContent: 'center'}}>   
                            {newTripButton}
                        </div>
                    </div>
                </div>
            )
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
                        <div className="userList">
                            <div className="card">
                                <div className="row" style={{justifyContent: 'space-around'}}>
                                    <div className="col-1"></div>
                                    <div className="col-2" style={{borderBottom: '2px solid blue'}}><h5>Trip Name</h5></div>
                                    <div className="col-3"><h5></h5></div>
                                    <div className="col-2"><h5>Date</h5></div>
                                    <div className="col-2"><h5>Status</h5></div>
                                </div>
                            </div>
                            <hr/>
                            <ul class="list-group" style={{display: 'flex', flexDirection: 'column'}}>
                                <div class="card" style={{minHeight: '80px'}}>
                                    <div class="row no-gutters" style={{justifyContent: 'space-around'}}>
                                        <div class="col-1">
                                            <img src="..." class="card-img" alt="..."  style={{padding: '15px 5px 15px 5px'}}></img>
                                        </div>
                                        <div class="col-2">
                                            <p class="card-text" style={{padding: '15px 5px 15px 5px'}}><small class="text-muted">South Africa</small></p>
                                        </div>
                                        <div class="col-3" style={{flexGrow: 2}}>
                                        </div>
                                        <div class="col-2">
                                            <p class="card-text" style={{padding: '15px 5px 15px 5px'}}><small class="text-muted">June 12</small></p>
                                        </div>
                                        <div class="col-2">
                                            <p class="card-text pull-right" style={{padding: '15px 5px 15px 5px'}}><small class="text-muted" >Planning</small></p>
                                        </div>
                                    </div>
                                </div>
                            </ul>
                        </div>
                        </div>
                        <div className="col-4" style={{backgroundColor: 'white', height: '100vh'}}>
                            <div class="card" style={{}}>
                                <img src="..." class="card-img-top" alt="..."></img>
                                <div class="card-body">
                                    <h5 class="card-title">Trip to Austrailia</h5>
                                    <button className="btn btn-lg">Edit</button>
                                    <p class="card-text">Planned for sophonmores and juniors who didn't get to attend lasts year trip</p>
                                </div>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Date <span>Jun 31</span></li>
                                    <li class="list-group-item">Status <span>PLANNING</span></li>
                                    <li class="list-group-item">Total Invited <span>215</span></li>
                                    <li class="list-group-item">Total Confirmed <span>85</span></li>
                                </ul>
                                <div class="card-body">
                                    <button className="btn btn-lg">DUPLICATE</button>
                                    <button className="btn btn-lg">ARCHIVE</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, { setCurrentTrip })(Trips);