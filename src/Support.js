import React, { Component } from 'react'
import { apiCall } from './util/api'
import ReactGA from 'react-ga'
import Snack from './util/Snack'
import Card from '@material-ui/core/Card'
import SupportForm from './util/forms/SupportForm'
import Typography from '@material-ui/core/Typography'

function initializeReactGA() {
    ReactGA.initialize('UA-145382520-1')
    ReactGA.pageview('/support')
}


export default class Support extends Component {
    state = {
        successMessage: '',
        snack: {
            show: false,
            variant: '',
            message: ''
        }
    }

    constructor(props) {
        super(props)
        if (process.env.NODE_ENV === 'production') {
            initializeReactGA()
        }
    }

    closeSnack = () => (this.setState({ snack: { show: false } }))

    sendEmail = async email => {
        const formattedEmail = {
            subject:
                'SUPPORT TICKET from ' +
                this.props.currentUser.name +
                ' -- ' +
                email.subject,
            body: email.message
        }

        try {
            await apiCall('post', '/api/communicate/email', {
                subject: formattedEmail.subject,
                body: formattedEmail.body,
                emails: ['jordan@travel-left.com']
            }, true)
            this.setState({
                snack: {
                    show: true,
                    variant: 'success',
                    message: 'Thanks for submitting. Someone from our team will be with you shortly.'
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
        return (
            <div className="container">
                <div className="d-flex justify-content-center">
                    <Card style={{ padding: 16, maxWidth: 482, marginTop: 128 }}>
                        <Typography variant="h5">Feature request? Need assistance? Found a bug?</Typography>
                        <Typography variant="h6">Fill out the form below and we will respond asap.</Typography>
                        <SupportForm submit={this.sendEmail}></SupportForm>
                    </Card>
                </div>
                {this.state.snack.show && <Snack open={this.state.snack.show} message={this.state.snack.message} variant={this.state.snack.variant} onClose={this.closeSnack}></Snack>}
            </div>
        )
    }
}
