import React from 'react'
import Divider from '@material-ui/core/Divider'
import { withFormik } from "formik"
import LeftButton from '../util/otherComponents/LeftButton'
import Typography from '@material-ui/core/Typography'

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
            <Divider style={{ marginTop: 48, marginBottom: 16 }} />
            <LeftButton type="submit" color="error" float disabled={isSubmitting}>
                Remove
            </LeftButton>
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
