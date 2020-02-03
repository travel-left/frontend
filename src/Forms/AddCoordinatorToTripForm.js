import React from 'react'
import { withFormik } from "formik"
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
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

    return (
        <form onSubmit={handleSubmit}>
            {values.fromOrg ? (
                <div >
                    <InputLabel style={{ marginTop: 0 }}>Select coordinators already in your organization</InputLabel>
                    <Select
                        labelId="demo-mutiple-chip-label"
                        id="demo-mutiple-chip"
                        multiple
                        value={values.coordinatorsToAdd}
                        name="coordinatorsToAdd"
                        onChange={event => {
                            setFieldValue("coordinatorsToAdd", event.target.value)
                        }}
                        onBlur={handleBlur}
                        input={<Input id="select-multiple-chip" />}
                        renderValue={selected => (
                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                {selected.map(c => (
                                    <LeftChip key={c._id} label={c.name} />
                                ))}
                            </div>
                        )}
                        // MenuProps={MenuProps}
                        fullWidth
                    >
                        {values.coordinatorsFromOrg.map(c => (
                            <MenuItem key={c._id} value={c}>
                                {c.name}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
            ) : (
                    <>
                        <TextField
                            required
                            onChange={handleChange}
                            onBlur={handleBlur}
                            id="standard-required"
                            label="Full Name"
                            value={values.name}
                            placeholder="Your full name"
                            name="name"
                            error={touched.name && Boolean(errors.name)}
                            helperText={touched.name ? errors.name : ""}
                            fullWidth
                            style={{ marginTop: 0 }}
                        />
                        <TextField
                            required
                            onChange={handleChange}
                            onBlur={handleBlur}
                            id="standard-required"
                            label="Email"
                            value={values.email}
                            placeholder="Email address"
                            name="email"
                            type="email"
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email ? errors.email : ""}
                            fullWidth
                        />
                        <TextField
                            required
                            onChange={handleChange}
                            onBlur={handleBlur}
                            id="standard-required"
                            label="Phone"
                            value={values.phone}
                            placeholder="Phone number"
                            name="phone"
                            type="text"
                            error={touched.phone && Boolean(errors.phone)}
                            helperText={touched.phone ? errors.phone : ""}
                            fullWidth
                        />
                        <TextField
                            required
                            onChange={handleChange}
                            onBlur={handleBlur}
                            id="standard-required"
                            label="Title"
                            value={values.title}
                            placeholder="Coordinator's title"
                            name="title"
                            type="text"
                            error={touched.title && Boolean(errors.title)}
                            helperText={touched.title ? errors.title : ""}
                            fullWidth
                        />
                    </>
                )
            }
            <Divider style={{ marginTop: 48, marginBottom: 16 }} />
            {!values.fromOrg && <LeftButton onClick={() => {
                setFieldValue("fromOrg", true)
            }} color="secondary">
                Add from org
            </LeftButton>}
            <LeftButton type="submit" float disabled={isSubmitting}>
                Submit
            </LeftButton>
        </form>
    )
}

const Form = withFormik({
    mapPropsToValues: ({
        name,
        email,
        password,
        coordinatorsFromOrg,
        coordinatorsToAdd
    }) => {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            coordinatorsFromOrg: coordinatorsFromOrg || [],
            coordinatorsToAdd: coordinatorsToAdd || []
        };
    },

    handleSubmit: (values, { setSubmitting, props }) => {
        props.submit(values).then(() => setSubmitting(false))
    }
})(form)

export default ({ submit, coordinatorsFromOrg }) => {

    return (
        <Form submit={submit} coordinatorsFromOrg={coordinatorsFromOrg} />
    )
}
