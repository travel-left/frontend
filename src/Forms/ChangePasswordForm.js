import React from 'react'
import { withFormik } from "formik";
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import LeftButton from '../util/otherComponents/LeftButton';

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
                label="Password"
                value={values.password}
                placeholder="New passowrd"
                name="password"
                type="password"
                fullWidth
                style={{ marginTop: 0 }}
            />
            <TextField
                required
                onChange={handleChange}
                onBlur={handleBlur}
                id="standard-required"
                label="Confirm Password"
                value={values.confirmPassword}
                placeholder="Confirm passowrd"
                name="confirmPassword"
                type="password"
                fullWidth
            />
            <Divider style={{ marginTop: 48, marginBottom: 16 }} />
            <LeftButton type="submit" disabled={isSubmitting} float>
                CHANGE PASSWORD
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
