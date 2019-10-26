import React, { Component } from 'react'
import { CardElement, injectStripe, Elements, StripeProvider } from 'react-stripe-elements'
import { apiCall } from '../api'
import Button from '@material-ui/core/Button'
import Snack from '../Snack'

class _CardForm extends Component {
    state = {
        complete: false,
        error: '',
        success: '',
        snack: {
            show: false,
            variant: '',
            message: ''
        }
    }

    constructor(props) {
        super(props)
    }

    closeSnack = () => (this.setState({ snack: { show: false } }))

    submit = async ev => {
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
            let response = await apiCall('POST', "/api/stripe/connect/charge", {
                token: token.token.id,
                coordinatorId: this.props.coordinatorId
            }, true)
            this.setState({
                snack: {
                    show: true,
                    variant: 'success',
                    message: 'Success!'
                }
            })
            if (response.message === 'Success') {

            }
            console.log(response)
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
        if (this.state.complete) return <h1>Purchase Complete</h1>;

        return (
            <div className="">
                <p style={{ color: '#FF605F' }}>{this.state.error}</p>
                <p style={{ color: '#0F61D8' }}>{this.state.success}</p>
                <span><strong>Card details</strong></span>
                <div className='mt-3 mb-4'>
                    <CardElement />
                </div>
                <Button type="submit" className="float-right" size="large" variant="contained" color="primary" style={{ width: '180px', height: '50px' }} onClick={this.submit}>
                    Send
                                </Button>
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
                    <CardForm coordinatorId={this.props.coordinatorId} />
                </Elements>
            </div>
        )
    }
}

export default class CreateChargeForm extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            < StripeProvider apiKey={process.env.REACT_APP_STRIPE_KEY}>
                <Checkout coordinatorId={this.props.coordinatorId} />
            </StripeProvider>
        )

    }
}