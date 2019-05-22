import React from 'react'
import './Dashboard.css'
import SideNavigation from './SideNavigation';
import { Switch, Route, withRouter } from 'react-router-dom'
import withAuth from '../hocs/withAuth'
import Itinerary from './Itinerary'
import Manage from './Manage'
import Communicate from './Communicate'
import TripInformation from '../components/TripInformation/TripInformation';

const Dashboard = () => {
    return (
        <div className='row'>  
            <SideNavigation />
            <div className="col-10">
                <Switch>
                    <Route exact path="/trips/:tripId/edit" component={withAuth(TripInformation)}/>
                    <Route exact path="/trips/:tripId/itinerary" component={withAuth(Itinerary)}/>
                    <Route exact path="/trips/:tripId/manage" component={withAuth(Manage)}/>
                    <Route exact path="/trips/:tripId/communicate" component={withAuth(Communicate)}/>
                </Switch>
            </div>
        </div>
    )
}

export default withRouter(Dashboard)