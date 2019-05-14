import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import AuthForm from '../components/Sigin/AuthForm'
import { authUser } from '../store/actions/auth'
import Trips from './Trips'
import withAuth from '../hocs/withAuth'
import ErrorPage from '../components/Other/ErrorPage'
import AdminHome from './AdminHome'
import Itinerary from './Itinerary'
import Manage from './Manage'
import Communicate from './Communicate'
import Dashboard from './Dashboard'

const Main = ({authUser}) => {

    return (
        <div className="container-fluid hero" style={{paddingLeft: '0px'}}>
            <Switch>
                {/* <Route exact path="/" render={props => <Homepage currentUser={currentUser} {...props}/>}></Route> */}
                <Route exact path="/signin" render={props => <AuthForm onAuth={authUser} buttonText="Sign in" heading="Welcome Back." {...props}/>}></Route>
                {/*<Route exact path="/signup" render={props => <AuthForm onAuth={authUser} buttonText="Sign up" heading="Join Today." {...props}/>}></Route> */}
                <Route exact path="/trips" component={withAuth(Trips)}/>
                <Route exact path="/dashboard" component={withAuth(Dashboard)}/>
                <Route exact path="/trips/:tripId/home" component={withAuth(AdminHome)}/>
                <Route exact path="/trips/:tripId/create" component={withAuth(Itinerary)}/>
                <Route exact path="/trips/:tripId/manage" component={withAuth(Manage)}/>
                <Route exact path="/trips/:tripId/communicate" component={withAuth(Communicate)}/>
                <Route component={ErrorPage} />
            </Switch>
        </div>
    )
} 

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser
    }
}

export default withRouter(connect(mapStateToProps, { authUser })(Main))