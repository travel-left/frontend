import React, { Component } from 'react'
import { apiCall } from './util/api'
import * as Yup from 'yup'
import ReactGA from 'react-ga'
import Snack from './util/Snack'
import Card from '@material-ui/core/Card'
import SupportForm from './util/forms/SupportForm'

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
            body: email.body
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
        const emailSchema = Yup.object().shape({
            subject: Yup.string()
                .min(2, 'Please enter a longer subject')
                .max(200, 'Please enter a shorter subject')
                .required('Please enter a subject'),
            body: Yup.string()
                .min(2, 'Please enter a longer body')
                .max(5000, 'Please enter a shorter body')
                .required('Please enter a body')
        })
        return (
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <Card style={{ padding: 16 }}>
                        <h1 className="text-dark pt-2">
                            Feature request? Need assistance? Found a bug?
                        </h1>
                        <h3> </h3>
                        <h4>
                            Fill out the form below and we will respond asap.
                        </h4>
                        <SupportForm submit={this.sendEmail}></SupportForm>
                    </Card>
                </div>
                {this.state.snack.show && <Snack open={this.state.snack.show} message={this.state.snack.message} variant={this.state.snack.variant} onClose={this.closeSnack}></Snack>}
            </div>
        )
    }
}
