import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import TravelerRegistrationForm from '../Forms/TravelerRegistrationForm'
import { apiCall } from '../util/api'
import Snack from '../util/otherComponents/Snack'
import CollectTripPaymentForm from '../Forms/CollectTripPaymentForm'
import { withRouter, NavLink } from 'react-router-dom'
import Button from '@material-ui/core/Button'

export default withRouter(class TripRegistration extends Component {

    tripId = this.props.match.params.tripId

    state = {
        trip: {},
        traveler: {},
        org: {},
        formSettings: {},
        token: null,
        page: 'register',
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
        let org = await apiCall('get', `/api/organization/${trip.coordinators[0].organization}`)

        this.setState({
            trip,
            formSettings: trip.travelerRegistrationFormSettings,
            org
        })
    }

    registerTraveler = async formData => {
        const { org, trip, formSettings } = this.state
        const traveler = {
            ...formData,
            tripId: this.tripId,
            trip: trip.name,
            status: formSettings.hasPaymentAmount ? 'MONEY DUE' : 'CONFIRMED',
            organizationId: org._id
        }
        // create traveler
        try {
            const createdTraveler = await apiCall('post', `/api/travelers/register`, traveler)
            this.setState({ traveler: createdTraveler })
            if (formSettings.hasPaymentAmount) {
                localStorage.setItem('travelerRegistrationId', 'needPayment')
                localStorage.setItem('travelerEmail', createdTraveler.email)
                this.setState({ page: 'payment' })
            }
            else {
                localStorage.setItem('travelerRegistrationId', createdTraveler._id)
                this.checkForRegistrationToken()
            }
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
        let travelerEmail = await localStorage.getItem('travelerEmail')
        if (token === 'needPayment') {
            this.setState({
                token, page: 'payment', traveler: {
                    email: travelerEmail
                }
            })
        }
        else if (token) {
            this.setState({ token, page: 'success' })
        }
    }

    handleSuccessfulRegistrationPayment = async () => {
        localStorage.setItem('travelerRegistrationId', this.state.traveler._id)
        try {
            await apiCall('put', `/api/travelers/${this.state.traveler._id}`, { status: 'CONFIRMED' })
        } catch (err) {
            console.log(err)
        }

        this.checkForRegistrationToken()
    }

    render() {
        const { trip, org, traveler, formSettings, token, page } = this.state

        return (
            <>
                <div style={{ display: 'flex', justifyContent: 'center', }}>
                    <Card style={{ padding: 16, maxWidth: 600, marginTop: 32 }}>
                        {page !== 'success' && <Typography variant="h4">Register for {trip.name}</Typography>}
                        {page === 'register' && <TravelerRegistrationForm fields={formSettings} submit={this.registerTraveler}></TravelerRegistrationForm>}
                        {page === 'payment' && (
                            <>
                                <div style={{ marginTop: 16, marginBottom: 16 }}>
                                    ${formSettings.paymentAmount} is being requested for your registration.
                                </div>
                                <CollectTripPaymentForm
                                    connectAccountId={org.stripeConnectAccountId}
                                    amount={formSettings.paymentAmount}
                                    travelerEmail={traveler.email}
                                    onSubmit={this.handleSuccessfulRegistrationPayment}>
                                </CollectTripPaymentForm>

                            </>
                        )}
                        {page === 'success' && <>
                            <Typography variant="h4" style={{ textAlign: 'center', marginTop: 16, marginBottom: 16 }}>You have been succesfully registered for {trip.name}!</Typography>
                            <div style={{ display: 'flex', justifyContent: 'center', }}>
                                <NavLink
                                    to={`/trips/${trip._id}/share`}
                                    name={`/trips/${trip._id}/share`}
                                >
                                    <Button className='register-button' size="large" type="submit" variant="contained" color="primary" style={{ width: '180px', height: '50px' }}>
                                        BACK TO ITINERARY
                                    </Button>
                                </NavLink>
                            </div>
                        </>}
                    </Card>
                </div>
                {this.state.snack.show && <Snack open={this.state.snack.show} message={this.state.snack.message} variant={this.state.snack.variant} onClose={this.closeSnack}></Snack>}
            </>
        )
    }
})