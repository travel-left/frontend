import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { authUser, setCurrentUser } from './util/redux/actions/auth'
import Trips from './OrganizationDashboard/Trips/'
import WithAuth from './Auth/withAuth'
import WithoutAuth from './Auth/withoutAuth'
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
import Container from '@material-ui/core/Container'
import Account from './Auth/Account'

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
                path="/account"
                render={props => (
                    <WithAuth {...props}>
                        <Account
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
                exact
                path="/travelers"
                render={props => (
                    <WithAuth {...props} currentUser={currentUser}>
                        <Travelers {...props} currentUser={currentUser} />
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
