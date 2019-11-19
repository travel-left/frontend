import React from 'react'
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import FormField from '../util/forms/FormField'
import CheckBox from '../util/forms/Checkbox'
import Button from '@material-ui/core/Button'
import Validator, {
    emailValidator,
    nameValidator,
    passwordValidator,
    match
} from '../util/validators'
import ExplainOrganizationId2 from './ExplainOrganizationId2'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import TextField from '@material-ui/core/TextField'
import { spacing } from '@material-ui/system'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
    card: {
        height: 425,
        width: 358,
        padding: '35px 23px',
    },
    leftSubHeader: {
        fontFamily: 'OpenSans-SemiBold',
        fontSize: '14px',
        color: '#A1A1A1',
        letterSpacing: '0.3px'
    }
})

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
        confirmPassword: match('password', 'Passwords do not match'),
        createOrg: Yup.boolean(),
        orgId: Yup.string().when('createOrg', {
            is: false,
            then: Yup.string().required(
                'Please specify the organization you wish to join.  This will be given to you by your organization administrator.'
            )
        })
    })
    const classes = useStyles()
    const theme = useTheme()
    return (
        <Card className={classes.card} >
            {mError ? <p style={{ color: 'red' }}>{mError.message}</p> : null}
            <Typography variant="h5" >
                Start your Free Trial.
      </Typography>
            <span className={classes.leftSubHeader}>Create your account by filling out the form below.</span>
            <TextField
                required
                id="standard-required"
                label="Full Name"
                // value={this.state.name}
                placeholder="Your full name"
                // onChange={this.handleOnChange}
                name="name"
                fullWidth
            />
            <TextField
                required
                id="standard-required"
                label="Email"
                // value={this.state.name}
                placeholder="Your email address"
                // onChange={this.handleOnChange}
                name="email"
                type="email"
                fullWidth
            />
            <TextField
                required
                id="standard-required"
                label="password"
                // value={this.state.name}
                placeholder="Create a password"
                // onChange={this.handleOnChange}
                name="password"
                type="password"
                fullWidth
            />
            {/* <Formik
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
                        <>
                            <FormField
                                name="orgId"
                                placeholder="5d12b98a83b9787e8bb883ef"
                                label={<span>Organization Id* <ExplainOrganizationId2 /></span>}
                            />

                        </>
                    ) : null
                    return (
                        <Form>
                            <FormField
                                name="name"
                                label="Full name*"
                                placeholder="John Appleseed"
                            />
                            <FormField
                                name="email"
                                label="Email*"
                                type="email"
                                placeholder="your email"
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
                                Sign Up
                                </button>
                        </Form>
                    )
                }}
            /> */}
            <Button size="large" variant="contained" color="primary" style={{ width: '180px', height: '50px', float: 'right', marginTop: '25px' }} onClick={() => this.setState({ isOpen: true })}>
                Sign up
                        </Button>
        </Card>
    )
}
