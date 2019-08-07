import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import Itinerary from './Itinerary'
import TripInformation from './TripInformation'
import Travelers from './Travelers'
import SharePreview from './Share/SharePreview'

const Router = ({ currentTrip, currentUser, setCurrentTrip }) => {
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
                        setCurrentTrip={setCurrentTrip}
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
                path="/trips/:tripId/preview/"
                render={routeProps => <SharePreview {...routeProps} />}
            />
        </Switch>
    )
}

export default withRouter(Router)
