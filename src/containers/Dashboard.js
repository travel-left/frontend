import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Dashboard.css'
import NumberTile from '../components/AdminHome/NumberTile'
import { setCurrentTrip } from '../store/actions/trip'
import { apiCall } from '../services/api'
import Alert from '../components/Other/Alert';
import Main from './Main';
import SideNavigation from './SideNavigation';
import { Switch, Route, withRouter } from 'react-router-dom'
import withAuth from '../hocs/withAuth'
import Itinerary from './Itinerary'
import Manage from './Manage'
import Communicate from './Communicate'
import withSideNav from '../hocs/withSideNav';

class Dashboard extends Component {

    state = {

    }

    constructor(props){
        super(props)

    }

    render() {
        let componentToBeRendered = null
        let {location} = this.props
        console.log(location)
        return (
            <div className='row'>  
                <SideNavigation />
                <div className="col-10">
                    <Switch>
                        <Route exact path="/trips/:tripId/itinerary" component={withAuth(Itinerary)}/>
                        <Route exact path="/trips/:tripId/manage" component={withAuth(withSideNav(Manage))}/>
                        <Route exact path="/trips/:tripId/communicate" component={withAuth(Communicate)}/>
                    </Switch>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentTrip: state.currentTrip
    }
}


export default withRouter(connect(mapStateToProps, { setCurrentTrip })(Dashboard))