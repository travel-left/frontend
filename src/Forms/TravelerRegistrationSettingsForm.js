import React from 'react'
import Button from '@material-ui/core/Button'
import { withFormik } from "formik";
import Divider from '@material-ui/core/Divider'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import Switch from '@material-ui/core/Switch'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import FormGroup from '@material-ui/core/FormGroup'
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
        setFieldValue,
        remove
    } = props

    return (
        <form onSubmit={handleSubmit}>
            <FormGroup>
                <div className="d-flex justify-content-between align-items-center">
                    <span htmlFor="">Name</span>
                    <Switch checked={values.name} onChange={handleChange('name')} value="name" />
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <span htmlFor="">Email</span>
                    <Switch checked={values.email} onChange={handleChange('email')} value="email" />
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <span htmlFor="">Phone</span>
                    <Switch checked={values.phone} onChange={handleChange('phone')} value="phone" />
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <span htmlFor="">Personal Notes</span>
                    <Switch checked={values.personalNotes} onChange={handleChange('personalNotes')} value="personalNotes" />
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <span htmlFor="">Payment</span>
                    <Switch checked={values.payment} onChange={handleChange('payment')} value="payment" />
                </div>
                {values.payment && <TextField
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Amount"
                    value={values.amount}
                    placeholder="20.00"
                    name="amount"
                    fullWidth
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    style={{ marginTop: 8, marginBottom: 16, width: 180, marginLeft: 16 }}
                />}
                <div className="d-flex justify-content-between align-items-center">
                    <span htmlFor="">Registration Due Date</span>
                    <Switch checked={values.dueDate} onChange={handleChange('dueDate')} value="dueDate" />
                </div>
                {values.dueDate && <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardDatePicker
                        autoOk
                        disableToolbar
                        variant="inline"
                        format="MM-DD-YYYY"
                        id="date"
                        label="Date"
                        value={values.date}
                        onChange={value => {
                            setFieldValue("date", value)
                        }}
                        onBlur={handleBlur}
                        name="dateStart"
                        style={{ marginTop: 8, marginBottom: 16, width: 180, marginLeft: 16 }}
                    />
                </MuiPickersUtilsProvider>}
                <div className="d-flex justify-content-between align-items-center">
                    <span htmlFor="">Publish</span>
                    <Switch checked={values.publish} onChange={handleChange('publish')} value="publish" color="primary" />
                </div>
            </FormGroup>
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
        settings
    }) => {
        return {
            name: settings ? settings.name : false,
            email: settings ? settings.email : false,
            phone: settings ? settings.phone : false,
            personalNotes: settings ? settings.personalNotes : false,
            payment: settings ? settings.payment : false,
            dueDate: settings ? settings.dueDate : false,
            publish: settings ? settings.publish : false,
            date: settings ? settings.date : new Date(),
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
