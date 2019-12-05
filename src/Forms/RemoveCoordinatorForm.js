import React from 'react'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import { withFormik } from "formik"
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

    return (
        <form onSubmit={handleSubmit}>
            <p className='TripInfo-description'>Are you sure you want to remove this coordinator? Press submit to remove.</p>
            <Divider style={{ marginTop: 40 }} />
            <Button size="large" type="submit" id="status" variant="contained" color="error" style={{ width: '180px', height: '50px', float: 'right', marginTop: '25px' }} disabled={isSubmitting}>
                Remove
            </Button>
        </form>
    )
}

const Form = withFormik({
    handleSubmit: (values, { setSubmitting, props }) => {
        props.submit().then(() => setSubmitting(false))
    }
})(form)

export default ({ submit, name }) => {
    return <Form submit={submit} />
}
