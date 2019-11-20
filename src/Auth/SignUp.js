import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { withFormik } from "formik";
import * as Yup from 'yup'
import Card from '@material-ui/core/Card'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
    card: {
        minHeight: 425,
        width: 358,
        padding: '35px 23px'
    },
    leftSubHeader: {
        fontFamily: 'OpenSans-SemiBold',
        fontSize: '14px',
        color: '#A1A1A1',
        letterSpacing: '0.3px'
    }
})

const form = props => {
    const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset
    } = props

    return (<form onSubmit={handleSubmit}>
        <TextField
            required
            onChange={handleChange}
            onBlur={handleBlur}
            id="standard-required"
            label="Full Name"
            value={values.name}
            placeholder="Your full name"
            name="name"
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name ? errors.name : ""}
            fullWidth
        />
        <TextField
            required
            onChange={handleChange}
            onBlur={handleBlur}
            id="standard-required"
            label="Email"
            value={values.email}
            placeholder="Your email address"
            name="email"
            type="email"
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email ? errors.email : ""}
            fullWidth
        />
        <TextField
            required
            onChange={handleChange}
            onBlur={handleBlur}
            id="standard-required"
            label="Password"
            value={values.password}
            placeholder="Create a password"
            name="password"
            type="password"
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password ? errors.password : ""}
            fullWidth
        />
        <Button size="large" type="submit" variant="contained" color="primary" style={{ width: '180px', height: '50px', float: 'right', marginTop: '25px' }} disabled={isSubmitting}>
            Sign up
        </Button>
    </form>)
}

const Form = withFormik({
    mapPropsToValues: ({
        name,
        email,
        password
    }) => {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required("Required"),
        email: Yup.string()
            .email("Enter a valid email")
            .required("Email is required"),
        password: Yup.string()
            .min(8, "Password must contain at least 8 characters")
            .required("Enter your password"),
    }),

    handleSubmit: (values, { setSubmitting, props }) => {
        console.log('hello')
        console.log(values)
        props.submit(values).then(() => setSubmitting(false))
    }
})(form)

export default ({ submit }) => {
    const classes = useStyles()

    return (
        <Card className={classes.card} >
            <Typography variant="h5" >
                Start your free trial.
            </Typography>
            <span className={classes.leftSubHeader}>Create your account by filling out the form below.</span>
            <Form submit={submit} />
        </Card>
    )
}
