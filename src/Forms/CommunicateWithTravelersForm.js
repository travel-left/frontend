import React from 'react'
import { withFormik } from "formik";
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import LeftChip from '../util/otherComponents/LeftChip'
import LeftButton from '../util/otherComponents/LeftButton'

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
        <div style={{ marginTop: 0 }}>
            <InputLabel id="demo-mutiple-chip-label"> Selected </InputLabel>
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
                placeholder="None selected"
                renderValue={selectedTravelers => (
                    selectedTravelers.length === 0 ? 'None selected'
                        : (<div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {selectedTravelers.map(t => (
                                <LeftChip key={t._id} label={t.name} />
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
                <div >
                    <FormLabel component="legend" >Send As</FormLabel>
                    <RadioGroup aria-label="send as" name="messageType" value={values.messageType} onChange={handleChange} style={{ display: 'flex', flexDirection: 'row' }}>
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
                <Divider style={{ marginTop: 48, marginBottom: 16 }} />
                <LeftButton float type="submit" disabled={isSubmitting}>
                    Send
            </LeftButton>
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
