import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import Payment from './Payment'
import Personal from './Personal';
import Organization from './Organization';
import TravelerPayments from './TravelerPayments';

const Router = ({ currentUser, setCurrentUser }) => {
    return (
        <Switch>
            <Route
                exact
                path="/account/personal"
                render={routeProps => (
                    <Personal currentUser={currentUser} setCurrentUser={setCurrentUser} />
                )}
            />
            <Route
                exact
                path="/account/billing"
                render={routeProps => (
                    <Payment currentUser={currentUser} setCurrentUser={setCurrentUser} />
                )}
            />
            <Route
                exact
                path="/account/organization"
                render={routeProps => (
                    <Organization currentUser={currentUser} setCurrentUser={setCurrentUser} />
                )}
            />
            <Route
                path="/account/travelerPayments"
                render={routeProps => (
                    <TravelerPayments {...routeProps} currentUser={currentUser} setCurrentUser={setCurrentUser} />
                )}
            />
        </Switch>
    )
}

export default withRouter(Router)
