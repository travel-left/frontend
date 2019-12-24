import React from 'react'
import Button from '@material-ui/core/Button'
import { withFormik } from "formik";
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'

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
                onChange={handleChange}
                onBlur={handleBlur}
                label="Personal Notes"
                value={values.personalNotes}
                placeholder="Personal notes"
                name="personalNotes"
                type="text"
                fullWidth
            />}
            {fields.hasPaymentAmount && <TextField
                onChange={handleChange}
                onBlur={handleBlur}
                label="Payment"
                value={values.paymentAmount}
                placeholder="Payment placeholder"
                name="paymentAmount"
                type="text"
                fullWidth
            />}
            {fields.hasImage && <TextField
                onChange={handleChange}
                onBlur={handleBlur}
                label="Image"
                value={values.paymentAmount}
                placeholder="Image placeholder"
                name="imate"
                type="text"
                fullWidth
            />}
            <Divider style={{ marginTop: 40 }} />
            <Button size="large" type="submit" variant="contained" color="primary" style={{ width: '180px', height: '50px', float: 'right', marginTop: '25px' }} disabled={isSubmitting}>
                Submit
            </Button>
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
