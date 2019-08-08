import React from 'react'
import { Formik, Form } from 'formik'
import FormField from '../util/forms/FormField'
import Validator, {
    emailValidator,
    nameValidator,
    fileValidator,
    phoneValidator,
    titleValidator
} from '../util/validators'
import Uploader from '../util/forms/Uploader'
import './Auth.css'

export default ({ onAuth, history }) => {
    const { state } = history.location
    let mError = state.error
    const initialValues = {
        name: state.name,
        email: state.email,
        password: state.password,
        title: '',
        phone: '',
        image: '',
        organization: {
            image: '',
            name: '',
            website: ''
        }
    }

    const schema = Validator({
        email: emailValidator,
        name: nameValidator,
        title: titleValidator,
        phone: phoneValidator,
        organization: Validator({
            name: nameValidator,
            website: fileValidator
        })
    })

    return (
        <div className="container">
            <h1 className="display-4 text-dark font-weight-bold py-4 mx-5">
                Let's set up your profile and company!
            </h1>
            {mError ? <p style={{ color: 'red' }}>{mError.message}</p> : null}
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
                    } catch (err) {
                        console.error(err)
                        mError = err
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
                                        label="Name"
                                        placeholder="John Appleseed"
                                    />
                                    <FormField
                                        name="email"
                                        label="Email"
                                        type="email"
                                        placeholder="john@travel-left.com"
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
                                        placeholder="1234567890"
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
                                        label="Name"
                                        placeholder="Travel LEFT"
                                    />
                                    <FormField
                                        name="organization.website"
                                        label="Website"
                                        placeholder="www.travel-left.com"
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
