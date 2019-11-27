import React from 'react'
import Button from '@material-ui/core/Button'
import { withFormik } from "formik";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import MomentUtils from '@date-io/moment'

const categories = [
    {
        label: 'Travel Date',
        value: 'TRAVEL'
    },
    {
        label: 'Money Date',
        value: 'MONEY'
    },
    {
        label: 'Paperwork Date',
        value: 'PAPERWORK'
    },
    {
        label: 'Other Date',
        value: 'OTHER'
    }
]

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
                label="Name"
                value={values.name}
                placeholder="Trip date name"
                name="name"
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name ? errors.name : ""}
                fullWidth
            />
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                    disableToolbar
                    autoOk
                    variant="inline"
                    format="MM-DD-YYYY"
                    id="Start"
                    label="Start"
                    value={values.date}
                    onChange={value => {
                        setFieldValue("date", value)
                    }}
                    onBlur={handleBlur}
                    name="dateStart"
                    fullWidth
                    error={touched.status && Boolean(errors.status)}
                    helperText={touched.status ? errors.status : ""}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </MuiPickersUtilsProvider>
            <InputLabel style={{ marginTop: 16 }}>Category</InputLabel>
            <Select
                required
                displayEmpty
                value={values.category}
                placeholder='Select a category'
                onChange={handleChange}
                onBlur={handleBlur}
                name="category"
                renderValue={value => value.label}
                fullWidth
            >
                {categories.map(category => <MenuItem value={category}>{category.label}</MenuItem>)}
            </Select>
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
        name,
        date,
        category,
    }) => {
        return {
            name: name || "",
            date: date || new Date(),
            category: categories.filter(c => c.value == category)[0] || {
                label: 'Travel Date',
                value: 'TRAVEL'
            }
        };
    },

    handleSubmit: (values, { setSubmitting, props }) => {
        props.submit(values).then(() => setSubmitting(false))
    }
})(form)

export default ({ submit, date, name, category, remove }) => {

    return (
        <Form submit={submit} date={date} name={name} category={category} remove={remove} />
    )
}
