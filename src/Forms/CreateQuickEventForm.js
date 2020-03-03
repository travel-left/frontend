import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import { withFormik } from "formik";
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers'
import TextField from '@material-ui/core/TextField'
import MomentUtils from '@date-io/moment'
import LeftButton from '../util/otherComponents/LeftButton';

const form = props => {
    const [isCalOpen, setIsCalOpen] = useState(false)
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
                placeholder="Activity name"
                name="name"
                fullWidth
                style={{ marginTop: 0 }}
            />
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDateTimePicker
                    autoOk
                    variant="inline"
                    ampm
                    format="MM/DD/YYYY hh:mmA"
                    minutesStep={5}
                    label="Date"
                    value={values.date}
                    onChange={value => {
                        setFieldValue("date", value)
                    }}
                    open={isCalOpen}
                    onClick={() => setIsCalOpen(true)}
                    onOpen={() => setIsCalOpen(true)}
                    onClose={() => setIsCalOpen(false)}
                    onBlur={handleBlur}
                    name="date"
                    error={touched.status && Boolean(errors.status)}
                    helperText={touched.status ? errors.status : ""}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    fullWidth
                />
            </MuiPickersUtilsProvider>
            <div style={{ marginTop: 16 }}>
                <LeftButton type="submit" color="secondary" float disabled={isSubmitting}>
                    QUICK activity
            </LeftButton>
            </div>
        </form>
    )
}

const Form = withFormik({
    mapPropsToValues: ({
        date,
    }) => {
        return {
            name: "New Quick Activity",
            date: new Date(new Date(date).setHours(13)).setMinutes(0) || new Date()
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
