import React, { Component } from 'react'
import SidePicture from './SidePicture'
import SignIn from './SignIn'
import SignUp from './SignUp'
import './Auth.css'
import Paper from '@material-ui/core/Paper'
import Snack from '../util/otherComponents/Snack'

export default class Auth extends Component {
    state = {
        snack: {
            show: false,
            variant: '',
            message: ''
        },
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
        e.preventDefault()
        const route = e.target.name === 'sign in' ? '/signup' : '/signin'
        return this.props.history.push(route)
    }

    render() {
        const { type } = this.props
        const form = type === 'sign in' ? <SignIn submit={this.login} /> : <SignUp submit={this.signUp} />

        return (
            <div className="row">
                <Paper className="col-sm-12 col-md-6 d-flex flex-column align-items-center justify-content-center" style={{
                    zIndex: 15
                }}>

                    {form}
                    <span className="footer-text" style={{ marginTop: '15px', marginBottom: '25px' }}>© 2019 Travel Left, Inc.</span>

                </Paper>
                <div className="col-sm-12 col-md-6 px-0">
                    <SidePicture onClick={this.handleSwitch} type={type} />
                </div>
                {this.state.snack.show && <Snack open={this.state.snack.show} message={this.state.snack.message} variant={this.state.snack.variant} onClose={this.closeSnack}></Snack>}
            </div>
        )
    }
}
