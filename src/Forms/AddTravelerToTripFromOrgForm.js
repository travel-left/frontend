import React from 'react'
import { withFormik } from "formik";
import Divider from '@material-ui/core/Divider'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
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
        <div >
            <InputLabel style={{ marginTop: 0 }}> Selected </InputLabel>
            <Select
                id="add-traveler-to-trip"
                multiple
                value={values.selectedTravelers}
                name="coordinatorsToAdd"
                onChange={event => {
                    setFieldValue("selectedTravelers", event.target.value)
                }}
                displayEmpty
                onBlur={handleBlur}
                input={<Input id="add-traveler-to-trip" />}
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
                <Divider style={{ marginTop: 48, marginBottom: 16 }} />
                <LeftButton type="submit" id="add-to-trip" disabled={isSubmitting} float>
                    ADD
                </LeftButton>
            </form>
        </>
    )
}

const Form = withFormik({
    mapPropsToValues: ({
        travelers
    }) => {
        return {
            travelers: travelers || [],
            selectedTravelers: []
        }
    },

    handleSubmit: (values, { setSubmitting, props }) => {
        props.submit(values).then(() => setSubmitting(false))
    }
})(form)

export default ({ submit, travelers }) => {

    return (
        <Form submit={submit} travelers={travelers} />
    )
}
