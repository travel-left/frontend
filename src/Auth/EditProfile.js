import React, { Component } from 'react'
import { Formik, Form } from 'formik'
import FormField from '../util/forms/FormField'
import moment from 'moment'
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
import YouMustPay from './YouMustPay'
import Snack from '../util/Snack'

function initializeReactGA() {
    ReactGA.initialize('UA-145382520-1')
    ReactGA.pageview('/profile')
}

export default class CreateProfile extends Component {
    state = {
        couponCode: '',
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

    closeSnack = () => {
        this.setState({
            snack: {
                show: false,
            }
        })
    }

    handleChange = e => {
        console.log(e)
        this.setState({ [e.target.name]: e.target.value })
    }

    handleCouponCode = async e => {
        e.preventDefault()
        if (this.state.couponCode === 'FREEMONTH') {
            try {
                await this.handleSubmit({
                    cc: 'FREE'
                })
                this.setState({
                    snack: {
                        show: true,
                        variant: 'success',
                        message: 'Your coupon code was accepted.'
                    }
                })
            } catch (err) {
                this.setState({
                    snack: {
                        show: true,
                        variant: 'error',
                        message: 'There was an error processing your coupon code.'
                    }
                })
            }


        } else {
            this.setState({
                snack: {
                    show: true,
                    variant: 'error',
                    message: 'That coupon code is invalid.'
                }
            })
        }
    }

    handleSubmit = async userData => {
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
        const { currentUser } = this.props

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

        let startDate = currentUser.createdAt.split('T')[0]
        let date = new Date()
        let today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
        var a = moment([...today.split('-')])
        var b = moment([...startDate.split('-')])
        let daysLeft = 10 - a.diff(b, 'days')

        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-10 ">
                        {currentUser.cc.length !== 4 && daysLeft <= 0 && <YouMustPay user={currentUser}></YouMustPay>}
                    </div>
                </div>
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-5 d-flex flex-column my-3">
                        <h1 className="text-dark pt-2">Your Account</h1>
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

                                } catch (error) {
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
                                <form onSubmit={this.handleCouponCode}>
                                    <label htmlFor="" className="d-block">Coupon Code</label>
                                    <div className="row">
                                        <div className="col-4">
                                            <input className="d-block form-control" type="text" name="couponCode" value={this.state.couponCode} onChange={this.handleChange} />
                                        </div>
                                        <div className="col-3 pl-1 ml-1">
                                            <button type="submit" className="btn btn-secondary" style={{ height: '34px' }}>SUBMIT</button>
                                        </div>
                                    </div>
                                </form>
                                <CheckoutForm />
                            </div>
                        }
                    </div>
                </div>
                {this.state.snack.show && <Snack open={this.state.snack.show} message={this.state.snack.message} variant={this.state.snack.variant} onClose={this.closeSnack}></Snack>}
            </div>
        )
    }
}
