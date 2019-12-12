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
import { MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import moment from 'moment'
import { airlines } from '../util/airlines'
import { timezones } from '../TripDashboard/Itinerary/Events/EventHelpers';
import Autocomplete from '@material-ui/lab/Autocomplete'
import PlacesAutoCompleteField from "../Forms/PlacesAutoCompleteField"

const form = props => {
    console.log(moment.tz.guess())
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
                id="demo-mutiple-chip"
                multiple
                value={values.selectedDocuments || []}
                name="selectedDocuments"
                onChange={event => {
                    setFieldValue("selectedDocuments", event.target.value)
                }}
                displayEmpty
                onBlur={handleBlur}
                input={<Input id="select-multiple-chip" />}
                placeholder="No travelers selected"
                renderValue={selectedDocuments => (
                    !selectedDocuments ? <em>No documents selected</em>
                        : (<div>
                            {selectedDocuments.map(t => (
                                <Chip key={t._id} label={t.name} />
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
                <div className="d-flex justify-content-between">
                    <TextField
                        required
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id="standard-required"
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
                    <RadioGroup aria-label="Event type" name="type" value={values.type} onChange={handleChange} className="d-flex flex-row justify-content-around">
                        <FormControlLabel value="LODGING" control={<Radio color="primary" />} label="Lodging" />
                        <FormControlLabel value="EVENT" control={<Radio color="primary" />} label="Event" />
                        <FormControlLabel value="TRANSPORTATION" control={<Radio color="primary" />} label="Transportation" />
                        <FormControlLabel value="FLIGHT" control={<Radio color="primary" />} label="Flight" />
                    </RadioGroup>
                </div>
                {values.type === 'FLIGHT' && (
                    <div className="d-flex justify-content-between">
                        <Autocomplete
                            name="airline"
                            id="airline"
                            autoHighlight
                            options={airlines}
                            getOptionLabel={option => option.label}
                            onChange={(e, value) => {
                                console.log(value)
                                setFieldValue(
                                    "airline",
                                    value !== null
                                        ? value
                                        : initialValues.airline
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
                            id="standard-required"
                            label="Flight number"
                            value={values.flightNumber}
                            placeholder="ex. UA32"
                            name="flightNumber"
                            style={{ width: 199 }}
                        />
                    </div>
                )}
                {values.type !== 'FLIGHT' && (
                    <>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <div className="d-flex">
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
                <Divider style={{ marginTop: 40 }} />
                {remove && <Button size="large" onClick={remove} variant="contained" color="error" style={{ width: '180px', height: '50px', marginTop: '25px' }} disabled={isSubmitting}>
                    Remove
                </Button>}
                <Button size="large" type="submit" variant="contained" color="primary" style={{ width: '180px', height: '50px', float: 'right', marginTop: '25px' }} disabled={isSubmitting}>
                    submit
                </Button>
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
        return {
            name: name || '',
            timezone: moment.tz.guess(),
            date: start || new Date(date).setHours(13),
            start: start || new Date(date).setHours(13),
            end: end || new Date(date).setHours(14),
            type: type || 'Event',
            description: description || '',
            airline: airline || '',
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
