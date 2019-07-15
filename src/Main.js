import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { authUser } from './redux/actions/auth'
import Trips from './OrganizationDashboard/Trips'
import withAuth from './hocs/withAuth'
import ErrorPage from './OtherComponents/ErrorPage'
import Auth from './Auth/Auth'
import CreateProfile from './Auth/CreateProfile'
import TripDashboard from './TripDashboard/SideNavigation'

const Main = ({ authUser }) => {
    return (
        <Switch>
            <Route exact path="/signin" render={props => <Auth onAuth={authUser} type="sign in" {...props} />} />
            <Route exact path="/signup" render={props => <Auth onAuth={authUser} type="sign up" {...props} />} />
            <Route exact path="/createprofile" render={props => <CreateProfile onAuth={authUser} {...props} />} />
            <Route exact path="/" component={withAuth(Trips)} />
            <Route exact path="/trips" component={withAuth(Trips)} />
            <Route path="/trips/:tripId" component={withAuth(TripDashboard)} />
            <Route component={ErrorPage} />
        </Switch>
    )
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser
    }
}

export default withRouter(
    connect(
        mapStateToProps,
        { authUser }
    )(Main)
)
