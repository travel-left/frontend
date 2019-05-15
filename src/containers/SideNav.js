import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import './Navbar.css'

class SideNav extends Component {

    constructor(props) {
        super(props)
    }

    onButtonClick = e => {
        let {history, currentTrip} = this.props

        switch (e.target.name) {
            case 'create':
                return history.push(`/trips/${currentTrip.id}/create`)
            case 'manage':
                return history.push(`/trips/${currentTrip.id}/manage`)
            case 'communicate':
                return history.push(`/trips/${currentTrip.id}/communicate`)
            case 'dashboard':
                return history.push(`/trips/${currentTrip.id}/dashboard`)
            default:
                history.push('/trips')
        }
    }

    render(){
        let {currentTrip} = this.props 
        return (    
            <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <a className="nav-link active" name='dashboard' onClick={this.onButtonClick} id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Dashboard</a>
                <a className="nav-link" name='create' onClick={this.onButtonClick} id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Create</a>
                <a className="nav-link" name='manage' onClick={this.onButtonClick} id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">Manage</a>
                <a className="nav-link" name='communicate' onClick={this.onButtonClick} id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">Communicate</a>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentTrip: state.currentTrip
    }
}

export default withRouter(connect(mapStateToProps, null)(SideNav))