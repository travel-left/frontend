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
                            <div className="card trip-list-header" style={{height: '50px', justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', boxShadow: 'rgb(136, 136, 136) 0px 2px 4px', marginBottom: '20px'}}>
                                <div className="col-1" ></div>
                                <div className="col-2" style={{borderBottom: '2px solid #0F61D8'}}>Trip Name</div>
                                <div className="col-3" ></div>
                                <div className="col-2" >Date</div>
                                <div className="col-2" >Status</div>
                            </div>
                            <ul className="list-group" style={{display: 'flex', flexDirection: 'column'}}>
                                <div className="card" style={{minHeight: '80px', boxShadow: 'rgb(136, 136, 136) 0px 0px 8px'}}>
                                    <div className="row no-gutters" style={{justifyContent: 'space-around', height: '100px', flexDirection: 'row', alignItems: 'center',}}>
                                        <div className="col-2 pull-left">
                                            <img src="https://images.unsplash.com/photo-1484318571209-661cf29a69c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" className="card-img" alt="..."></img>
                                        </div>
                                        <div className="col-2">
                                            <p className="card-text" style={{padding: '15px 5px 15px 5px', fontSize: '1.3em', color: '#3A3A3A', fontWeight: '600'}}>South Africa</p>
                                        </div>
                                        <div className="col-2" >
                                        </div>
                                        <div className="col-2">
                                            <p className="card-text" style={{padding: '15px 5px 15px 5px', color: '#A3A3A3'}}>June 12</p>
                                        </div>
                                        <div className="col-2">
                                            <p className="card-text" style={{padding: '15px 5px 15px 5px'}}><span class="badge badge-primary badge-pill" style={{padding: '5px 10px', backgroundColor: '#8ECFF5'}}>PLANNING</span></p>
                                        </div>
                                    </div>
                                </div>
                            </ul>
                        </div>
                        </div>
                        <div className="col-4" style={{backgroundColor: 'white', height: '100vh'}}>
                            <div class="card" style={{border: 'none'}}>
                                <img src="https://images.unsplash.com/photo-1484318571209-661cf29a69c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" class="card-img-top" style={{boxShadow: 'rgb(136, 136, 136) 0px 2px 4px', border: 'none', borderRadius: '0%'}}alt="..."></img>
                                <div class="card-body" style={{marginTop: '20px'}}>
                                    <span style={{fontSize: '1.3em', color: '#3A3A3A', fontWeight: '600'}}>Trip to South Africa</span>  
                                    <button className="btn btn-lg btn-square dark pull-right">Edit</button>
                                    <p class="card-text">Planned for sophonmores and juniors who didn't get to attend lasts year trip</p>
                                </div>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Date <span className='pull-right' style={{color: '#0B62D4'}}>Jun 31</span></li>
                                    <li class="list-group-item">Status <span className='pull-right badge badge-primary badge-pill' style={{padding: '5px 10px', backgroundColor: '#8ECFF5'}}>PLANNING</span></li>
                                    <li class="list-group-item">Total Invited <span className='pull-right badge badge-primary badge-pill' style={{padding: '5px 10px', backgroundColor: '#0F61D8'}}>215</span></li>
                                    <li class="list-group-item">Total Confirmed <span className='pull-right badge badge-primary badge-pill' style={{padding: '5px 10px', backgroundColor: '#0F61D8'}}>85</span></li>
                                </ul>
                                <div class="card-body">
                                    <button className="btn btn-lg btn-square light">DUPLICATE</button>
                                    <button className="btn btn-lg btn-square light pull-right">ARCHIVE</button>
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