import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import { apiCall } from '../util/api'
import OrganizationForm from './OrganizationForm'
import Snack from '../util/Snack'

export default class Organization extends Component {

    state = {
        org: null,
        snack: {
            show: false,
            variant: '',
            message: ''
        }
    }

    constructor(props) {
        super(props)
        this.getOrganization()
    }

    getOrganization = async () => {
        const org = await apiCall('get', `/api/organization/${this.props.currentUser.organization}`)
        this.setState({ org })
    }

    closeSnack = () => this.setState({ snack: { show: false } })

    handleSubmit = async orgData => {
        try {
            await apiCall(
                'put',
                `/api/organization/${orgData._id}`,
                { name: orgData.name }
            )

            this.setState({
                snack: {
                    show: true,
                    variant: 'success',
                    message: 'Success!'
                }
            })

            this.getOrganization()
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
        return (
            <Card style={{ padding: 16 }}>
                {/* <Typography variant="subtitle2">Your Organization ID uniquely identifies your organization.
                    If you want to add someone to your organization without adding them to a trip first, they will need this ID.</Typography> */}
                {this.state.org && <OrganizationForm submit={this.handleSubmit} name={this.state.org.name} _id={this.state.org._id}></OrganizationForm>}
                {this.state.snack.show && <Snack open={this.state.snack.show} message={this.state.snack.message} variant={this.state.snack.variant} onClose={this.closeSnack}></Snack>}
            </Card>
        )
    }
}


