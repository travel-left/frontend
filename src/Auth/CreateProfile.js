import React, { Component } from 'react'
import { Formik, Form } from 'formik'
import FormField from '../util/forms/FormField'
import Validator, {
    emailValidator,
    nameValidator,
    phoneValidator,
    titleValidator,
    urlValidator
} from '../util/validators'
import Uploader from '../util/forms/Uploader'
import './Auth.css'

export default class CreateProfile extends Component {
    state = {
        error: this.props.history.location.state.error
    }

    render() {
        const { error } = this.state
        const { onAuth, history } = this.props
        const { name, email, password } = this.props.location.state
        const initialValues = {
            name,
            email,
            password,
            title: '',
            phone: '',
            image: 'https://',
            organization: {
                image: 'https://',
                name: '',
                website: 'https://'
            }
        }

        const schema = Validator({
            email: emailValidator,
            name: nameValidator,
            title: titleValidator,
            phone: phoneValidator,
            organization: Validator({
                name: nameValidator,
                website: urlValidator
            })
        })

        return (
            <div className="container">
                <h1 className="text-dark py-4 mx-5">
                    Let's set up your profile and company!
                </h1>
                {error ? <p style={{ color: 'red' }}>{error.message}</p> : null}
                <Formik
                    initialValues={initialValues}
                    validationSchema={schema}
                    onSubmit={async (values, actions) => {
                        try {
                            const coordinator = {
                                email: values.email,
                                image: values.image,
                                name: values.name,
                                phone: values.phone,
                                title: values.title,
                                password: values.password
                            }
                            const { organization } = values
                            await onAuth(
                                'signup?newOrg=true',
                                { coordinator, organization },
                                history
                            )
                        } catch (error) {
                            console.error(error)
                            this.setState({ error })
                            actions.setSubmitting(false)
                        }
                    }}
                    render={({ isSubmitting }) => {
                        return (
                            <Form>
                                <div className="row">
                                    <div className="col-sm-12 col-md-6">
                                        <FormField
                                            name="image"
                                            label="Upload a profile picture"
                                            component={Uploader}
                                        />
                                        <FormField
                                            name="name"
                                            label="Name*"
                                            placeholder="John Appleseed"
                                        />
                                        <FormField
                                            name="email"
                                            label="Email*"
                                            type="email"
                                            placeholder="your email"
                                        />
                                        <FormField
                                            name="title"
                                            label="Title"
                                            placeholder="Travel Coordinator"
                                        />
                                        <FormField
                                            name="phone"
                                            label="Phone Number"
                                            type="tel"
                                            placeholder="your phone number"
                                        />
                                    </div>
                                    <div className="col-sm-12 col-md-6">
                                        <FormField
                                            name="organization.image"
                                            label="Upload an Image for your Organization"
                                            component={Uploader}
                                        />
                                        <FormField
                                            name="organization.name"
                                            label="Name*"
                                            placeholder="Travel LEFT"
                                        />
                                        <FormField
                                            name="organization.website"
                                            label="Website"
                                            placeholder="https://travel-left.com"
                                            type="url"
                                        />
                                    </div>
                                </div>
                                <button
                                    className="btn btn-lg btn-primary float-right m-4"
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    SAVE
                                </button>
                            </Form>
                        )
                    }}
                />
            </div>
        )
    }
}
