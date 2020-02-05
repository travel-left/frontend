import React, { useState } from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import LeftChip from '../util/otherComponents/LeftChip'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import { withFormik } from "formik"
import CircularProgress from '@material-ui/core/CircularProgress'
import FileUploader from './FileUploader'
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
        images
    } = props

    const [isUploading, setIsUploading] = useState(false)

    let buttonContent = isUploading ? <CircularProgress color='primary' /> : 'Submit'

    return (
        <form onSubmit={handleSubmit} >
            <div style={{ marginTop: 0 }}>
                <FileUploader
                    value={values.file}
                    showPreviews={true}
                    showPreviewsInDropzone={false}
                    class='docDropzone'
                    filesLimit={1}
                    name='file'
                    handleChange={value => {
                        setFieldValue("file", value.url)
                    }} handleUploading={uploadState => setIsUploading(uploadState)}></FileUploader>
            </div>
            <TextField
                label="Link a file instead"
                value={values.link}
                placeholder="https://yourlink.com"
                onChange={handleChange}
                onBlur={handleBlur}
                name="link"
                type="link"
                fullWidth
            />
            <div style={{ marginTop: 41 }}>
                <InputLabel> Select a photo instead</InputLabel>
                <Select
                    value={values.image || ''}
                    name="image"
                    onChange={event => {
                        setFieldValue("image", event.target.value)
                    }}
                    displayEmpty
                    onBlur={handleBlur}
                    input={<Input />}
                    placeholder="No image selected"
                    renderValue={image => (
                        !image ? <span>No image selected</span>
                            : (<div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                <LeftChip key={image} label={image} />
                            </div>)
                    )}
                    fullWidth
                >
                    {images.map(i => (
                        <MenuItem key={i._id} value={i}>
                            {i}
                        </MenuItem>
                    ))}
                </Select>
            </div>
            <Divider style={{ marginTop: 48, marginBottom: 16 }} />
            <LeftButton type="submit" id="submit-cover-photo" float disabled={isUploading}>
                {buttonContent}
            </LeftButton>
        </form>
    )
}

const Form = withFormik({
    mapPropsToValues: ({
        link, file
    }) => {
        return {
            link,
            file,
            image: ''
        };
    },

    handleSubmit: (values, { setSubmitting, props }) => {
        let { image } = values
        console.log(image)
        if (!values.image.length > 0) {
            image = values.link ? values.link : values.file
            console.log(image)
        }

        console.log(image)

        props.submit({ image }).then(() => setSubmitting(false))
    }
})(form)

export default (props) => {
    return <Form {...props} />
}
