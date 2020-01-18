import React from 'react'
import { withFormik } from "formik";
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import LeftButton from '../util/otherComponents/LeftButton'

const form = props => {
    const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        remove
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
            <Divider style={{ marginTop: 40, marginBottom: 25 }} />
            {remove && <LeftButton onClick={remove} color="error" disabled={isSubmitting}>
                Remove
            </LeftButton>}
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
        phone,
        remove
    }) => {
        return {
            name: name || "",
            phone: phone || "",
            email: email || "",
            remove: remove || null
        };
    },

    handleSubmit: (values, { setSubmitting, props }) => {
        props.submit(values).then(() => setSubmitting(false))
    }
})(form)

export default ({ submit, name, phone, email, remove }) => {

    return (
        <Form submit={submit} name={name} phone={phone} email={email} remove={remove} />
    )
}
