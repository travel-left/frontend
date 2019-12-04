import React from 'react'
import Button from '@material-ui/core/Button'
import { withFormik } from "formik";
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { travelerStatus } from '../../../util/globals'

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
            />
            <InputLabel style={{ marginTop: 16 }}>Status</InputLabel>
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
            <Divider style={{ marginTop: 40 }} />
            {remove && <Button size="large" onClick={remove} variant="contained" color="error" style={{ width: '180px', height: '50px', marginTop: '25px' }} disabled={isSubmitting}>
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
