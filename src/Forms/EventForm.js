import React, { useState } from 'react'
import { withFormik } from "formik";
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import LeftChip from '../util/otherComponents/LeftChip'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import { MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import moment from 'moment'
import { airlines } from '../util/airlines'
import { timezones } from '../TripDashboard/Itinerary/Events/EventHelpers';
import Autocomplete from '@material-ui/lab/Autocomplete'
import PlacesAutoCompleteField from "../Forms/PlacesAutoCompleteField"
import LeftButton from '../util/otherComponents/LeftButton';

const form = props => {
    const [isStartTimeOpen, setIsStartTimeOpen] = useState(false)
    const [isEndTimeOpen, setIsEndTimeOpen] = useState(false)
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
        initialValues,
        remove
    } = props

    let documentList = (
        <div style={{ marginTop: 41 }}>
            <InputLabel id="demo-mutiple-chip-label"> Selected Documents</InputLabel>
            <Select
                labelId="demo-mutiple-chip-label"
                id="documents-multiple-select"
                multiple
                value={values.selectedDocuments || []}
                name="selectedDocuments"
                onChange={event => {
                    setFieldValue("selectedDocuments", event.target.value)
                }}
                displayEmpty
                onBlur={handleBlur}
                input={<Input id="select-multiple-chip" />}
                placeholder="No documents selected"
                renderValue={selectedDocuments => (
                    !selectedDocuments ? <em>No documents selected</em>
                        : (<div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {selectedDocuments.map(t => (
                                <LeftChip key={t._id} label={t.name} />
                            ))}
                        </div>)
                )}
                fullWidth
            >
                {values.documents.map(c => (
                    <MenuItem key={c._id} value={c}>
                        {c.name}
                    </MenuItem>
                ))}
            </Select>
        </div>
    )

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <TextField
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id="event-name"
                        label="Name"
                        value={values.name}
                        placeholder="Event name"
                        name="name"
                        style={{ width: 199 }}
                    />
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            autoOk
                            variant="inline"
                            format="MM-DD-YYYY"
                            id="Start"
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
                            name="dateStart"
                            error={touched.status && Boolean(errors.status)}
                            helperText={touched.status ? errors.status : ""}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </div>
                <div style={{ marginTop: 41 }}>
                    <FormLabel component="legend" >Event type</FormLabel>
                    <RadioGroup aria-label="Event type" name="type" value={values.type} onChange={handleChange} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'around' }}>
                        <FormControlLabel value="LODGING" control={<Radio color="primary" />} label="Lodging" />
                        <FormControlLabel value="EVENT" control={<Radio color="primary" />} label="Event" />
                        <FormControlLabel value="TRANSPORTATION" control={<Radio color="primary" />} label="Transportation" />
                        <FormControlLabel value="FLIGHT" control={<Radio color="primary" />} label="Flight" />
                    </RadioGroup>
                </div>
                {values.type === 'FLIGHT' && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Autocomplete
                            name="airline"
                            id="airline"
                            autoHighlight
                            value={values.airline}
                            options={airlines}
                            getOptionLabel={option => option.label}
                            onChange={(e, value) => {
                                console.log(value)
                                setFieldValue(
                                    "airline",
                                    value !== null
                                        ? value
                                        : values.airline
                                );
                            }}
                            renderInput={params => (
                                <TextField
                                    label="Airline"
                                    margin="normal"
                                    name="airline"
                                    fullWidth
                                    {...params}
                                />
                            )}
                            style={{ width: 199 }}
                        />
                        <TextField
                            onChange={handleChange}
                            onBlur={handleBlur}
                            id="flight-number"
                            label="Flight number"
                            value={values.flightNumber}
                            placeholder="ex. 32"
                            name="flightNumber"
                            style={{ width: 199 }}
                        />
                    </div>
                )}
                {values.type !== 'FLIGHT' && (
                    <>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <div style={{ display: 'flex' }}>
                                <KeyboardTimePicker
                                    label="Start time"
                                    value={values.start}
                                    onChange={(e, value) => {
                                        let time = moment(value, "hh:mm A").format("HH:mm").split(":")
                                        let hours = time[0]
                                        let minutes = time[1]
                                        let date = new Date()
                                        date.setHours(hours, minutes)
                                        setFieldValue("start", date)
                                    }}
                                    open={isStartTimeOpen}
                                    onClick={() => setIsStartTimeOpen(true)}
                                    onOpen={() => setIsStartTimeOpen(true)}
                                    onClose={() => setIsStartTimeOpen(false)}
                                    variant="inline"
                                    minutesStep={5}
                                    name="start"
                                    style={{ width: 120 }}
                                />
                                <KeyboardTimePicker
                                    label="End time"
                                    variant="inline"
                                    value={values.end}
                                    onChange={(e, value) => {
                                        let time = moment(value, "hh:mm A").format("HH:mm").split(":")
                                        let hours = time[0]
                                        let minutes = time[1]
                                        let date = new Date()
                                        date.setHours(hours, minutes)
                                        setFieldValue("end", date)
                                    }}
                                    open={isEndTimeOpen}
                                    onClick={() => setIsEndTimeOpen(true)}
                                    onOpen={() => setIsEndTimeOpen(true)}
                                    onClose={() => setIsEndTimeOpen(false)}
                                    minutesStep={5}
                                    name="end"
                                    style={{ width: 120 }}
                                />
                                <Autocomplete
                                    name="timezone"
                                    id="timezone"
                                    autoHighlight
                                    options={timezones}
                                    value={values.timezone}
                                    getOptionLabel={option => option}
                                    fullWidth
                                    onChange={(e, value) => {
                                        console.log(value);
                                        setFieldValue(
                                            "timezone",
                                            value !== null
                                                ? value
                                                : initialValues.timezone
                                        );
                                    }}
                                    renderInput={params => (
                                        <TextField
                                            label="Timezone"
                                            margin="normal"
                                            name="timezone"
                                            fullWidth
                                            {...params}
                                        />
                                    )}
                                    style={{
                                        marginLeft: 16, width: 212
                                    }}
                                />
                            </div>
                        </MuiPickersUtilsProvider>

                    </>
                )}
                <TextField
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="standard-required"
                    label="Description"
                    value={values.description}
                    placeholder="Description"
                    name="description"
                    fullWidth
                />
                <PlacesAutoCompleteField handleChange={address => setFieldValue("address", address)} value={values.address}></PlacesAutoCompleteField>
                {documentList}
                <TextField
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="standard-required"
                    label="Links"
                    value={values.links}
                    placeholder="Enter links separated by a space"
                    name="links"
                    fullWidth
                />
                <Divider style={{ marginTop: 40, marginBottom: 25 }} />
                {remove && <LeftButton onClick={remove} color="error" disabled={isSubmitting}>
                    Remove
            </LeftButton>}
                <LeftButton float type="submit" id="event-submit-button" disabled={isSubmitting}>
                    Submit
            </LeftButton>
            </form>
        </>
    )
}

const Form = withFormik({
    mapPropsToValues: ({
        name,
        timezone,
        date,
        start,
        end,
        type,
        description,
        airline,
        flightNumber,
        address,
        links,
        documents,
        selectedDocuments
    }) => {
        let startTime = new Date(date).setHours(13)
        startTime = new Date(startTime).setMinutes(0)
        let endTime = new Date(date).setHours(14)
        endTime = new Date(endTime).setMinutes(0)
        return {
            name: name || '',
            timezone: moment.tz.guess(),
            date: start || startTime,
            start: start || startTime,
            end: end || endTime,
            type: type || 'Event',
            description: description || '',
            airline: airlines.filter(al => {
                console.log(al)
                console.log(airline)
                if (al.value == airline) {
                    console.log('returning label ' + al.label)
                    return al.label
                }
            })[0] || '',
            flightNumber: flightNumber || '',
            address: address || '',
            links: links ? links.join(' ') : [],
            documents: documents || [],
            selectedDocuments: selectedDocuments ? documents.filter(doc => selectedDocuments.includes(doc._id)) : []

        }
    },

    initialValues: {
        timezone: {
            label: "",
            value: "",
            offset: ""
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
