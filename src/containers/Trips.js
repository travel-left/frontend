import React, { Component } from 'react'
import { apiCall } from '../services/api'
import { connect } from 'react-redux'
import { setCurrentTrip, addTrip } from '../store/actions/trip';
import TripForm from '../components/Trips/TripForm';

class Trips extends Component {
    state = {
        trips: [],
        showTrips: false,
        showTripForm: false
    }
    
    constructor(props){
        super(props)
        if(this.props.user.trips){
            this.props.user.trips.forEach(trip => {
                apiCall('get', `/api/trip/${trip._id}`)
                .then(response => {
                    this.setState(prevState => {
                        return prevState.trips.push(response.trip)
                    })
                })
                .then(() => {
                    this.setState({showTrips: true})
                })
            })
        }
    }

    selectTrip = e => {
        //dispatch select trip
        //route to that trips home
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
            showTripForm: true
        })
    }

    addTrip = trip => {
        apiCall('post', `/api/trip/${this.props.user._id}`, trip)
        .then(data => {
            this.props.addTrip(data.trip)
            return this.setState(prevState => {
                return {
                    trips: [
                        ...prevState.trips,
                        data.trip
                    ]
                }
            })
        })
        
    }

    render(){
        const { user } = this.props
        let tripTiles, content, tripForm = null

        if(this.state.showTrips) {
            tripTiles = this.state.trips.map(trip => {
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

        if(user) {
            content = (
                <div>
                    <div className="row">
                        <div className="welcomeMessage">   
                            <h2>Which trip would you like to go on?</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            {tripTiles}
                        </div>
                    </div>
                    <div className="row">
                        <div className="welcomeMessage">   
                            <button onClick={this.showTripForm}>Add a Trip <i class="fa fa-plus-circle" aria-hidden="true"></i></button>
                        </div>
                    </div>
                </div>
            )
        }
        if(this.state.showTripForm)  {
            tripForm = <TripForm submit={this.addTrip}/>
        }

        return (
            <div className='container'>
                {content}
                <div className="row">
                    {tripForm}  
                </div>
            </div>
    
        )
    }
    
}

export default connect(null, { setCurrentTrip, addTrip })(Trips);