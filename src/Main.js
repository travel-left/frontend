import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { authUser, setCurrentUser } from './util/redux/actions/auth'
import Trips from './OrganizationDashboard/Trips/'
import WithAuth from './Auth/withAuth'
import WithoutAuth from './Auth/withoutAuth'
import Auth from './Account'
import TripDashboard from './TripDashboard'
import NewPassword from './Account/NewPassword'
import Container from '@material-ui/core/Container'
import Account from './Account/Account'
import Travelers from './TripDashboard/Travelers/index'
import ErrorPage from './OtherPages/ErrorPage'
import Support from './OtherPages/Support'
import Share from './TravelerPages/Share'
import TripRegistration from './TravelerPages/TripRegistration'

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
                path="/account"
                render={props => (
                    <WithAuth {...props}>
                        <Container maxWidth='xl' style={{ padding: 0 }}>
                            <Account
                                {...props}
                                currentUser={currentUser}
                                setCurrentUser={setCurrentUser}
                            />
                        </Container>
                    </WithAuth>
                )}
            />
            <Route
                exact
                path="/support"
                render={props => (
                    <WithAuth {...props} currentUser={currentUser}>
                        <Support {...props} currentUser={currentUser} />
                    </WithAuth>
                )}
            />
            <Route
                exact
                path="/newpassword"
                render={props => (
                    <WithAuth {...props} currentUser={currentUser}>
                        <NewPassword
                            coordinatorId={currentUser._id}
                            {...props}
                        />
                    </WithAuth>
                )}
            />
            <Route
                path="/trips/:tripId/register"
                render={routeProps => <TripRegistration {...routeProps} />}
            />
            <Route
                exact
                path="/"
                render={props => (
                    <WithAuth onAuth={authUser} {...props} currentUser={currentUser}>
                        <Container maxWidth='xl' style={{ padding: 0 }}>
                            <Trips {...props} />
                        </Container>
                    </WithAuth>
                )}
            />
            <Route
                exact
                path="/trips"
                render={props => (
                    <WithAuth onAuth={authUser} {...props} currentUser={currentUser}>
                        <Container maxWidth='xl' style={{ padding: 0 }}>
                            <Trips {...props} />
                        </Container>
                    </WithAuth>
                )}
            />
            <Route
                path="/travelers"
                render={props => (
                    <WithAuth {...props} currentUser={currentUser}>
                        <Container maxWidth='xl' style={{ padding: 0 }}>
                            <Travelers {...props} currentUser={currentUser} />
                        </Container>
                    </WithAuth>
                )}
            />
            <Route
                path="/trips/:tripId/preview"
                render={routeProps => (
                    <Share currentTrip={currentTrip} {...routeProps} />
                )}
            />
            <Route
                path="/trips/:tripId"
                render={props => (
                    <WithAuth {...props} currentUser={currentUser}>
                        <Container maxWidth='xl' style={{ padding: 0 }}>
                            <TripDashboard {...props} />
                        </Container>
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
