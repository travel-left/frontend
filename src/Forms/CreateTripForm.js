import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import { withFormik } from "formik";
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import moment from 'moment'
import 'react-dates/lib/css/_datepicker.css'

const form = props => {
    const [isStartDateOpen, setIsStartDateOpen] = useState(false)
    const [isEndDateOpen, setIsEndDateOpen] = useState(false)
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
                id="standard-required"
                label="Trip name"
                value={values.name}
                placeholder="Austrailia"
                margin="normal"
                onChange={handleChange}
                onBlur={handleBlur}
                name="name"
                fullWidth
            />
            <TextField
                id="standard-multiline-static"
                label="Description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                placeholder="2020 Summer Study Abroad South Africa Cal State Fullerton"
                margin="normal"
                onChange={handleChange}
                onBlur={handleBlur}
                name="description"
                fullWidth
            />
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <div className="d-flex justify-content-between">
                    <KeyboardDatePicker
                        disableToolbar
                        autoOk
                        variant="inline"
                        format="MM-DD-YYYY"
                        id="Start"
                        label="Start"
                        value={values.dateStart}
                        onChange={value => {
                            setFieldValue("dateStart", value)
                        }}
                        open={isStartDateOpen}
                        onClick={() => setIsStartDateOpen(true)}
                        onOpen={() => setIsStartDateOpen(true)}
                        onClose={() => setIsStartDateOpen(false)}
                        onBlur={handleBlur}
                        name="dateStart"
                        error={touched.status && Boolean(errors.status)}
                        helperText={touched.status ? errors.status : ""}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardDatePicker
                        disableToolbar
                        autoOk
                        variant="inline"
                        format="MM-DD-YYYY"
                        id="End"
                        label="End"
                        value={values.dateEnd}
                        onChange={value => {
                            setFieldValue("dateEnd", value)
                        }}
                        open={isEndDateOpen}
                        onClick={() => setIsEndDateOpen(true)}
                        onOpen={() => setIsEndDateOpen(true)}
                        onClose={() => setIsEndDateOpen(false)}
                        onBlur={handleBlur}
                        name="dateEnd"
                        error={touched.status && Boolean(errors.status)}
                        helperText={touched.status ? errors.status : ""}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </div>
            </MuiPickersUtilsProvider>
            <Divider style={{ marginTop: 40 }} />
            <Button size="large" type="submit" variant="contained" color="primary" style={{ width: '180px', height: '50px', float: 'right', marginTop: '25px' }} disabled={isSubmitting}>
                Submit
            </Button>
        </form>
    )
}

const Form = withFormik({
    mapPropsToValues: () => {
        return {
            name: '',
            description: '',
            dateStart: moment(),
            dateEnd: moment().add(7, 'days')
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