import React, { Component } from 'react'
import SideNavigation from '../../containers/Navbar/SideNavigation'
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Itinerary from './Itinerary/Itinerary'
import Documents from './Documents/Documents'
import TripInformation from '../../containers/TripDashboard/TripInformation/TripInformation'
import Travelers from './Travelers/Travelers'
import Communicate from './Communicate/Communicate'
import Moment from 'react-moment'
import TripImageForm from '../../containers/TripDashboard/TripInformation/TripImageForm'
import { apiCall } from '../../util/api'
import { setCurrentTrip } from '../../store/actions/trip';

class Dashboard extends Component {
    constructor(props) {
        super(props)
    }

    updateCoverPhoto = newImage => {
        apiCall('put', `/api/trips/${this.props.currentTrip._id}`, { image: newImage }) // Update Trip
            .then(data => {
                return apiCall('get', `/api/trips/${this.props.currentTrip._id}`) // Get Trip by Id
            })
            .then(data => {
                this.props.setCurrentTrip({ ...data })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        let { currentTrip, currentCohort, currentUser } = this.props
        return (
            <>
                <div className="row">
                    <div className="col-9 d-flex flex-column justify-content-between px-5 py-2" style={{ backgroundImage: `url(${currentTrip.image})`, height: '20vh', backgroundPosition: 'center' }}>
                        <div className="row">
                            <h2 className='text-light'>Your {currentTrip.name} Trip</h2>
                        </div>
                        <div className="row align-items-start">
                            <h5 className='text-light'>Status: </h5>
                            <span class="badge badge-primary badge-pill h5 align-self-center ml-2 bg-secondary">{currentTrip.status} </span>
                        </div>
                        <div className="row justify-content-between">
                            <div>
                                <h5 className='d-inline text-light'>Invited</h5>
                                <h5 className='d-inline text-light'>Booked</h5>
                            </div>
                            <h5 className='text-light'><Moment date={currentTrip.dateStart} format="MMMM DD" /> {' - '} <Moment date={currentTrip.dateEnd} format="MMMM DD" /></h5>
                            <TripImageForm image={currentTrip.image} submit={this.updateCoverPhoto}></TripImageForm>
                        </div>
                    </div>
                    <div className="col-3">

                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2 shadow-lg bg-light px-0">
                        <SideNavigation currentTrip={currentTrip} currentUser={this.props.currentUser} />
                    </div>
                    <div className="col-md-10">
                        <Switch>
                            <Route exact path="/trips/:tripId/edit" render={routeProps => <TripInformation {...routeProps} currentTrip={currentTrip} currentUser={currentUser} />} />
                            <Route exact path="/trips/:tripId/itinerary" render={routeProps => <Itinerary {...routeProps} currentTrip={currentTrip} currentUser={currentUser} currentCohort={currentCohort} />} />
                            <Route exact path="/trips/:tripId/manage" render={routeProps => <Travelers {...routeProps} currentTrip={currentTrip} currentUser={currentUser} currentCohort={currentCohort} />} />
                            <Route exact path="/trips/:tripId/communicate" render={routeProps => <Communicate {...routeProps} currentTrip={currentTrip} currentUser={currentUser} currentCohort={currentCohort} />} />
                            <Route exact path="/trips/:tripId/documents" render={routeProps => <Documents {...routeProps} currentTrip={currentTrip} currentUser={currentUser} currentCohort={currentCohort} />} />
                        </Switch>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentTrip: state.currentTrip,
        currentUser: state.currentUser,
        currentCohort: state.currentCohort
    }
}

export default withRouter(
    connect(
        mapStateToProps,
        { setCurrentTrip }
    )(Dashboard)
)
