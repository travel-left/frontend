import React from 'react'
import { Formik, Form } from 'formik'
import FormField from '../util/forms/FormField'
import Validator, {
    emailValidator,
    passwordValidator
} from '../util/validators'

export default ({ error, submit }) => {
    const initialValues = {
        email: '',
        password: ''
    }
    const schema = Validator({
        email: emailValidator,
        password: passwordValidator
    })

    return (
        <div className="card col-10 shadow align-self-start my-5">
            {error ? <p style={{ color: 'red' }}>{error.message}</p> : null}
            <div className="card-body p-4">
                <h1 className="Auth-title">Sign In.</h1>
                <h5 className="text-dark">Sign in to your account.</h5>
                <Formik
                    initialValues={initialValues}
                    validationSchema={schema}
                    onSubmit={async (values, actions) => {
                        await submit(values)
                        actions.setSubmitting(false)
                    }}
                    render={({ isSubmitting }) => (
                        <Form>
                            <FormField
                                name="email"
                                label="Email"
                                type="email"
                                placeholder="your email"
                            />
                            <FormField
                                name="password"
                                label="Password"
                                type="password"
                                placeholder="••••••••••••"
                            />
                            <button
                                className="btn btn-lg btn-primary float-right"
                                style={{ marginTop: '35px' }}
                                type="submit"
                                disabled={isSubmitting}
                            >
                                Log In
                            </button>
                        </Form>
                    )}
                />{' '}
            </div>
        </div>
    )
}
