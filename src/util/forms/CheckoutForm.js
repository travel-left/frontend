import React, { Component } from 'react'
import { CardElement, injectStripe, Elements, StripeProvider } from 'react-stripe-elements'
import { apiCall } from '../api'
import { setCurrentUser } from '../redux/actions/auth'
import { connect } from 'react-redux'

class _CardForm extends Component {
    state = {
        complete: false,
        error: '',
        success: ''
    }

    constructor(props) {
        super(props)
    }

    submit = async ev => {
        let token = await this.props.stripe.createToken({ name: "Name" })

        if (token.error) {
            this.setState({ error: token.error.message })
        }

        try {
            let response = await apiCall('POST', "/api/stripe", {
                token: token.token.id
            })
            if (response.message === 'Success') {
                this.setState({ success: 'Your payment method has been updated!' })
                this.props.setCurrentUser(response.user)
            }
        } catch (err) {
            this.setState({ error: err.message })
        }
    }

    render() {
        if (this.state.complete) return <h1>Purchase Complete</h1>;

        return (
            <div className="">
                <p style={{ color: '#FF605F' }}>{this.state.error}</p>
                <p style={{ color: '#0F61D8' }}>{this.state.success}</p>
                <label htmlFor="">Current card</label>
                <p>{this.props.currentUser.cc.length === 4 ? `**** **** **** ${this.props.currentUser.cc}` : this.props.currentUser.cc}</p>
                <label htmlFor="">Update card</label>
                <CardElement />
                <button className='btn btn-lg btn-primary float-right m-4' onClick={this.submit}>SAVE</button>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser
    }
}

const CardForm = connect(
    mapStateToProps,
    { setCurrentUser }
)(injectStripe(_CardForm))

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