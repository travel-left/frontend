import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import Itinerary from './Itinerary'
import TripInformation from './TripInformation'
import Travelers from './Travelers'
import Grid from '@material-ui/core/Grid'

const Router = ({ currentTrip, currentUser, setCurrentTrip }) => {
    return (
        <Switch>
            <Route
                exact
                path="/trips/:tripId/edit"
                render={routeProps => (
                    <Grid item xs={12} md={10} lg={8}>
                        <TripInformation
                            {...routeProps}
                            currentTrip={currentTrip}
                            currentUser={currentUser}
                            setCurrentTrip={setCurrentTrip}
                        />
                    </Grid>
                )}
            />
            <Route
                exact
                path="/trips/:tripId/itinerary"
                render={routeProps => (
                    <Grid item xs={12} md={10} lg={10}>
                        <Itinerary
                            {...routeProps}
                            currentTrip={currentTrip}
                            currentUser={currentUser}
                        />
                    </Grid>
                )}
            />
            <Route
                exact
                path="/trips/:tripId/travelers"
                render={routeProps => (
                    <Grid item xs={12} md={10} lg={10}>
                        <Travelers
                            {...routeProps}
                            currentTrip={currentTrip}
                            currentUser={currentUser}
                        />
                    </Grid>
                )}
            />
        </Switch>
    )
}

export default withRouter(Router)
