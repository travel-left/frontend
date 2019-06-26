import React, { Component } from 'react'
import SidePicture from './SidePicture'
import SignIn from './SignIn'
import SignUp from './SignUp'
import './Auth.css'

export default class Auth extends Component {
    state = {
        error: ''
    }

    handleSubmit(e) {
        e.preventDefault()
        console.log(this.state)
        this.props
            .onAuth(this.props.type.split(' ').join(''), this.state)
            .then(() => {
                return this.props.history.push('/trips')
            })
            .catch(err => {
                console.log(err)
                this.setState({ error: err })
            })
    }

    login = async state => {
        const { onAuth, history } = this.props
        try {
            await onAuth('signin', state)
            history.push('/trips')
        } catch (err) {
            console.log(err)
            this.setState({ error: err })
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
        const form = type === 'sign in' ? <SignIn error={error} submit={this.login} /> : <SignUp error={error} submit={this.handleSubmit} />
        return (
            <div className="row no-gutters">
                <div className="col-md-12 col-lg-6 d-flex justify-content-center my-5">{form}</div>
                <div className="col-md-12 col-lg-6">
                    <SidePicture onClick={this.handleSwitch} type={type} />
                </div>
            </div>
        )
    }
}
