import React, { Component } from 'react'
import SideNavigation from '../Navbar/SideNavigation'
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { setCurrentCohort } from '../../store/actions/cohort'
import Itinerary from '../../components/TripDashboard/Itinerary/Itinerary'
import Documents from '../../components/TripDashboard/Documents/Documents'
import TripInformation from './TripInformation/TripInformation'
import Travelers from '../../components/TripDashboard/Travelers/Travelers'
import Communicate from '../../components/TripDashboard/Communicate/Communicate'

class Dashboard extends Component {

    updateCohort = id => {
        this.props.setCurrentCohort(this.props.currentTrip.cohorts.filter(c => c._id == id)[0])
    }

    constructor(props) {
        super(props)
        let tripId = this.props.currentTrip._id
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-2 shadow-lg bg-light px-0">
                    <SideNavigation currentTrip={this.props.currentTrip} currentCohort={this.props.currentCohort ? this.props.currentCohort : this.props.currentTrip.cohorts[0]} cohorts={this.props.currentTrip.cohorts} currentUser={this.props.currentUser} submit={this.updateCohort}/>
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
        currentUser: state.currentUser,
        currentCohort: state.currentCohort
    }
}

export default withRouter(
    connect(
        mapStateToProps,
        { setCurrentCohort }
    )(Dashboard)
)
