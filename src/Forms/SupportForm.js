import React from 'react'
import Divider from '@material-ui/core/Divider'
import { withFormik } from "formik";
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
        setFieldValue
    } = props

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                required
                onChange={handleChange}
                onBlur={handleBlur}
                id="standard-required"
                label="Subject"
                value={values.subject}
                placeholder="Email subject"
                name="subject"
                fullWidth
            />
            <TextField
                required
                onChange={handleChange}
                onBlur={handleBlur}
                id="standard-required"
                label="Message"
                value={values.message}
                placeholder="Message"
                name="message"
                fullWidth
            />
            <Divider style={{ marginTop: 40, marginBottom: 25 }} />
            <LeftButton float type="submit" disabled={isSubmitting}>
                SEND
            </LeftButton>
        </form>
    )
}

const Form = withFormik({
    handleSubmit: (values, { setSubmitting, props }) => {
        props.submit(values).then(() => setSubmitting(false))
    }
})(form)

export default ({ submit }) => {

    return (
        <Form submit={submit} />
    )
}
