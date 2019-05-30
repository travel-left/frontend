import React, { Component } from 'react'
import './Dashboard.css'
import SideNavigation from './SideNavigation'
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Itinerary from '../components/Itinerary/Itinerary'
import Communicate from '../components/Communicate/Communicate'
import Documents from '../components/Documents/Documents'
import TripInformation from '../components/TripInformation/TripInformation'
import Travelers from '../components/Travelers/Travelers'

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
                        <Route exact path="/trips/:tripId/manage" render={routeProps => <Travelers {...routeProps} currentTrip={this.props.currentTrip} />} currentUser={this.props.currentUser} />
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
