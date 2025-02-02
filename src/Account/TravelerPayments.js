import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import { apiCall } from '../util/api'
import uuid from 'react-uuid'

export default class TravelerPayments extends Component {

    state = {
        hasConnectAccount: false,
        hasCheckedForConnectAccount: false
    }

    constructor(props) {
        super(props)

        if (this.props.location.search.includes("code")) {
            this.verifyConnectAccount()
        }
        this.getStripeAccount()
    }

    getStripeAccount = async () => {
        try {
            const account = await apiCall('GET', '/api/stripe/connect')
            this.setState({ hasConnectAccount: true })
        } catch (err) {
            this.setState({ canRequestPayments: false })
        }

        this.setState({ hasVerifiedConnectAccount: true })
    }

    goToPaymentDashboard = async () => {
        const link = await apiCall('GET', '/api/stripe/connect/dashboard')

        var win = window.open(link.url, '_blank');
        win.focus()
    }

    verifyConnectAccount = async () => {
        let a = this.props.location.search.split("?code=")[1]
        let token = a.split("&state")[0]
        try {
            await apiCall('POST', '/api/stripe/connect', {
                token
            })
        }
        catch (err) {
            this.setState({
                snack: {
                    show: true,
                    variant: 'error',
                    message: 'An error occurred verifying your account'
                }
            })
        }

        this.getStripeAccount()
    }

    render() {
        return (
            <Card style={{ padding: 16 }}>
                {this.state.hasVerifiedConnectAccount &&
                    <>
                        <Typography variant="subtitle2">{!this.state.hasConnectAccount ?
                            `Your organization\'s payments account is not yet verified. Please verify your account to request payments from your customers. After completing the form you will be redirected back to this page.`
                            : 'You have verified your account. You can now request payments from you customers. Go to your Payment Dashboard by clicking the button below. You can modify your payment settings and view your payouts there.'}</Typography>
                        {!this.state.hasConnectAccount && <Button size="large" type="submit" variant="contained" color="secondary" id="signup" style={{ width: '180px', height: '50px', color: 'white', marginTop: '25px' }} onClick={() => {
                            var win = window.open(`https://connect.stripe.com/express/oauth/authorize?redirect_uri=${process.env.REACT_APP_BASE_URL}/account/travelerPayments&client_id=${process.env.REACT_APP_STRIPE_CONNECT_CLIENT_ID}&state=${uuid()}`, '_blank');
                            win.focus()
                        }}>
                            Verify account
                </Button>}
                        <Button size="large" type="submit" disabled={!this.state.hasConnectAccount} variant="contained" color="primary" id="signup" style={{ width: '180px', height: '50px', float: 'right', marginTop: '25px' }} onClick={this.goToPaymentDashboard}>
                            GO TO DASHBOARD
                </Button>
                    </>}
            </Card>
        )
    }
}
