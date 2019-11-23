import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { withFormik } from "formik";
import * as Yup from 'yup'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'

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
    } = props

    const [fromOrg, setFromOrg] = useState(false)


    return (
        <form onSubmit={handleSubmit}>
            {fromOrg ? <p>select a coordinator from your org</p> : (
                <>
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
                        placeholder="Email address"
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
                        label="Phone"
                        value={values.phone}
                        placeholder="Phone number"
                        name="phone"
                        type="text"
                        error={touched.phone && Boolean(errors.phone)}
                        helperText={touched.phone ? errors.phone : ""}
                        fullWidth
                    />
                    <TextField
                        required
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id="standard-required"
                        label="Title"
                        value={values.title}
                        placeholder="Coordinator's title"
                        name="title"
                        type="text"
                        error={touched.title && Boolean(errors.title)}
                        helperText={touched.title ? errors.title : ""}
                        fullWidth
                    />
                </>
            )
            }
            <Divider style={{ marginTop: 40 }} />
            <Button onClick={() => setFromOrg(true)} size="large" variant="contained" color="secondary" style={{ width: '180px', height: '50px', marginTop: '25px' }}>
                Add from org
            </Button>
            <Button size="large" type="submit" variant="contained" color="primary" style={{ width: '180px', height: '50px', float: 'right', marginTop: '25px' }} disabled={isSubmitting}>
                Submit
            </Button>
        </form>
    )
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
        phone: Yup.string().required("Required"),
        title: Yup.string().required("Required"),
    }),

    handleSubmit: (values, { setSubmitting, props }) => {
        props.submit(values).then(() => setSubmitting(false))
    }
})(form)

export default ({ submit }) => {

    return (
        <Form submit={submit} />
    )
}
