import React from 'react'
import { withFormik } from "formik";
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { travelerStatus } from '../util/globals'
import LeftButton from '../util/otherComponents/LeftButton'

const form = props => {
    const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        remove
    } = props

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                required
                onChange={handleChange}
                onBlur={handleBlur}
                id="standard-required"
                label="Full Name"
                value={values.name}
                placeholder="Full name"
                name="name"
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name ? errors.name : ""}
                fullWidth
                style={{ marginTop: 0 }}
            />
            <InputLabel style={{ marginTop: 25, fontSize: 10 }}>Status</InputLabel>
            <Select
                required
                displayEmpty
                value={values.status}
                placeholder='Select a status'
                onChange={handleChange}
                onBlur={handleBlur}
                name="status"
                fullWidth
            >
                {travelerStatus.map(status => <MenuItem value={status}>{status}</MenuItem>)}
            </Select>
            <TextField
                required
                onChange={handleChange}
                onBlur={handleBlur}
                id="standard-required"
                label="Email"
                value={values.email}
                placeholder="Email address"
                name="email"
                type="email"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email ? errors.email : ""}
                fullWidth
            />
            <TextField
                onChange={handleChange}
                onBlur={handleBlur}
                label="Phone number"
                value={values.phone}
                placeholder="Phone number"
                name="phone"
                type="text"
                fullWidth
            />
            <TextField
                onChange={handleChange}
                onBlur={handleBlur}
                label="Personal Notes"
                value={values.personalNotes}
                placeholder="Personal notes"
                name="personalNotes"
                type="text"
                fullWidth
            />
            <Divider style={{ marginTop: 48, marginBottom: 16 }} />
            {remove && <LeftButton onClick={remove} color="error" disabled={isSubmitting}>
                Remove
            </LeftButton>}
            <LeftButton float type="submit" disabled={isSubmitting}>
                Submit
            </LeftButton>
        </form>
    )
}

const Form = withFormik({
    mapPropsToValues: ({
        traveler
    }) => {
        return {
            name: traveler ? traveler.name : "",
            status: traveler ? traveler.status : travelerStatus[0],
            personalNotes: traveler ? traveler.personalNotes : '',
            email: traveler ? traveler.email : '',
            phone: traveler ? traveler.phone : '',
        };
    },

    handleSubmit: (values, { setSubmitting, props }) => {
        props.submit(values).then(() => setSubmitting(false))
    }
})(form)

export default (props) => {

    return (
        <Form {...props} />
    )
}
