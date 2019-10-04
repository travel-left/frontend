import React, { Component } from 'react'
import { Formik, Form } from 'formik'
import FormField from '../util/forms/FormField'
import CheckoutForm from '../util/forms/CheckoutForm'
import Validator, {
    nameValidator,
    phoneValidator,
    titleValidator,
    emailValidator
} from '../util/validators'
import ExplainOrganizationId from './ExplainOrganizationId'
import Uploader from '../util/forms/Uploader'
import './Auth.css'
import { apiCall } from '../util/api'
import ReactGA from 'react-ga'
import ExplainCustomerId from './ExplainCustomerId'

function initializeReactGA() {
    ReactGA.initialize('UA-145382520-1')
    ReactGA.pageview('/profile')
}



export default class CreateProfile extends Component {
    state = {
        error: '',
        successMessage: ''
    }

    constructor(props) {
        super(props)
        if (process.env.NODE_ENV === 'production') {
            initializeReactGA()
        }

    }

    setSuccessMessage = () => {
        this.setState({ successMessage: 'Successfully submitted' })
    }

    handleSubmit = async userData => {
        const newCoord = await apiCall(
            'put',
            `/api/coordinators/${this.props.currentUser._id}`,
            userData
        )
        this.props.setCurrentUser(newCoord)
    }

    render() {
        const { currentUser } = this.props
        const { error, successMessage } = this.state
        const initialValues = {
            name: currentUser.name,
            title: currentUser.title,
            phone: currentUser.phone,
            image: currentUser.image,
            email: currentUser.email
        }

        const schema = Validator({
            name: nameValidator,
            title: titleValidator,
            phone: phoneValidator,
            email: emailValidator
        })

        return (
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-5 d-flex flex-column my-3">
                        <h1 className="text-dark pt-2">Your Account</h1>
                        {error ? (
                            <p style={{ color: 'red' }}>{error.message}</p>
                        ) : (
                                <p className="text-primary">{successMessage}</p>
                            )}

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

                                    await this.handleSubmit(coordinator)
                                    actions.setSubmitting(false)
                                    this.setSuccessMessage()
                                } catch (error) {
                                    console.error(error)
                                    this.setState({ error })
                                    actions.setSubmitting(false)
                                }
                            }}
                            render={({ isSubmitting }) => {
                                return (
                                    <Form>
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
                                            label="Email"
                                            placeholder="your@email.com"
                                        />
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
                                        <div className="p mt-2">
                                            <label className="">
                                                Organization Id{' '}
                                                <ExplainOrganizationId />
                                            </label>
                                        </div>
                                        <div className="p mt-2">
                                            {currentUser.organization}
                                        </div>
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
                        <h1 className="text-dark pt-2">Your Payment Info</h1>
                        <p>Left operates on a SaaS model. You will be charged $30 monthly.</p>
                        {currentUser.stripeCustomerId === 'a' ? (
                            <div>
                                <div className="p mt-2">
                                    <label className="">
                                        Customer Id{' '}
                                        <ExplainCustomerId />
                                    </label>
                                </div>
                                <div className="p mt-2">
                                    {currentUser.stripeCustomerId}
                                </div>
                            </div>
                        ) :
                            <div>
                                <CheckoutForm />
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}
