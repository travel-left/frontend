import React from 'react'
import Button from '@material-ui/core/Button'
import { withFormik } from "formik"
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
        remove,
        type
    } = props

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                required
                onChange={handleChange}
                onBlur={handleBlur}
                label="Name"
                value={values.name}
                placeholder="Resource name"
                name="name"
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name ? errors.name : ""}
                fullWidth
            />
            {type === 'LINK' && <TextField
                required
                onChange={handleChange}
                onBlur={handleBlur}
                label="Link"
                value={values.link}
                placeholder="www.resourcelink.com"
                name="link"
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name ? errors.name : ""}
                fullWidth
            />}
            <TextField
                onChange={handleChange}
                onBlur={handleBlur}
                label="Description"
                value={values.description}
                placeholder="Resource description"
                name="description"
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name ? errors.name : ""}
                fullWidth
            />
            <Divider style={{ marginTop: 40 }} />
            {remove &&
                <Button size="large" onClick={remove} variant="contained" color="error" style={{ width: '180px', height: '50px', marginTop: '25px' }} disabled={isSubmitting}>
                    Remove
            </Button>}
            <Button size="large" type="submit" variant="contained" color="primary" style={{ width: '180px', height: '50px', float: 'right', marginTop: '25px' }} disabled={isSubmitting}>
                Submit
            </Button>
        </form>
    )
}

const Form = withFormik({
    mapPropsToValues: ({
        name,
        description,
        link
    }) => {
        return {
            name,
            description,
            link: link || ''
        }
    },

    handleSubmit: (values, { setSubmitting, props }) => {
        props.submit(values).then(() => setSubmitting(false))
    }
})(form)

export default ({ submit, remove, name, description, link, type }) => {

    return (
        <Form submit={submit} name={name} description={description} link={link} type={type} remove={remove} />
    )
}

