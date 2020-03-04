import React from 'react'
import Divider from '@material-ui/core/Divider'
import { withFormik } from "formik";
import TextField from '@material-ui/core/TextField'
import LeftButton from '../util/otherComponents/LeftButton'
import Typography from '@material-ui/core/Typography';

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
            <Typography variant="subtitle2">Please submit your bank account number.</Typography>
            <TextField
                required
                onChange={handleChange}
                onBlur={handleBlur}
                id="standard-required"
                label="Bank account number"
                value={values.subject}
                placeholder="1110000000"
                name="bankAccount"
                fullWidth
                style={{ marginTop: 16 }}
            />
            <Divider style={{ marginTop: 48, marginBottom: 16 }} />
            <LeftButton float type="submit" disabled={isSubmitting}>
                submit
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
