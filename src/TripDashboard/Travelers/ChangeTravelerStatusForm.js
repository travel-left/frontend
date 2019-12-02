import React from 'react'
import Button from '@material-ui/core/Button'
import { withFormik } from "formik";
import Divider from '@material-ui/core/Divider'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { travelerStatus } from '../../util/globals'

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
        travelers
    } = props

    let travelerList = travelers.map(t =>
        (
            <p key={t._id}>
                <div className="row">
                    <div className="col text-black-50">{t.name}</div>
                    <div className="col text-black-50">{t.phone}</div>
                </div>
            </p>
        )
    )

    travelerList = travelerList.length ? (
        <>
            <h5>Selected travelers</h5>
            <div className="row">
                <div className="col ">Name</div>
                <div className="col ">Phone</div>
            </div>
            <hr />
            {travelerList}
        </>
    ) : (
            <p className="text-danger text-center">No Travelers Selected!</p>
        )

    return (
        <>
            <div className="mb-4">{travelerList}</div>
            <form onSubmit={handleSubmit}>
                <InputLabel style={{ marginTop: 16 }}>Status</InputLabel>
                <Select
                    required
                    displayEmpty
                    value={values.status}
                    placeholder='Select a status'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="status"
                    // renderValue={value => value.label}
                    fullWidth
                >
                    {travelerStatus.map(status => <MenuItem value={status}>{status.toLowerCase()}</MenuItem>)}
                </Select>
                <Divider style={{ marginTop: 40 }} />
                <Button size="large" type="submit" variant="contained" color="primary" style={{ width: '180px', height: '50px', float: 'right', marginTop: '25px' }} disabled={isSubmitting}>
                    Submit
            </Button>
            </form>
        </>
    )
}

const Form = withFormik({
    mapPropsToValues: ({
        travelers,
    }) => {
        return {
            status: travelers.length > 0 ? travelers[0].status : 'confirmed'
        };
    },

    handleSubmit: (values, { setSubmitting, props }) => {
        props.submit(values).then(() => setSubmitting(false))
    }
})(form)

export default ({ submit, status, travelers }) => {

    return (
        <Form submit={submit} travelers={travelers} />
    )
}
