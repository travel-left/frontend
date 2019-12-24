import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import TravelerRegistrationForm from '../Forms/TravelerRegistrationForm'
import { apiCall } from '../util/api'

export default class TripRegistration extends Component {

    tripId = this.props.match.params.tripId

    state = {
        trip: {}
    }
    constructor(props) {
        super(props)
        this.getTripInfo()
    }

    getTripInfo = async () => {
        let trip = await apiCall('get', `/api/trips/${this.tripId}/share`)

        let org = await apiCall('get', `/api/organization/${trip.coordinators[0].organization}/name`)
        trip.orgName = org.name
        this.setState({
            trip
        })
    }

    render() {
        return (
            <div className="d-flex justify-content-center">
                <Card style={{ padding: 16, maxWidth: 600, marginTop: 32 }}>
                    <Typography variant="h4">Register for {this.state.trip.name}</Typography>
                    <TravelerRegistrationForm fields={this.state.trip.travelerRegistrationForm}></TravelerRegistrationForm>
                </Card>
            </div>
        )
    }
}
