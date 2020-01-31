import React, { useState } from 'react'
import { withFormik } from "formik";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import MomentUtils from '@date-io/moment'
import LeftButton from '../util/otherComponents/LeftButton'

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
            <TextField
                required
                onChange={handleChange}
                onBlur={handleBlur}
                id="standard-required"
                label="Name"
                value={values.name}
                placeholder="Name"
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
                    id="Date"
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
            <Divider style={{ marginTop: 40, marginBottom: 25 }} />
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
