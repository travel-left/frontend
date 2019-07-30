import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Itinerary from './Itinerary/Itinerary'
import TripInformation from './Information/TripInformation'
import { NavLink } from 'react-router-dom'
import Travelers from './Travelers/Travelers'
import { setCurrentTrip } from '../util/redux/actions/trip'
import Cover from './CoverPhoto/Cover'
import Share from './Share/Share'

const Dashboard = ({ currentTrip, currentUser, setCurrentTrip }) => {
    return (
        <>
            <Cover setCurrentTrip={setCurrentTrip} currentTrip={currentTrip} />
            <div className="row">
                <div className="col-md-2 shadow-lg bg-light px-0" style={{ minHeight: '93vh' }}>
                    <div className="shadow">
                        <ul className="list-group list-group-flush bg-light">
                            <SideNavLink text="Trip Information" name="edit" tripId={currentTrip._id} />
                            <SideNavLink text="Itinerary" name="itinerary" tripId={currentTrip._id} />
                            <SideNavLink text="Travelers" name="travelers" tripId={currentTrip._id} />
                            <SideNavLink text="Share" name="share" tripId={currentTrip._id} />
                        </ul>
                    </div>
                </div>
                <div className="col-md-10">
                    <Switch>
                        <Route exact path="/trips/:tripId/edit" render={routeProps => <TripInformation {...routeProps} currentTrip={currentTrip} currentUser={currentUser} />} />
                        <Route exact path="/trips/:tripId/itinerary" render={routeProps => <Itinerary {...routeProps} currentTrip={currentTrip} currentUser={currentUser} />} />
                        <Route exact path="/trips/:tripId/travelers" render={routeProps => <Travelers {...routeProps} currentTrip={currentTrip} currentUser={currentUser} />} />
                        <Route exact path="/trips/:tripId/share" render={routeProps => <Share {...routeProps} currentTrip={currentTrip} currentUser={currentUser} />} />
                    </Switch>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        currentTrip: state.currentTrip,
        currentUser: state.currentUser
    }
}

export default withRouter(
    connect(
        mapStateToProps,
        { setCurrentTrip }
    )(Dashboard)
)

const SideNavLink = ({ text, tripId, name }) => {
    return (
        <NavLink className="list-group-item d-flex justify-content-between align-items-center border-right-0 border-left-0 h6 py-3 text-dark" activeClassName="active" to={`/trips/${tripId}/${name}`} name={`/trips/${tripId}/${name}`}>
            {text}{' '}
        </NavLink>
    )
}