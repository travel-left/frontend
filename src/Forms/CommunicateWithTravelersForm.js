import React from 'react'
import Button from '@material-ui/core/Button'
import { withFormik } from "formik";
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Chip from '@material-ui/core/Chip'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'

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

    let travelerList = (
        <div style={{ marginTop: 25 }}>
            <InputLabel id="demo-mutiple-chip-label"> Selected Travelers</InputLabel>
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
                    selectedTravelers.length === 0 ? <em>No travelers selected</em>
                        : (<div>
                            {selectedTravelers.map(t => (
                                <Chip key={t._id} label={t.name} />
                            ))}
                        </div>)
                )}
                fullWidth
            >
                {values.travelers.map(c => (
                    <MenuItem key={c._id} value={c}>
                        {c.name}
                    </MenuItem>
                ))}
            </Select>
        </div>
    )

    return (
        <>
            {travelerList}
            <form onSubmit={handleSubmit}>
                <div style={{ marginTop: 40 }}>
                    <FormLabel component="legend" >Send As</FormLabel>
                    <RadioGroup aria-label="send as" name="messageType" value={values.messageType} onChange={handleChange} className="d-flex flex-row">
                        <FormControlLabel value="text" control={<Radio />} label="Text" className="m-0" />
                        <FormControlLabel value="email" control={<Radio />} label="Email" className="m-0" />
                    </RadioGroup>
                </div>
                {values.messageType == 'email' &&
                    <TextField
                        required
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id="standard-required"
                        label="Subject"
                        value={values.subject}
                        placeholder="Email subject"
                        name="subject"
                        fullWidth
                    />
                }
                <TextField
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="standard-required"
                    label="Message"
                    value={values.message}
                    placeholder="Message"
                    name="message"
                    fullWidth
                />
                <Divider style={{ marginTop: 40 }} />
                {/* {values.email && <Button onClick={() => {
                    setFieldValue("text", true)
                }} size="large" variant="contained" color="secondary" style={{ width: '180px', height: '50px', marginTop: '25px' }}>
                    Send Text
            </Button>} */}
                <Button size="large" type="submit" variant="contained" color="primary" style={{ width: '180px', height: '50px', float: 'right', marginTop: '25px' }} disabled={isSubmitting}>
                    SEND
            </Button>
            </form>
        </>
    )
}

const Form = withFormik({
    mapPropsToValues: ({
        travelers,
        selectedTravelers
    }) => {
        return {
            travelers: travelers || [],
            selectedTravelers: selectedTravelers || null,
            messageType: "email"
        }
    },

    handleSubmit: (values, { setSubmitting, props }) => {
        props.submit(values).then(() => setSubmitting(false))
    }
})(form)

export default ({ submit, travelers, selectedTravelers }) => {

    return (
        <Form submit={submit} travelers={travelers} selectedTravelers={selectedTravelers} />
    )
}
