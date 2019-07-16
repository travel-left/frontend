import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Itinerary from './Itinerary/Itinerary'
import TripInformation from './Information/TripInformation'
import { NavLink } from 'react-router-dom'
import Travelers from './Travelers/Travelers'
import { setCurrentTrip } from '../util/redux/actions/trip'
import Cover from './CoverPhoto/Cover'

const Dashboard = ({ currentTrip, currentCohort, currentUser, setCurrentTrip }) => {
    return (
        <>
            <Cover setCurrentTrip={setCurrentTrip} currentTrip={currentTrip} />
            <div className="row">
                <div className="col-md-2 shadow-lg bg-light px-0" style={{ minHeight: '80vh' }}>
                    <div className="pl-4 pt-4">
                        <ul className="list-group list-group-flush bg-light">
                            <SideNavLink text="Trip Information" name="edit" tripId={currentTrip._id} />
                            <SideNavLink text="Itinerary" name="itinerary" tripId={currentTrip._id} />
                            <SideNavLink text="Travelers" name="travelers" tripId={currentTrip._id} />
                        </ul>
                    </div>
                </div>
                <div className="col-md-10">
                    <Switch>
                        <Route exact path="/trips/:tripId/edit" render={routeProps => <TripInformation {...routeProps} currentTrip={currentTrip} currentUser={currentUser} currentCohort={currentCohort} />} />
                        <Route exact path="/trips/:tripId/itinerary" render={routeProps => <Itinerary {...routeProps} currentTrip={currentTrip} currentUser={currentUser} currentCohort={currentCohort} />} />
                        <Route exact path="/trips/:tripId/travelers" render={routeProps => <Travelers {...routeProps} currentTrip={currentTrip} currentUser={currentUser} currentCohort={currentCohort} />} />
                    </Switch>
                </div>
            </div>
        </>
    )
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

const SideNavLink = ({ text, tripId, name }) => {
    return (
        <NavLink className="text-primary font-weight-bold py-4" activeClassName="text-secondary" to={`/trips/${tripId}/${name}`} name={`/trips/${tripId}/${name}`}>
            {text}{' '}
        </NavLink>
    )
}