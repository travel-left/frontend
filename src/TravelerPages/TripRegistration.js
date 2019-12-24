import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import TravelerRegistrationForm from '../Forms/TravelerRegistrationForm'
import { apiCall } from '../util/api'
import Snack from '../util/otherComponents/Snack'

export default class TripRegistration extends Component {

    tripId = this.props.match.params.tripId

    state = {
        trip: null,
        token: null,
        snack: {
            show: false,
            variant: '',
            message: ''
        },
    }
    constructor(props) {
        super(props)
        this.checkForRegistrationToken()
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

    registerTraveler = async formData => {
        const traveler = {
            ...formData,
            tripId: this.tripId,
            trip: this.state.trip.name,
            status: 'CONFIRMED',
            organizationId: this.state.trip.coordinators[0].organization
        }
        // create traveler
        try {
            const createdTraveler = await apiCall('post', `/api/travelers/register`, traveler)
            localStorage.setItem('travelerRegistrationId', createdTraveler._id)
            this.checkForRegistrationToken()
        } catch (err) {
            this.setState({
                snack: {
                    show: true,
                    variant: 'error',
                    message: 'An error occurred.'
                }
            })
        }

        // create token and store in local storage
        // show registration page with token
    }

    checkForRegistrationToken = async () => {
        //strange behavior where local storage returns null if not await'd 
        let token = await localStorage.getItem('travelerRegistrationId')
        this.setState({ token })
    }

    render() {

        return (
            <>
                {this.state.trip && !this.state.token &&
                    <div className="d-flex justify-content-center">
                        <Card style={{ padding: 16, maxWidth: 600, marginTop: 32 }}>
                            <Typography variant="h4">Register for {this.state.trip.name}</Typography>
                            <TravelerRegistrationForm fields={this.state.trip.travelerRegistrationForm} submit={this.registerTraveler}></TravelerRegistrationForm>
                        </Card>
                    </div>}
                {this.state.trip && this.state.token &&
                    <div className="d-flex justify-content-center">
                        <Card style={{ padding: 16, maxWidth: 600, marginTop: 32, marginBottom: 32 }} className="d-flex flex-column align-items-center justify-content-center">
                            <Typography variant="h4" style={{ textAlign: 'center', marginTop: 16 }}>You have been succesfully registered for {this.state.trip.name}!</Typography>
                            <Typography variant="h6" style={{ textAlign: 'center', marginTop: 16 }}>Your confirmation number is <b>{this.state.token}</b></Typography>
                            <Typography variant="subtitle1" style={{ textAlign: 'center', marginTop: 16 }}>Please screenshot or save this page for your record.</Typography>
                        </Card>
                    </div>}
                {this.state.snack.show && <Snack open={this.state.snack.show} message={this.state.snack.message} variant={this.state.snack.variant} onClose={this.closeSnack}></Snack>}
            </>
        )
    }
}
