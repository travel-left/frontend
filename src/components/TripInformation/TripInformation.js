import React, { Component } from 'react'
import Alert from '../Other/Alert'
import DashboardHeader from '../Other/DashboardHeader'
import TripInformationForm from "./TripInformationForm"
import { connect } from 'react-redux'
import { setCurrentTrip } from "../../store/actions/trip"
import { apiCall } from '../../services/api'
import Moment from 'react-moment'

class TripInformation extends Component {

    constructor(props) {
        super(props)
    }

    updateTrip = updatedTrip => {
        apiCall('put', `/api/trip/${this.props.currentTrip._id}`, updatedTrip)
        .then(data => {
            return apiCall('get', `/api/trip/${this.props.currentTrip._id}`)
        })
        .then(data => {
            return this.props.setCurrentTrip(data.trip)
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        let { name, description, status, image, dateStart, dateEnd} = this.props.currentTrip

        return (
            <div>
                <div className="row">
                    <div className="col-12">
                        <Alert />
                    </div>
                </div>
                <div className="row">
                    <div className="col-8">
                        <DashboardHeader title='Trip Information' description='Edit your trip information here'/>
                        <div class="card" style={{border: 'none', backgroundColor: '#FBFBFB'}}>
                            <div class="card-body">
                                <h2 className="card-title" style={{color: '#0B62D4'}}>{name} <span className='pull-right' style={{color: '#717171', fontSize: '.6em'}}><Moment date={dateStart} format="MMM Do" /> - <Moment date={dateEnd} format="MMM Do" /></span></h2>
                                <h5>Status</h5> <span class="badge badge-primary badge-pill" >{status} </span>  <br/>
                                <h5>Description</h5> <p class="card-text">{description}</p>
                                <h5>Image link</h5><p class="card-text">{image}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-4" style={{ backgroundColor: '#FBFBFB', height: '100vh', boxShadow: 'rgb(136, 136, 136) 0px 2px 4px' }}>
                        <div class="card" style={{border: 'none', backgroundColor: '#FBFBFB'}}>
                            <div class="card-body" style={{marginTop: '20px'}}>
                                <TripInformationForm submit={this.updateTrip} trip={{name, description, status, image, dateStart, dateEnd}} />
                            </div>
                        </div>
                    </div>
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

export default connect(mapStateToProps, { setCurrentTrip })(TripInformation)
