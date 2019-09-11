import React, { Component } from 'react';
import { CardElement, injectStripe, Elements, StripeProvider } from 'react-stripe-elements';
import { apiCall } from '../api';

class _CardForm extends Component {
    state = {
        complete: false,
        error: ''
    }

    constructor(props) {
        super(props)
    }

    submit = async ev => {
        let token = await this.props.stripe.createToken({ name: "Name" })

        if (token.error) {
            console.log('error')
            this.setState({ error: token.error.message })
        }

        let response = await apiCall('POST', "/api/stripe", {
            token: token.token.id
        })

        if (response.ok) console.log("Purchase Complete!")
    }

    render() {
        if (this.state.complete) return <h1>Purchase Complete</h1>;

        return (
            <div className="container col-6">
                <p style={{ color: '#FF605F' }}>{this.state.error}</p>
                <p>Would you like to complete the purchase?</p>
                <CardElement />
                <button className='btn btn-lg btn-primary' onClick={this.submit}>Send</button>
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
                    <CardForm />
                </Elements>
            </div>
        )
    }
}

export default () => {
    return (
        <StripeProvider apiKey="pk_live_sOoLWWPaOzjSvtlcc0Tq6SH700iO3VEd99">
            <Checkout />
        </StripeProvider>
    )
}