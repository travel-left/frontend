import React, { Component } from 'react'
import { CardElement, injectStripe, Elements, StripeProvider } from 'react-stripe-elements'
import { apiCall } from '../util/api'
import Button from '@material-ui/core/Button'
import Snack from '../util/otherComponents/Snack'
import LeftButton from '../util/otherComponents/LeftButton'

class _CardForm extends Component {
    state = {
        complete: false,
        error: '',
        success: '',
        snack: {
            show: false,
            variant: '',
            message: ''
        },
        isSubmitting: false
    }

    constructor(props) {
        super(props)
    }

    closeSnack = () => (this.setState({ snack: { show: false } }))

    submit = async ev => {
        this.setState({ isSubmitting: true })
        let token = await this.props.stripe.createToken({ name: "traveler_card" })

        if (token.error) {
            this.setState({
                snack: {
                    show: true,
                    variant: 'error',
                    message: 'An error occurred.'
                }
            })
        }

        try {
            await apiCall('POST', "/api/left/stripe/connect/travelerRegistrationPayment", {
                token: token.token.id,
                account: this.props.account,
                amount: this.props.amount,
                travelerEmail: this.props.travelerEmail
            })
            this.setState({
                snack: {
                    show: true,
                    variant: 'success',
                    message: 'Success!'
                }
            })
            this.setState(prevState => ({ isSubmitting: false }))
            this.props.onSubmit()
        } catch (err) {
            this.setState({
                snack: {
                    show: true,
                    variant: 'error',
                    message: 'An error occurred.'
                }
            })
        }


    }

    render() {
        const { isSubmitting } = this.state
        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ paddingTop: 16, paddingBottom: 16 }}> ${this.props.amount} is being requested to register for your trip.</span>
                <div>
                    <span><strong>Card details</strong></span>
                    <div style={{ paddingTop: 16, paddingBottom: 16 }}>
                        <CardElement />
                    </div>
                </div>
                <div>
                    <LeftButton type="submit" float onClick={this.submit} disabled={isSubmitting}>
                        submit
                </LeftButton>

                </div>
                {this.state.snack.show && <Snack open={this.state.snack.show} message={this.state.snack.message} variant={this.state.snack.variant} onClose={this.closeSnack}></Snack>}
            </div>
        )
    }

}

const CardForm = injectStripe(_CardForm)

class Checkout extends Component {

    render() {
        return (
            <div className="Checkout">
                <Elements>
                    <CardForm account={this.props.account} amount={this.props.amount} travelerEmail={this.props.travelerEmail} onSubmit={this.props.onSubmit} />
                </Elements>
            </div>
        )
    }
}

export default class CollectTripPaymentForm extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <StripeProvider apiKey={process.env.REACT_APP_STRIPE_KEY}>
                <Checkout onSubmit={this.props.onSubmit} account={this.props.connectAccountId} amount={this.props.amount} travelerEmail={this.props.travelerEmail} />
            </StripeProvider>
        )

    }
}