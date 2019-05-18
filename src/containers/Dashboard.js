import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Dashboard.css'
import NumberTile from '../components/AdminHome/NumberTile'
import { setCurrentTrip } from '../store/actions/trip'
import { apiCall } from '../services/api'

class Dashboard extends Component {

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
        //get the admin's cohorts
        //get the admin's users
        //get the admin's places of interest
        //get the admin's itineraries
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

    render() {
        let { user } = this.props
        let { showTrips, showTripForm, trips, showNewTripButton } = this.state
        let tripTiles, content, tripForm, newTripButton = null
        if(showNewTripButton) {
            newTripButton = <button onClick={this.showTripForm} class='new-trip'><i class="fa fa-plus fa-3x"></i>
                                <br></br>New Trip
                            </button>
        }
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

        // if(showNewTripButton) {
        //     newTripButton = <button onClick={this.showTripForm} class='new-trip'><i class="fa fa-plus fa-3x"></i>
        //                         <br></br>New Trip
        //                     </button>
        // }

        // if(user) {
        //     content = (
        //         <div>
        //             <div className="row">
        //                 <div className="welcomeMessage">   
        //                     <h2>Which trip would you like to coordinate?</h2>
        //                 </div>
        //             </div>
        //             <div className="row">
        //                 <div className="col-12">
        //                     {tripTiles}
        //                 </div>
        //             </div>
        //             <div className="row">
        //                 <div className="welcomeMessage">   
        //                     {newTripButton}
        //                 </div>
        //             </div>
        //         </div>
        //     )
        // }
        // if(showTripForm)  {
        //     tripForm = 
        //     <div className="col-6 welcomeMessage">
        //         <TripForm submit={this.addTrip}/>
        //     </div>
        // }

        return (
            <div>
                <h4 style={{marginTop: '30px', marginLeft: '30px'}}><strong>By the Numbers</strong></h4>
                <div className="row" style={{display: 'flex', flexDirection:'row', justifyContent: 'center', marginTop: '15px', marginLeft: '20px', marginRight: '20px'}}>
                    <NumberTile phrase='Days until the trip' number={36} />
                    <NumberTile phrase='Travelers ready to go' number={19} />
                    <NumberTile phrase='Events planned' number={24} />
                </div>
                <h4 style={{marginTop: '30px', marginLeft: '30px'}}><strong>Your Trips</strong></h4>
                {tripTiles}
                <div className="row">
                        <div className="welcomeMessage">   
                            {newTripButton}
                        </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentTrip: state.currentTrip
    }
}


export default connect(mapStateToProps, { setCurrentTrip })(Dashboard);