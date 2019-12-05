import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import { withFormik } from "formik";
import * as Yup from 'yup'
import TextField from '@material-ui/core/TextField'

const form = props => {
    const {
        values,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                required
                onChange={handleChange}
                onBlur={handleBlur}
                label="Organization Name"
                value={values.name}
                placeholder="Your orgs name"
                name="name"
                fullWidth
            />
            {/* <TextField
                required
                onChange={handleChange}
                onBlur={handleBlur}
                label="Organization ID"
                value={values._id}
                name="_id"
                type="text"
                fullWidth
                disabled
            /> */}
            <Button size="large" type="submit" variant="contained" color="primary" id="signup" style={{ width: '180px', height: '50px', float: 'right', marginTop: '25px' }} disabled={isSubmitting}>
                Update
            </Button>
        </form>
    )
}

const Form = withFormik({
    mapPropsToValues: ({
        name,
        _id,
    }) => {
        return {
            name: name || "",
            _id: _id || ""
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required("Required"),
    }),

    handleSubmit: (values, { setSubmitting, props }) => {
        props.submit(values).then(() => setSubmitting(false))
    }
})(form)

export default ({ submit, name, _id }) => {
    return (
        <Form submit={submit} name={name} _id={_id} />
    )
}
