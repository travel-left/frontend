import React, { Component } from 'react'
import SideNavigation from '../Navbar/SideNavigation'
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Itinerary from '../../components/TripDashboard/Itinerary/Itinerary'
import Documents from '../../components/TripDashboard/Documents/Documents'
import TripInformation from './TripInformation/TripInformation'
import Travelers from '../../components/TripDashboard/Travelers/Travelers'
import Communicate from '../../components/TripDashboard/Communicate/Communicate'

class Dashboard extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-2 shadow-lg bg-light px-0">
                    <SideNavigation currentTrip={this.props.currentTrip} currentUser={this.props.currentUser}/>
                </div>
                <div className="col-md-10">
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
