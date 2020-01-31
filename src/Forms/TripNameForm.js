import React from 'react'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import { withFormik } from "formik"
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

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                required
                id="standard-required"
                label="Name"
                value={values.name}
                placeholder="A name"
                onChange={handleChange}
                onBlur={handleBlur}
                name="name"
                type="text"
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name ? errors.name : ""}
                fullWidth
                initialValues={{ name: values.name }}
            />
            <TextField
                required
                id="standard-required"
                label="Description"
                value={values.description}
                placeholder="A description"
                onChange={handleChange}
                onBlur={handleBlur}
                name="description"
                type="text"
                fullWidth
            />
            <Divider style={{ marginTop: 40, marginBottom: 25 }} />
            <LeftButton type="submit" float disabled={isSubmitting}>
                Submit
            </LeftButton>
        </form>
    )
}

const Form = withFormik({
    mapPropsToValues: ({
        name,
        description
    }) => {
        return {
            name,
            description
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string()
            .required("Enter a name")
    }),
    handleSubmit: (values, { setSubmitting, props }) => {
        props.submit(values).then(() => setSubmitting(false))
    }
})(form)

export default ({ submit, name, description }) => {
    return <Form submit={submit} name={name} description={description} />
}
