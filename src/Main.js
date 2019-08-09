import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { authUser } from './util/redux/actions/auth'
import Trips from './OrganizationDashboard/Trips'
import withAuth from './util/hocs/withAuth'
import ErrorPage from './util/otherComponents/ErrorPage'
import Auth from './Auth'
import CreateProfile from './Auth/CreateProfile'
import TripDashboard from './TripDashboard'
import NewPassword from './Auth/NewPassword'

const Main = ({ authUser, currentTrip, currentUser }) => {
    return (
        <Switch>
            <Route
                exact
                path="/signin"
                render={props => (
                    <Auth onAuth={authUser} type="sign in" {...props} />
                )}
            />
            <Route
                exact
                path="/signup"
                render={props => (
                    <Auth onAuth={authUser} type="sign up" {...props} />
                )}
            />
            <Route
                exact
                path="/createprofile"
                render={props => <CreateProfile onAuth={authUser} {...props} />}
            />
            <Route
                exact
                path="/newpassword"
                render={props => (
                    <NewPassword coordinatorId={currentUser._id} {...props} />
                )}
            />
            <Route exact path="/" component={withAuth(Trips)} />
            <Route exact path="/trips" component={withAuth(Trips)} />
            <Route path="/trips/:tripId" component={withAuth(TripDashboard)} />
            <Route component={ErrorPage} />
        </Switch>
    )
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser,
        currentTrip: state.currentTrip
    }
}

export default withRouter(
    connect(
        mapStateToProps,
        { authUser }
    )(Main)
)
