import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import Itinerary from './Itinerary'
import TripInformation from './TripInformation'
import Travelers from './Travelers'
import Share from './Share'

const Dashboard = ({ currentTrip, currentUser }) => {
    return (
        <Switch>
            <Route
                exact
                path="/trips/:tripId/edit"
                render={routeProps => (
                    <TripInformation
                        {...routeProps}
                        currentTrip={currentTrip}
                        currentUser={currentUser}
                    />
                )}
            />
            <Route
                exact
                path="/trips/:tripId/itinerary"
                render={routeProps => (
                    <Itinerary
                        {...routeProps}
                        currentTrip={currentTrip}
                        currentUser={currentUser}
                    />
                )}
            />
            <Route
                exact
                path="/trips/:tripId/travelers"
                render={routeProps => (
                    <Travelers
                        {...routeProps}
                        currentTrip={currentTrip}
                        currentUser={currentUser}
                    />
                )}
            />
            <Route
                exact
                path="/trips/:tripId/share"
                render={routeProps => (
                    <Share
                        {...routeProps}
                        currentTrip={currentTrip}
                        currentUser={currentUser}
                    />
                )}
            />
        </Switch>
    )
}

export default withRouter(Dashboard)
