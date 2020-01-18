import React from 'react'
import { withFormik } from "formik";
import Divider from '@material-ui/core/Divider'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Input from '@material-ui/core/Input'
import { travelerStatus } from '../util/globals'
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
        setFieldValue,
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
                        : (<div className="d-flex flex-wrap">
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
                <InputLabel style={{ marginTop: 16 }}>Status</InputLabel>
                <Select
                    required
                    displayEmpty
                    value={values.status}
                    placeholder='Select a status'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="status"
                    // renderValue={value => value.label}
                    fullWidth
                >
                    {travelerStatus.map(status => <MenuItem value={status}>{status.toUpperCase()}</MenuItem>)}
                </Select>
                <Divider style={{ marginTop: 40, marginBottom: 25 }} />
                <LeftButton float type="submit" disabled={isSubmitting}>
                    Submit
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
            status: travelers.length > 0 ? travelers[0].status : 'confirmed'
        };
    },

    handleSubmit: (values, { setSubmitting, props }) => {
        props.submit(values).then(() => setSubmitting(false))
    }
})(form)

export default ({ submit, selectedTravelers, travelers }) => {

    return (
        <Form submit={submit} travelers={travelers} selectedTravelers={selectedTravelers} />
    )
}
