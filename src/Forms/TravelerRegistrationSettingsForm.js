import React, { useState } from 'react'
import { withFormik } from "formik"
import Divider from '@material-ui/core/Divider'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import Switch from '@material-ui/core/Switch'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import FormGroup from '@material-ui/core/FormGroup'
import MomentUtils from '@date-io/moment'
import Tooltip from '@material-ui/core/Tooltip'
import LeftButton from '../util/otherComponents/LeftButton'

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
        setFieldValue,
        remove
    } = props

    return (
        <form onSubmit={handleSubmit}>
            <FormGroup>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 0 }}>
                    <span htmlFor="">Name</span>
                    <Switch checked={values.hasName} onChange={handleChange('hasName')} value="hasName" />
                </div>
                {/* <div >
                    <span htmlFor="">Picture</span>
                    <Switch checked={values.hasImage} onChange={handleChange('hasImage')} value="hasImage" />
                </div> */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span htmlFor="">Email</span>
                    <Switch checked={values.hasEmail} onChange={handleChange('hasEmail')} value="hasEmail" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span htmlFor="">Phone</span>
                    <Switch checked={values.hasPhone} onChange={handleChange('hasPhone')} value="hasPhone" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span htmlFor="">Personal Notes</span>
                    <Switch checked={values.hasPersonalNotes} onChange={handleChange('hasPersonalNotes')} value="hasPersonalNotes" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span htmlFor="">Payment</span>
                    {!values.canRequestPayments ?
                        <Tooltip title="Account must be verified before requesting payments." disableFocusListener arrow>
                            <div>
                                <Switch checked={false} onChange={handleChange('hasPaymentAmount')} value="hasPaymentAmount" disabled />
                            </div>
                        </Tooltip> :
                        <Switch checked={values.hasPaymentAmount} onChange={handleChange('hasPaymentAmount')} value="hasPaymentAmount" />
                    }
                </div>
                {values.hasPaymentAmount && values.canRequestPayments && <TextField
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Amount"
                    value={values.paymentAmount}
                    placeholder="20.00"
                    name="paymentAmount"
                    fullWidth
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    style={{ marginTop: 8, marginBottom: 16, width: 180, marginLeft: 16 }}
                />}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span htmlFor="">Registration Due Date</span>
                    <Switch checked={values.hasDueDate} onChange={handleChange('hasDueDate')} value="hasDueDate" />
                </div>
                {values.hasDueDate && <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardDatePicker
                        autoOk
                        disableToolbar
                        variant="inline"
                        format="MM-DD-YYYY"
                        id="date"
                        label="Date"
                        value={values.dueDate}
                        onChange={value => {
                            setFieldValue("dueDate", value)
                        }}
                        open={isCalOpen}
                        onClick={() => setIsCalOpen(true)}
                        onOpen={() => setIsCalOpen(true)}
                        onClose={() => setIsCalOpen(false)}
                        onBlur={handleBlur}
                        name="dueDate"
                        style={{ marginTop: 8, marginBottom: 16, width: 180, marginLeft: 16 }}
                    />
                </MuiPickersUtilsProvider>}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span htmlFor="">Publish</span>
                    <Switch checked={values.hasPublish} onChange={handleChange('hasPublish')} value="hasPublish" color="primary" />
                </div>
            </FormGroup>
            <Divider style={{ marginTop: 48, marginBottom: 16 }} />
            <LeftButton type="submit" float disabled={isSubmitting}>
                Submit
            </LeftButton>
        </form>
    )
}

const Form = withFormik({
    mapPropsToValues: ({
        settings,
        canRequestPayments
    }) => {
        return {
            hasName: settings ? settings.hasName : false,
            hasEmail: settings ? settings.hasEmail : false,
            hasPhone: settings ? settings.hasPhone : false,
            hasImage: settings ? settings.hasImage : false,
            hasPersonalNotes: settings ? settings.hasPersonalNotes : false,
            hasPaymentAmount: settings ? settings.hasPaymentAmount : false,
            hasDueDate: settings ? settings.hasDueDate : false,
            hasPublish: settings ? settings.hasPublish : false,
            dueDate: settings ? settings.dueDate : new Date(),
            paymentAmount: settings ? settings.paymentAmount : '',
            canRequestPayments
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
