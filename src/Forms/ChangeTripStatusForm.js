import React from 'react'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select'
import { withFormik } from "formik"
import { tripStatus } from '../util/globals'
import * as Yup from 'yup'

const form = props => {
    const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit
    } = props

    const options = tripStatus.map(status => (
        <MenuItem value={status}>{status}</MenuItem>
    ))
    return (
        <form onSubmit={handleSubmit} style={{ marginTop: 41 }}>
            <Select
                required
                id="standard-required"
                label="Status"
                value={values.status}
                placeholder="New status"
                onChange={handleChange}
                onBlur={handleBlur}
                name="status"
                type="text"
                error={touched.status && Boolean(errors.status)}
                helperText={touched.status ? errors.status : ""}
                fullWidth
            >
                {options}
            </Select>
            <Divider style={{ marginTop: 40 }} />
            <Button size="large" type="submit" id="status" variant="contained" color="primary" style={{ width: '180px', height: '50px', float: 'right', marginTop: '25px' }} disabled={isSubmitting}>
                Submit
            </Button>
        </form>
    )
}

const Form = withFormik({
    mapPropsToValues: ({
        status,
    }) => {
        return {
            status
        };
    },
    validationSchema: Yup.object().shape({
        status: Yup.string()
            .required("Enter your status")
    }),
    handleSubmit: (values, { setSubmitting, props }) => {
        props.submit(values).then(() => setSubmitting(false))
    }
})(form)

export default ({ submit, status }) => {
    return <Form submit={submit} status={status} />
}
