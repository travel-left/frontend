import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Dashboard.css'
class Dashboard extends Component {

    constructor(props){
        super(props)
        //get the admin's cohorts
        //get the admin's users
        //get the admin's places of interest
        //get the admin's itineraries
    }

    render() {
        return (
            <div className="col-2" style={{background: '#FCFEFB', paddingLeft: '35px', paddingRight: '35px', paddingBottom: '100vh', paddingTop: '60px', boxShadow: 'rgba(0, 0, 0, 0.25) -1px 2px 2px, rgba(0, 0, 0, 0.22) 5px 14px 13px'}}>
                <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <a className="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Home</a>
                    <a className="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Profile</a>
                    <a className="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">Messages</a>
                    <a className="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">Settings</a>
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


export default connect(mapStateToProps, null)(Dashboard);