import React from 'react'
import { Formik, Form } from 'formik'
import FormField from '../util/forms/FormField'
import CheckBox from '../util/forms/Checkbox'
import Validator, {
    emailValidator,
    nameValidator,
    passwordValidator
} from '../util/validators'

export default ({ error, submit }) => {
    let mError = error
    const initialValues = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        orgId: '',
        createOrg: false
    }
    const schema = Validator({
        email: emailValidator,
        name: nameValidator,
        password: passwordValidator,
        confirmPassword: passwordValidator
    })

    return (
        <div className="card col-10 shadow align-self-start my-4">
            {mError ? <p style={{ color: 'red' }}>{mError.message}</p> : null}
            <div className="card-body p-4">
                <h1 className="heading">Start your Free Trial.</h1>
                <h5 className="text-dark">
                    Create your account by filling out the form below.
                </h5>
                <Formik
                    initialValues={initialValues}
                    validationSchema={schema}
                    onSubmit={async (values, actions) => {
                        const { password, confirmPassword } = values
                        if (password === confirmPassword) {
                            await submit(values)
                        } else {
                            mError = 'Passwords do not match.'
                        }
                        actions.setSubmitting(false)
                    }}
                    render={({ isSubmitting, values, setFieldValue }) => {
                        const orgIdForm = !values.createOrg ? (
                            <FormField
                                name="orgId"
                                placeholder="5d12b98a83b9787e8bb883ef"
                                label="Organization Id"
                            />
                        ) : null
                        return (
                            <Form>
                                <FormField
                                    name="name"
                                    label="Full name"
                                    placeholder="John Appleseed"
                                />
                                <FormField
                                    name="email"
                                    label="Email"
                                    type="email"
                                    placeholder="john@travel-left.com"
                                />
                                {orgIdForm}
                                <CheckBox
                                    name="createOrg"
                                    label="Create a new organization"
                                    className="pt-2"
                                    checked={values.createOrg}
                                    onChange={() => {
                                        if (values.createOrg) {
                                            setFieldValue('createOrg', false)
                                        } else {
                                            setFieldValue('createOrg', true)
                                        }
                                    }}
                                />
                                <FormField
                                    name="password"
                                    label="Password"
                                    type="password"
                                    placeholder="••••••••••••"
                                />
                                <FormField
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    placeholder="••••••••••••"
                                />
                                <button
                                    className="btn btn-lg btn-primary float-right"
                                    style={{ marginTop: '35px' }}
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    Sign Up
                                </button>
                            </Form>
                        )
                    }}
                />{' '}
            </div>
        </div>
    )
}
