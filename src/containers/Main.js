import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { authUser } from '../store/actions/auth'
import Trips from './Trips/Trips'
import withAuth from '../hocs/withAuth'
import ErrorPage from '../components/Other/ErrorPage'
import TripDashboard from './TripDashboard/TripDashboard'
import SignIn from '../components/Sigin/SignIn'
import SignUp from '../components/Sigin/SignUp'

const Main = ({ authUser }) => {
    return (
        <Switch>
            <Route exact path="/signin" render={props => <SignIn onAuth={authUser} buttonText="Sign in" authType='signin' switchButtonText='Sign Up' switchButtonName='signin' heading="Welcome Back." {...props} />} />
            <Route exact path="/signup" render={props => <SignUp onAuth={authUser} buttonText="Sign up" authType='signup' switchButtonText='Sign In' switchButtonName='signup' heading="Start your Free Trial" {...props}/>} />
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
