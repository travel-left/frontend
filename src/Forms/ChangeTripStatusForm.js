import React from 'react'
import Divider from '@material-ui/core/Divider'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import { withFormik } from "formik"
import { tripStatus } from '../util/globals'
import * as Yup from 'yup'
import LeftButton from '../util/otherComponents/LeftButton'

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
        <form onSubmit={handleSubmit} >
            <InputLabel style={{ marginTop: 41 }}>Status</InputLabel>
            <Select
                required
                displayEmpty
                value={values.status}
                placeholder="New status"
                onChange={handleChange}
                onBlur={handleBlur}
                name="status"
                fullWidth
            >
                {options}
            </Select>
            <Divider style={{ marginTop: 40, marginBottom: 25 }} />
            <LeftButton float type="submit" disabled={isSubmitting}>
                Submit
                </LeftButton>
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
