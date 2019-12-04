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
        setFieldValue
    } = props

    return (
        <form onSubmit={handleSubmit}>
            <div style={{ marginTop: 40 }}>
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
                <Divider style={{ marginTop: 40 }} />
                <Button size="large" type="submit" variant="contained" color="primary" style={{ width: '180px', height: '50px', float: 'right', marginTop: '25px' }} disabled={isSubmitting}>
                    SEND
            </Button>
            </div>
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
