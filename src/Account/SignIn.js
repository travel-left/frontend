import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { withFormik } from "formik";
import * as Yup from 'yup'
import LeftButton from '../util/otherComponents/LeftButton'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
    card: {
        minHeight: 345,
        width: 358,
        padding: '35px 23px'
    },
    leftSubHeader: {
        fontFamily: 'OpenSans-SemiBold',
        fontSize: '14px',
        color: '#A1A1A1',
        letterSpacing: '0.3px',
        textAlign: 'center'
    },
    title: {
        textAlign: 'center'
    },
    button: {
        backgroundColor: 'transparent',
        width: '180px',
        height: '50px',
        '&:hover': {
            color: theme.palette.primary.main,
            backgroundColor: 'transparent',
        },
        '&:active': {
            color: theme.palette.primary.main,
            backgroundColor: 'transparent',
        }
    }
}))

const form = props => {
    const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        handleSwitch,
    } = props

    const classes = useStyles()

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                required
                id="standard-required"
                label="Email"
                value={values.email}
                placeholder="Your email address"
                onChange={handleChange}
                onBlur={handleBlur}
                name="email"
                type="email"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email ? errors.email : ""}
                fullWidth
            />
            <TextField
                required
                id="standard-required"
                label="Password"
                value={values.password}
                placeholder="Enter your password"
                onChange={handleChange}
                onBlur={handleBlur}
                name="password"
                type="password"
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password ? errors.password : ""}
                fullWidth
            />
            <div style={{ marginTop: 56, display: 'flex', justifyContent: 'space-between' }}>
                <Button color="secondary" onClick={() => handleSwitch('signup')} className={classes.button} disableRipple>
                    Sign up
                </Button>
                <LeftButton type="submit" id="signin" disabled={isSubmitting}>
                    Sign in
                </LeftButton>
            </div>
        </form>
    )
}

const Form = withFormik({
    mapPropsToValues: ({
        email,
        password
    }) => {
        return {
            email: email || "",
            password: password || "",
        };
    },

    validationSchema: Yup.object().shape({
        email: Yup.string()
            .email("Enter a valid email")
            .required("Email is required"),
        password: Yup.string()
            .min(8, "Password must contain at least 8 characters")
            .required("Enter your password"),
    }),

    handleSubmit: (values, { setSubmitting, props }) => {
        props.submit(values).then(() => setSubmitting(false))
    }
})(form)

export default ({ submit, handleSwitch }) => {
    const classes = useStyles()

    return (
        <>
            <Typography variant="h5" className={classes.title}>
                Welcome back!
            </Typography>
            <span className={classes.leftSubHeader}>Please sign into your account.</span>
            <Form submit={submit} handleSwitch={handleSwitch} />
        </>
    )
}
