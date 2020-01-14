import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import MomentUtils from '@date-io/moment'
import { withFormik } from "formik"
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import * as Yup from 'yup'

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
        setFieldValue
    } = props

    return (
        <form onSubmit={handleSubmit}>
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
            <Button size="large" type="submit" id="status" variant="contained" color="primary" style={{ width: '180px', height: '50px', float: 'right', marginTop: '25px' }} disabled={isSubmitting}>
                Submit
            </Button>
        </form>
    )
}

const Form = withFormik({
    mapPropsToValues: ({
        dateStart,
        dateEnd
    }) => {
        return {
            dateStart,
            dateEnd
        };
    },
    validationSchema: Yup.object().shape({
        dateStart: Yup.string()
            .required("Please enter a start date."),
        dateEnd: Yup.string()
            .required("Please enter an end date."),
    }),
    handleSubmit: (values, { setSubmitting, props }) => {
        props.submit(values).then(() => setSubmitting(false))
    }
})(form)

export default ({ submit, status, dateStart, dateEnd }) => {
    return <Form submit={submit} status={status} dateStart={dateStart} dateEnd={dateEnd} />
}
