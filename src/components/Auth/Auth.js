import React, { Component } from 'react'
import SidePicture from './SidePicture'
import SignIn from './SignIn'
import SignUp from './SignUp'
import './Auth.css'

export default class Auth extends Component {
    state = {
        error: ''
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

    signUp = async formInfo => {
        const { onAuth, history } = this.props
        try {
            if (formInfo.createOrg) {
                // Do some stuff
                throw new Error('Not implemented yet')
                await onAuth('signin?newOrg=true', formInfo)
                history.push('/trips')
            } else {
                const newCoordinator = createNewCoordinator(formInfo)
                await onAuth('signup', newCoordinator)
                history.push('/trips')
            }
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
        const form = type === 'sign in' ? <SignIn error={error} submit={this.login} /> : <SignUp error={error} submit={this.signUp} />
        return (
            <div className="row">
                <div className="col-sm-12 col-md-6 d-flex justify-content-center">{form}</div>
                <div className="col-sm-12 col-md-6">
                    <SidePicture onClick={this.handleSwitch} type={type} />
                </div>
            </div>
        )
    }
}

const createNewCoordinator = formInfo => {
    const { name, email, password, orgId } = formInfo

    const names = name.split(' ')

    const [fName] = names
    const lName = names.length > 1 ? names[names.length - 1] : ''

    return {
        firstName: fName,
        lastName: lName,
        email: email,
        password: password,
        organizationId: orgId
    }
}
