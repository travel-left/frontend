import React from 'react'
import { withFormik } from "formik"
import TextField from '@material-ui/core/TextField'
import LeftButton from '../util/otherComponents/LeftButton'
import * as Yup from 'yup'
import Divider from '@material-ui/core/Divider'

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

    return (
        <form onSubmit={handleSubmit}>
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
                onChange={handleChange}
                onBlur={handleBlur}
                label="Create new password"
                value={values.password}
                placeholder="Create a password"
                name="password"
                type="password"
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password ? errors.password : ""}
                fullWidth
            />
            <TextField
                onChange={handleChange}
                onBlur={handleBlur}
                id="standard-required"
                label="Title"
                value={values.title}
                placeholder="Your title"
                name="title"
                type="text"
                fullWidth
            />
            <TextField
                onChange={handleChange}
                onBlur={handleBlur}
                id="standard-required"
                label="Phone number"
                value={values.phone}
                placeholder="Your phone number"
                name="phone"
                type="text"
                fullWidth
            />
            <Divider style={{ marginTop: 40, marginBottom: 25 }} />
            <LeftButton float type="submit" disabled={isSubmitting}>
                Submit
            </LeftButton>
        </form>
    )
}

const Form = withFormik({
    mapPropsToValues: ({
        name,
        email,
        password,
        title,
        phone
    }) => {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            title: title || "",
            phone: phone || ""
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required("Required"),
        email: Yup.string()
            .email("Enter a valid email")
            .required("Email is required"),
        password: Yup.string()
            .min(8, "Password must contain at least 8 characters")
    }),

    handleSubmit: (values, { setSubmitting, props }) => {
        props.submit(values).then(() => setSubmitting(false))
    }
})(form)

export default ({ submit, name, email, phone, password, title }) => {
    return (
        <Form submit={submit} name={name} email={email} phone={phone} password={password} title={title} />
    )
}
