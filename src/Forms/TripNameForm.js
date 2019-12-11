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
            <TextField
                required
                id="standard-required"
                label="Trip name"
                value={values.name}
                placeholder="A name for trip"
                onChange={handleChange}
                onBlur={handleBlur}
                name="name"
                type="text"
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name ? errors.name : ""}
                fullWidth
                initialValues={{ name: values.name }}
            />
            <Divider style={{ marginTop: 40 }} />
            <Button size="large" type="submit" id="status" variant="contained" color="primary" style={{ width: '180px', height: '50px', float: 'right', marginTop: '25px' }} disabled={isSubmitting}>
                Submit
            </Button>
        </form>
    )
}

const Form = withFormik({
    mapPropsToValues: ({
        name,
    }) => {
        return {
            name
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string()
            .required("Enter a trip name")
    }),
    handleSubmit: (values, { setSubmitting, props }) => {
        props.submit(values).then(() => setSubmitting(false))
    }
})(form)

export default ({ submit, name }) => {
    return <Form submit={submit} name={name} />
}
