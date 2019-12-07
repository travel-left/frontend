import React from 'react'
import Button from '@material-ui/core/Button'
import { withFormik } from "formik";
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers'
import TextField from '@material-ui/core/TextField'
import MomentUtils from '@date-io/moment'

const form = props => {
    const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue
    } = props

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                onChange={handleChange}
                onBlur={handleBlur}
                id="standard-required"
                label="Name"
                value={values.name}
                placeholder="Event name"
                name="name"
                style={{ marginRight: 16, marginTop: 0 }}
            />
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDateTimePicker
                    autoOk
                    variant="inline"
                    ampm
                    format="MM/DD/YYYY hh:mmA"
                    label="Date"
                    value={values.date}
                    onChange={value => {
                        setFieldValue("date", value)
                    }}
                    onBlur={handleBlur}
                    name="date"
                    error={touched.status && Boolean(errors.status)}
                    helperText={touched.status ? errors.status : ""}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    style={{ marginLeft: 16, marginRight: 16, marginTop: 0 }}
                />
            </MuiPickersUtilsProvider>
            <Button size="large" type="submit" variant="contained" color="secondary" style={{ width: '180px', height: '50px', float: 'right', marginLeft: 16 }} disabled={isSubmitting}>
                QUICK EVENT
            </Button>
        </form>
    )
}

const Form = withFormik({
    mapPropsToValues: ({
        date,
    }) => {
        return {
            name: "New Quick Event",
            date: new Date(date).setHours(13) || new Date()
        }
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
