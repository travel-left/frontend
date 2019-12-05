import React, { Component } from 'react'
import { CardElement, injectStripe, Elements, StripeProvider } from 'react-stripe-elements'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import Snack from '../util/otherComponents/Snack'
import { apiCall } from '../util/api'
import { setCurrentUser } from '../util/redux/actions/auth'

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
        let token = await this.props.stripe.createToken({ name: "Name" })

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
            let response = await apiCall('POST', "/api/stripe", {
                token: token.token.id
            }, true)
            this.setState({
                snack: {
                    show: true,
                    variant: 'success',
                    message: 'Success!'
                }
            })
            if (response.message === 'Success') {
                this.props.setCurrentUser(response.user)
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
    }

    render() {
        if (this.state.complete) return <h1>Purchase Complete</h1>;

        return (
            <div className="">
                <p style={{ color: '#FF605F' }}>{this.state.error}</p>
                <p style={{ color: '#0F61D8' }}>{this.state.success}</p>

                <label style={{
                    color: 'rgba(0, 0, 0, 0.54)',
                    padding: 0,
                    fontSize: '.75rem',
                    fontFamily: "Roboto",
                    fontWeight: 400,
                    lineHeight: 1,
                    letterSpacing: '0.00938em',
                }}>Current card</label>
                <p>{this.props.currentUser.cc.length === 4 ? `**** **** **** ${this.props.currentUser.cc}` : this.props.currentUser.cc}</p>
                <label style={{
                    color: 'rgba(0, 0, 0, 0.54)',
                    padding: 0,
                    fontSize: '.75rem',
                    fontFamily: "Roboto",
                    fontWeight: 400,
                    lineHeight: 1,
                    letterSpacing: '0.00938em',
                }}>Update card</label>
                <CardElement />
                <Button onClick={this.submit} size="large" type="submit" variant="contained" color="primary" id="signup" style={{ width: '180px', height: '50px', float: 'right', marginTop: '25px' }}>
                    Save
            </Button>
                {this.state.snack.show && <Snack open={this.state.snack.show} message={this.state.snack.message} variant={this.state.snack.variant} onClose={this.closeSnack}></Snack>}
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
        <StripeProvider apiKey={`pk_live_sOoLWWPaOzjSvtlcc0Tq6SH700iO3VEd99`}>
            <Checkout />
        </StripeProvider>
    )
}