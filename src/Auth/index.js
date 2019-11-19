import React, { Component } from 'react'
import SidePicture from './SidePicture'
import SignIn from './SignIn'
import SignUp from './SignUp'
import './Auth.css'
import Snack from '../util/Snack'

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
            console.error(err)
            this.setState({
                snack: {
                    snack: {
                        show: true,
                        variant: 'error',
                        message: 'An error occurred.'
                    }
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
        switch (e.target.name) {
            case 'sign in':
                return this.props.history.push('/signup')
            case 'sign up':
                return this.props.history.push('/signin')
            default:
                break
        }
    }

    render() {
        const { type } = this.props
        const { error } = this.state
        const form =
            type === 'sign in' ? (
                <SignIn error={error} submit={this.login} />
            ) : (
                    <SignUp error={error} submit={this.signUp} />
                )
        return (
            <div className="row">
                <div className="col-sm-12 col-md-6 d-flex flex-column align-items-center" style={{
                    marginTop: '10vh',
                    marginBottom: '10vh'
                }}>
                    {form}
                    <span className="footer-text" style={{ marginTop: '15px' }}>© 2019 Travel Left, Inc.</span>
                </div>

                <div className="col-sm-12 col-md-6 px-0">
                    <SidePicture onClick={this.handleSwitch} type={type} />
                </div>
                {this.state.snack.show && <Snack open={this.state.snack.show} message={this.state.snack.message} variant={this.state.snack.variant} onClose={this.closeSnack}></Snack>}
            </div>
        )
    }
}

const createNewCoordinator = formInfo => {
    const { name, email, password, orgId } = formInfo

    return {
        name,
        email,
        password,
        organization: orgId
    }
}
