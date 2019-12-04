import React, { Component } from 'react'
import { apiCall } from '../util/api'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import ChangePasswordForm from './ChangePasswordForm'

export default class NewPassword extends Component {
    state = {
        error: null
    }

    submit = async ({ password, confirmPassword }) => {
        if (password !== confirmPassword || password === '') {
            const error = new Error('Passwords must match')
            this.setState({ error })
            return
        }
        const { coordinatorId, history } = this.props
        const user = {
            password,
            lastChangedPassword: new Date()
        }
        try {
            await apiCall('put', `/api/coordinators/${coordinatorId}`, user, true)
        } catch (error) {
            this.setState({
                error
            })
            return
        }
        history.push('/')
    }

    render() {
        return (
            <div className="container">
                <div className="d-flex justify-content-center">
                    <Card style={{ padding: 16, maxWidth: 482, marginTop: 128 }}>
                        {this.state.error ? (
                            <p style={{ color: 'red' }}>{this.state.error.message}</p>
                        ) : null}
                        <Typography variant="h5">Change Password</Typography>
                        <Typography variant="h6">   Change the password of your account.</Typography>
                        <ChangePasswordForm submit={this.submit}></ChangePasswordForm>
                    </Card >
                </div>
            </div >
        )
    }
}
