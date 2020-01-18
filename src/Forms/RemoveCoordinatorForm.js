import React from 'react'
import Divider from '@material-ui/core/Divider'
import { withFormik } from "formik"
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
            <p className='TripInfo-description'>Are you sure you want to remove this coordinator? Press submit to remove.</p>
            <Divider style={{ marginTop: 40, marginBottom: 25 }} />
            <LeftButton type="submit" color="error" disabled={isSubmitting}>
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
