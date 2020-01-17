import React, { Component } from 'react'
import { CardElement, injectStripe, Elements, StripeProvider } from 'react-stripe-elements'
import { apiCall } from '../util/api'
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
        console.log(props.formId)
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
            console.log(this.props.formId)
            let response = await apiCall('POST', "/api/left/stripe/connect/charge", {
                token: token.token.id,
                orgId: this.props.orgId,
                amount: this.props.amount,
                formId: this.props.formId
            })
            this.setState({
                snack: {
                    show: true,
                    variant: 'success',
                    message: 'Success!'
                }
            })
            if (response.message === 'Success') {

            }
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
            <div className="">
                <p style={{ color: '#FF605F' }}>{this.state.error}</p>
                <p style={{ color: '#0F61D8' }}>{this.state.success}</p>
                <span><strong>Card details</strong></span>
                <div className='mt-3 mb-4'>
                    <CardElement />
                </div>
                <LeftButton type="submit" float onClick={this.submit} disabled={isSubmitting}>
                    Send
                </LeftButton>
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
                    <CardForm onSubmit={this.props.onSubmit} orgId={this.props.orgId} amount={this.props.amount} formId={this.props.formId} />
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
            <StripeProvider apiKey={process.env.REACT_APP_STRIPE_KEY}>
                <Checkout onSubmit={this.props.onSubmit} orgId={this.props.orgId} amount={this.props.amount} formId={this.props.formId} />
            </StripeProvider>
        )

    }
}