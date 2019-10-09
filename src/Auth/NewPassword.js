import React, { Component } from 'react'
import { Formik, Form } from 'formik'
import FormField from '../util/forms/FormField'
import { apiCall } from '../util/api'

export default class NewPassword extends Component {
    state = {
        error: null
    }

    submit = async ({ password, confirmPassword }) => {
        if (password !== confirmPassword || password === '') {
            const error = new Error('Passwords must be equal')
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
        const initialValues = {
            password: '',
            confirmPassword: ''
        }

        return (
            <div className="container d-flex justify-content-center align-items-center">
                <div className="col-8 d-flex mt-5 d-flex justify-content-center align-items-center">
                    <div className="card shadow">
                        {this.error ? (
                            <p style={{ color: 'red' }}>{this.error.message}</p>
                        ) : null}
                        <div className="card-body p-4">
                            <h1 className="heading">Change Password</h1>
                            <h5 className="text-dark">
                                Change the password of your account.
                            </h5>
                            <Formik
                                initialValues={initialValues}
                                onSubmit={async (values, actions) => {
                                    await this.submit(values)
                                    actions.setSubmitting(false)
                                }}
                                render={({ isSubmitting }) => (
                                    <Form>
                                        <FormField
                                            name="password"
                                            label="Password*"
                                            type="password"
                                            placeholder="••••••••••••"
                                        />
                                        <FormField
                                            name="confirmPassword"
                                            label="Confirm Password*"
                                            type="password"
                                            placeholder="••••••••••••"
                                        />
                                        <button
                                            className="btn btn-lg btn-primary float-right"
                                            style={{ marginTop: '35px' }}
                                            type="submit"
                                            disabled={isSubmitting}
                                        >
                                            Change Password
                                        </button>
                                    </Form>
                                )}
                            />{' '}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
