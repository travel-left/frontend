import React, { Component } from 'react'
import './Dashboard.css'
import SideNavigation from './SideNavigation'
import { Switch, Route, withRouter } from 'react-router-dom'
import withAuth from '../hocs/withAuth'
import { connect } from 'react-redux'
import Itinerary from './Itinerary'
import Manage from './Manage'
import Communicate from './Communicate'
import Documents from '../components/Documents/Documents'
import TripInformation from '../components/TripInformation/TripInformation'

class Dashboard extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="row">
                {/* col-2 */}
                <SideNavigation />
                <div className="col-10">
                    <Switch>
                        <Route exact path="/trips/:tripId/edit" render={routeProps => <TripInformation {...routeProps} currentTrip={this.props.currentTrip} currentUser={this.props.currentUser} />} />
                        <Route exact path="/trips/:tripId/itinerary" render={routeProps => <Itinerary {...routeProps} currentTrip={this.props.currentTrip} currentUser={this.props.currentUser} />} />
                        <Route exact path="/trips/:tripId/manage" render={routeProps => <Manage {...routeProps} currentTrip={this.props.currentTrip} />} currentUser={this.props.currentUser} />
                        <Route exact path="/trips/:tripId/communicate" render={routeProps => <Communicate {...routeProps} currentTrip={this.props.currentTrip} />} currentUser={this.props.currentUser} />
                        <Route exact path="/trips/:tripId/documents" render={routeProps => <Documents {...routeProps} currentTrip={this.props.currentTrip} />} currentUser={this.props.currentUser} />
                    </Switch>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentTrip: state.currentTrip,
        currentUser: state.currentUser
    }
}

export default withRouter(
    connect(
        mapStateToProps,
        null
    )(Dashboard)
)
