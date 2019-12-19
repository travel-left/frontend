import React from 'react'
import Button from '@material-ui/core/Button'
import { withFormik } from "formik";
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormLabel from '@material-ui/core/FormLabel'
import LeftChip from '../util/otherComponents/LeftChip'

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
            <InputLabel id="demo-mutiple-chip-label" style={{ marginTop: 40 }}> Selected Travelers</InputLabel>
            <Select
                labelId="demo-mutiple-chip-label"
                id="demo-mutiple-chip"
                multiple
                value={values.selectedTravelers}
                name="coordinatorsToAdd"
                onChange={event => {
                    setFieldValue("selectedTravelers", event.target.value)
                }}
                displayEmpty
                onBlur={handleBlur}
                input={<Input id="select-multiple-chip" />}
                placeholder="No travelers selected"
                renderValue={selectedTravelers => (
                    selectedTravelers.length === 0 ? 'No travelers selected'
                        : (<div className="d-flex flex-wrap">
                            {selectedTravelers.map(t => (
                                <LeftChip key={t._id} label={t.name} />
                            ))}
                        </div>)
                )}
                fullWidth
            // style={{ paddingLeft: 4, paddingRight: 4, paddingTop: 4, paddingBottom: 4 }}
            >
                {values.travelers.map(c => (
                    <MenuItem key={c._id} value={c}>
                        {c.name}
                    </MenuItem>
                ))}
            </Select>
            <TextField
                required
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
            />
            <TextField
                required
                onChange={handleChange}
                onBlur={handleBlur}
                label="Message"
                value={values.message}
                placeholder="Message your traveler will see"
                name="message"
                fullWidth
            />
            <div style={{ marginTop: 40 }}>
                <FormLabel component="legend" >Send As</FormLabel>
                <RadioGroup aria-label="send as" name="messageType" value={values.messageType} onChange={handleChange} className="d-flex flex-row">
                    <FormControlLabel value="text" control={<Radio />} label="Text" className="m-0" />
                    <FormControlLabel value="email" control={<Radio />} label="Email" className="m-0" />
                </RadioGroup>
            </div>


            <Divider style={{ marginTop: 40 }} />
            <Button size="large" type="submit" variant="contained" color="primary" style={{ width: '180px', height: '50px', float: 'right', marginTop: '25px' }} disabled={isSubmitting}>
                Submit
            </Button>
        </form>
    )
}

const Form = withFormik({
    mapPropsToValues: ({
        travelers,
        selectedTravelers
    }) => {
        return {
            travelers: travelers || [],
            selectedTravelers: selectedTravelers || [],
            messageType: "email"
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
