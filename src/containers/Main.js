import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import AuthForm from '../components/Sigin/AuthForm'
import { authUser } from '../store/actions/auth'
import Trips from './Trips'
import withAuth from '../hocs/withAuth'
import ErrorPage from '../components/Other/ErrorPage'
import Itinerary from './Itinerary'
import Manage from './Manage'
import Communicate from './Communicate'
import Dashboard from './Dashboard'
import withSideNav from '../hocs/withSideNav'

const Main = ({ authUser }) => {
    return (
        <Switch>
            {/* <Route exact path="/" render={props => <Homepage currentUser={currentUser} {...props}/>}></Route> */}
            <Route exact path="/signin" render={props => <AuthForm onAuth={authUser} buttonText="Sign in" heading="Welcome Back." {...props} />} />
            {/*<Route exact path="/signup" render={props => <AuthForm onAuth={authUser} buttonText="Sign up" heading="Join Today." {...props}/>}></Route> */}
            <Route exact path="/trips" component={withAuth(Trips)} />
            <Route path="/trips/:tripId" component={withAuth(Dashboard)} />
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
