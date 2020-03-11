import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { withFormik } from "formik";
import * as Yup from 'yup'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import LeftButton from '../util/otherComponents/LeftButton'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
    card: {
        minHeight: 425,
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
        handleSwitch
    } = props

    const classes = useStyles()

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                required
                onChange={handleChange}
                onBlur={handleBlur}
                id="standard-required"
                label="Organization name"
                value={values.orgName}
                placeholder="The name of your organization"
                name="orgName"
                error={touched.orgName && Boolean(errors.orgName)}
                helperText={touched.orgName ? errors.orgName : ""}
                fullWidth
            />
            <TextField
                required
                onChange={handleChange}
                onBlur={handleBlur}
                id="standard-required"
                label="Your full name"
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
            <div style={{ marginTop: 56, display: 'flex', justifyContent: 'space-between' }}>
                <Button color="secondary" id="signin" onClick={() => handleSwitch('signin')} className={classes.button} disableRipple>
                    Sign in
                </Button>
                <LeftButton type="submit" id="signup" disabled={isSubmitting}>
                    Sign up
                </LeftButton>
            </div>
        </form>
    )
}

const Form = withFormik({
    mapPropsToValues: ({
        name,
        email,
        password,
        orgName
    }) => {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            orgName: orgName || ""
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required("Required"),
        orgName: Yup.string().required("Required"),
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
                Start your free trial.
            </Typography>
            <span className={classes.leftSubHeader}>Create your account by filling out the form below.</span>
            <Form submit={submit} handleSwitch={handleSwitch} />
        </>
    )
}
