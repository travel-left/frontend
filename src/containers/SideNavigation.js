import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import './Navbar.css'

class SideNavigation extends Component {
    constructor(props) {
        super(props)
    }

    selectFeature = e => {
        let { history, currentTrip } = this.props

        switch (e.target.name) {
            case 'info':
                return history.push(`/trips/${currentTrip._id}/edit`)
            case 'itinerary':
                return history.push(`/trips/${currentTrip._id}/itinerary`)
            case 'travelers':
                return history.push(`/trips/${currentTrip._id}/manage`)
            case 'communicate':
                return history.push(`/trips/${currentTrip._id}/communicate`)
            default:
                return
        }
    }

    render() {
        let { currentTrip } = this.props
        return (
            <div className="col-2" style={{ backgroundColor: '#FBFBFB', height: '100vh', boxShadow: 'rgb(136, 136, 136) 1px 0px 20px' }}>
                <div className="row" style={{ justifyContent: 'center' }}>
                    <div class="card" style={{ border: 'none', backgroundColor: '#FBFBFB' }}>
                        <img className="card-img-top" src={this.props.currentTrip.image} style={{ boxShadow: 'rgb(136, 136, 136) 0px 2px 4px', border: 'none', borderRadius: '0%' }} />
                        <span style={{ fontSize: '1.3em', color: '#3A3A3A', fontWeight: '600', margin: '15px 15px' }}>Trip to {this.props.currentTrip.name}</span>
                    </div>
                </div>
                <hr />
                <div className="dashboard-side-bar">
                    <ul class="list-group list-group-flush" style={{ backgroundColor: '#FBFBFB' }}>
                        <a onClick={this.selectFeature} name="info" style={{ margin: '25px 10px', color: '#0B62D4', fontWeight: '600' }}>
                            Trip Information
                        </a>
                        <a onClick={this.selectFeature} name="itinerary" style={{ margin: '25px 10px', color: '#0B62D4', fontWeight: '600' }}>
                            Itinerary
                        </a>
                        <a onClick={this.selectFeature} name="docs" style={{ margin: '25px 10px', color: '#0B62D4', fontWeight: '600' }}>
                            Documents
                        </a>
                        <a onClick={this.selectFeature} name="travelers" style={{ margin: '25px 10px', color: '#0B62D4', fontWeight: '600' }}>
                            Travelers
                        </a>
                        <a onClick={this.selectFeature} name="mobile" style={{ margin: '25px 10px', color: '#0B62D4', fontWeight: '600' }}>
                            Mobile App
                        </a>
                        <a onClick={this.selectFeature} name="communicate" style={{ margin: '25px 10px', color: '#0B62D4', fontWeight: '600' }}>
                            Communicate
                        </a>
                    </ul>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentTrip: state.currentTrip
    }
}

export default withRouter(
    connect(
        mapStateToProps,
        null
    )(SideNavigation)
)
