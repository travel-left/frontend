import React, { Component } from 'react'
import { apiCall } from './util/api'
import { Formik, Form } from 'formik'
import FormField from './util/forms/FormField'
import * as Yup from 'yup'
import ReactGA from 'react-ga'
function initializeReactGA() {
    ReactGA.initialize('UA-145382520-1')
    ReactGA.pageview('/support')
}


export default class Support extends Component {
    state = {
        successMessage: ''
    }

    constructor(props) {
        super(props)
        if (process.env.NODE_ENV === 'production') {
            initializeReactGA()
        }
    }

    sendEmail = async email => {
        const formattedEmail = {
            subject:
                'SUPPORT TICKET from ' +
                this.props.currentUser.name +
                ' -- ' +
                email.subject,
            body: email.body
        }

        await apiCall('post', '/api/communicate/email', {
            subject: formattedEmail.subject,
            body: formattedEmail.body,
            emails: ['jordan@travel-left.com']
        }, true)
        this.setState({
            successMessage:
                'Thanks for submitting. Someone from our team will be with you shortly.'
        })
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
                    <div className="col-md-7 d-flex flex-column my-3">
                        <h1 className="text-dark pt-2">
                            Feature request? Need assistance? Found a bug?
                        </h1>
                        <h3> </h3>
                        <h4>
                            Fill out the form below and we will respond asap.
                        </h4>
                        <Formik
                            validationSchema={emailSchema}
                            onSubmit={async (
                                values,
                                { resetForm, setSubmitting }
                            ) => {
                                await this.sendEmail(values)
                                setSubmitting(false)
                            }}
                        >
                            <Form>
                                <FormField
                                    name="subject"
                                    label="Subject*"
                                    placeholder="Your email subject"
                                />
                                <FormField
                                    name="body"
                                    label="Body*"
                                    component="textarea"
                                    placeholder="Your email body"
                                    className="d-block"
                                />
                                <button
                                    className="btn btn-lg btn-primary float-right m-4"
                                    type="submit"
                                >
                                    SEND
                                </button>
                            </Form>
                        </Formik>
                        <p className="text-primary">
                            {' '}
                            {this.state.successMessage}
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}
