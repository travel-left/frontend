import React, { Component } from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'
import './Auth.css'
import Paper from '@material-ui/core/Paper'
import Snack from '../util/otherComponents/Snack'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

export default class Auth extends Component {
    state = {
        snack: {
            show: false,
            variant: '',
            message: ''
        }
    }
    closeSnack = () => (this.setState({ snack: { show: false } }))

    login = async state => {
        const { onAuth, history } = this.props

        try {
            await onAuth('signin', state, history)
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

    signUp = async coordinator => {
        const { onAuth, history } = this.props

        try {
            await onAuth('signup', coordinator, history)
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

    handleSwitch = e => {
        const route = e.target.name === 'sign in' ? '/signup' : '/signin'
        return this.props.history.push(route)
    }

    render() {
        const { type } = this.props
        const form = type === 'sign in' ? <SignIn submit={this.login} /> : <SignUp submit={this.signUp} />
        const text = type === 'sign up' ? {
            header: 'Do you already have an account?',
            body: "That's awesome!  You can login by clicking on the button below.",
            button: 'Sign in'
        } : {
                header: "Don't have an account?",
                body: 'No problem!  You can make one by clicking on the button below.',
                button: 'Sign up'
            }

        return (
            <div className="row">
                <Paper className="col-sm-12 col-md-6 d-flex flex-column align-items-center justify-content-center" style={{
                    zIndex: 15
                }}>

                    {form}
                    <span className="footer-text" style={{ marginTop: '15px', marginBottom: '25px' }}>© 2019 Travel Left, Inc.</span>

                </Paper>
                <div className="col-sm-12 col-md-6 px-0">
                    <div style={{
                        minHeight: 600,
                        height: 'calc(100vh - 80px)', backgroundPosition: 'center',
                        backgroundSize: 'cover', objectFit: 'cover'
                    }}>
                        <div className="bg-image" />
                        <div className="container px-5 right text-left">
                            <Typography variant="h4" gutterBottom>
                                {text.header}
                            </Typography>
                            <h2 className="Auth-side-message">{text.body}</h2>
                            {/* material ui wont register click on label when text is switched so putting a transparent native element on top of it */}
                            <Button variant="contained" color="secondary" className="p-0" disableRipple style={{ height: 50, width: 180, marginTop: 16 }}>
                                <button onClick={this.handleSwitch} name={type} style={{
                                    backgroundColor: 'transparent', border: 'none', height: 50, width: 180, fontFamily: "Roboto",
                                    fontWeight: '500',
                                    letterSpacing: '0.02857em',
                                    textTransform: 'uppercase',
                                    color: 'white'
                                }}>
                                    {text.button}
                                </button>
                            </Button>
                        </div>
                    </div>
                </div>
                {this.state.snack.show && <Snack open={this.state.snack.show} message={this.state.snack.message} variant={this.state.snack.variant} onClose={this.closeSnack}></Snack>}
            </div>
        )
    }
}
