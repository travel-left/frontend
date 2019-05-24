import React, { Component } from 'react'
import Alert from '../Other/Alert'
import DashboardHeader from '../Other/DashboardHeader';
import TripInformationForm from "./TripInformationForm";
import { apiCall } from '../../services/api';

class TripInformation extends Component {

    constructor(props) {
        super(props)
    }

    updateTrip = updatedTrip => {
        apiCall('put', `/api/trip/${this.props.currentTrip._id}`, updatedTrip)
        .then(data => {
            console.log(data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        let { name, description, status, image} = this.props.currentTrip

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
                            <div class="card-body" style={{marginTop: '20px'}}>
                                Name: <h2 className="card-title">{name}</h2>
                                Status: <span style={{fontSize: '1.3em', color: '#3A3A3A', fontWeight: '600'}}>{status} </span>  <br/>
                                Description <p class="card-text">{description}</p>
                                Image link <p class="card-text">{image}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-4" style={{ backgroundColor: '#FBFBFB', height: '100vh', boxShadow: 'rgb(136, 136, 136) 0px 2px 4px' }}>
                        <TripInformationForm submit={this.updateTrip} trip={{name, description, status, image}} />
                    </div>
                </div>
            </div>
        )
    }
}

export default TripInformation
