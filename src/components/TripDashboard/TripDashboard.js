import React, { Component } from 'react'
import SideNavigation from '../../containers/Navbar/SideNavigation'
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Itinerary from './Itinerary/Itinerary'
import Documents from './Documents/Documents'
import TripInformation from './TripInformation/TripInformation'
import Travelers from './Travelers/Travelers'
import Communicate from './Communicate/Communicate'
import { setCurrentTrip } from '../../store/actions/trip'
import Cover from './Cover/Cover'

class Dashboard extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let { currentTrip, currentCohort, currentUser } = this.props
        return (
            <>
                <Cover setCurrentTrip={this.props.setCurrentTrip} currentTrip={currentTrip} />
                <div className="row">
                    <div className="col-md-2 shadow-lg bg-light px-0">
                        <SideNavigation currentTrip={currentTrip} currentUser={this.props.currentUser} />
                    </div>
                    <div className="col-md-10">
                        <Switch>
                            <Route exact path="/trips/:tripId/edit" render={routeProps => <TripInformation {...routeProps} currentTrip={currentTrip} currentUser={currentUser} />} />
                            <Route exact path="/trips/:tripId/itinerary" render={routeProps => <Itinerary {...routeProps} currentTrip={currentTrip} currentUser={currentUser} currentCohort={currentCohort} />} />
                            <Route exact path="/trips/:tripId/manage" render={routeProps => <Travelers {...routeProps} currentTrip={currentTrip} currentUser={currentUser} currentCohort={currentCohort} />} />
                            <Route exact path="/trips/:tripId/communicate" render={routeProps => <Communicate {...routeProps} currentTrip={currentTrip} currentUser={currentUser} currentCohort={currentCohort} />} />
                            <Route exact path="/trips/:tripId/documents" render={routeProps => <Documents {...routeProps} currentTrip={currentTrip} currentUser={currentUser} currentCohort={currentCohort} />} />
                        </Switch>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentTrip: state.currentTrip,
        currentUser: state.currentUser,
        currentCohort: state.currentCohort
    }
}

export default withRouter(
    connect(
        mapStateToProps,
        { setCurrentTrip }
    )(Dashboard)
)
