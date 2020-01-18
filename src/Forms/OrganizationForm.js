import React from 'react'
import { withFormik } from "formik";
import * as Yup from 'yup'
import TextField from '@material-ui/core/TextField'
import LeftButton from '../util/otherComponents/LeftButton'
import Divider from '@material-ui/core/Divider'

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
            <Divider style={{ marginTop: 40, marginBottom: 25 }} />
            <LeftButton float type="submit" disabled={isSubmitting}>
                Submit
            </LeftButton>
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
