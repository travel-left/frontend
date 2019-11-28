import React, { Component } from 'react'
import './Auth.css'
import { apiCall } from '../util/api'
import Snack from '../util/Snack'
import PersonalInfoForm from './PersonalInfoForm'
import Card from '@material-ui/core/Card'

export default class Personal extends Component {
    state = {
        snack: {
            show: false,
            variant: '',
            message: ''
        }
    }

    closeSnack = () => this.setState({ snack: { show: false } })

    handleSubmit = async userData => {
        if (userData.password.length < 1)
            delete userData.password

        try {
            const newCoord = await apiCall(
                'put',
                `/api/coordinators/${this.props.currentUser._id}`,
                userData
            )
            this.props.setCurrentUser(newCoord)
            this.setState({
                snack: {
                    show: true,
                    variant: 'success',
                    message: 'Success!'
                }
            })
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
        const { name, email, title, phone, password } = this.props.currentUser

        return (
            <Card style={{ padding: 16 }}>
                <PersonalInfoForm name={name} email={email} title={title} phone={phone} submit={this.handleSubmit} password={password}></PersonalInfoForm>
                {this.state.snack.show && <Snack open={this.state.snack.show} message={this.state.snack.message} variant={this.state.snack.variant} onClose={this.closeSnack}></Snack>}
            </Card>
        )
    }
}