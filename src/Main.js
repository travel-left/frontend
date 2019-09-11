import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { authUser, setCurrentUser } from './util/redux/actions/auth'
import Trips from './OrganizationDashboard/Trips/'
import WithAuth from './util/hocs/withAuth'
import WithoutAuth from './util/hocs/withoutAuth'
import ErrorPage from './util/otherComponents/ErrorPage'
import Auth from './Auth'
import CreateProfile from './Auth/CreateProfile'
import EditProfile from './Auth/EditProfile'
import TripDashboard from './TripDashboard'
import NewPassword from './Auth/NewPassword'
import Support from './Support'
import Travelers from './OrganizationDashboard/Travelers'
import SharePreview from './TripDashboard/Share/SharePreview'
import CheckoutForm from './util/forms/CheckoutForm'

const Main = ({ authUser, currentTrip, currentUser, setCurrentUser }) => {
    return (
        <Switch>
            <Route
                exact
                path="/signin"
                render={props => (
                    <WithoutAuth {...props}>
                        <Auth onAuth={authUser} type="sign in" {...props} />
                    </WithoutAuth>
                )}
            />
            <Route
                exact
                path="/signup"
                render={props => (
                    <WithoutAuth {...props}>
                        <Auth onAuth={authUser} type="sign up" {...props} />
                    </WithoutAuth>
                )}
            />
            <Route
                exact
                path="/createprofile"
                render={props => (
                    <WithoutAuth {...props}>
                        <CreateProfile onAuth={authUser} {...props} />
                    </WithoutAuth>
                )}
            />
            <Route
                exact
                path="/subscription"
                render={props => (
                    <WithAuth {...props}>
                        <CheckoutForm {...props} currentUser={currentUser} />
                    </WithAuth>
                )}
            />
            <Route
                exact
                path="/editprofile"
                render={props => (
                    <WithAuth {...props}>
                        <EditProfile
                            {...props}
                            currentUser={currentUser}
                            setCurrentUser={setCurrentUser}
                        />
                    </WithAuth>
                )}
            />
            <Route
                exact
                path="/support"
                render={props => (
                    <WithAuth {...props}>
                        <Support {...props} currentUser={currentUser} />
                    </WithAuth>
                )}
            />
            <Route
                exact
                path="/newpassword"
                render={props => (
                    <WithAuth {...props}>
                        <NewPassword
                            coordinatorId={currentUser._id}
                            {...props}
                        />
                    </WithAuth>
                )}
            />
            <Route
                exact
                path="/"
                render={props => (
                    <WithAuth {...props}>
                        <Trips {...props} />
                    </WithAuth>
                )}
            />
            <Route
                exact
                path="/trips"
                render={props => (
                    <WithAuth {...props}>
                        <Trips {...props} />
                    </WithAuth>
                )}
            />
            <Route
                exact
                path="/travelers"
                render={props => (
                    <WithAuth {...props}>
                        <Travelers {...props} />
                    </WithAuth>
                )}
            />
            <Route
                path="/trips/:tripId/preview"
                render={routeProps => (
                    <SharePreview currentTrip={currentTrip} {...routeProps} />
                )}
            />
            <Route
                path="/trips/:tripId"
                render={props => (
                    <WithAuth {...props}>
                        <TripDashboard {...props} />
                    </WithAuth>
                )}
            />
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
        { authUser, setCurrentUser }
    )(Main)
)
