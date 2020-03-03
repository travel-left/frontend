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
        setFieldValue,
        fields
    } = props

    return (
        <form onSubmit={handleSubmit}>
            {fields.hasName && <TextField
                required
                onChange={handleChange}
                onBlur={handleBlur}
                id="standard-required"
                label="Full Name"
                value={values.name}
                placeholder="Full name"
                name="name"
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name ? errors.name : ""}
                fullWidth
                style={{ marginTop: 0 }}
            />}
            {fields.hasEmail && <TextField
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
            />}
            {fields.hasPhone && <TextField
                required
                onChange={handleChange}
                onBlur={handleBlur}
                label="Phone number"
                value={values.phone}
                placeholder="Phone number"
                name="phone"
                type="text"
                fullWidth
            />}
            {fields.hasPersonalNotes && <TextField
                required
                onChange={handleChange}
                onBlur={handleBlur}
                label="Personal Notes"
                value={values.personalNotes}
                placeholder="Personal notes"
                name="personalNotes"
                type="text"
                fullWidth
            />}
            <Divider style={{ marginTop: 48, marginBottom: 16 }} />
            <LeftButton float type="submit" disabled={isSubmitting}>
                {fields.hasPaymentAmount ? 'Continue to Payment' : 'submit'}
            </LeftButton>
        </form>
    )
}

const Form = withFormik({
    mapPropsToValues: ({ fields }) => {
        return {
            name: '',
            phone: '',
            email: '',
            personalNotes: '',
            image: ''
        }
    },
    handleSubmit: (values, { setSubmitting, props }) => {
        props.submit(values).then(() => setSubmitting(false))
    }
})(form)

export default (props) => {

    return (
        <Form {...props} />
    )
}
