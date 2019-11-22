import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import FileUploader from '../../util/forms/FileUploader'
import TextField from '@material-ui/core/TextField'
import { withFormik } from "formik"
import CircularProgress from '@material-ui/core/CircularProgress'
import * as Yup from 'yup'

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

    const [isUploading, setIsUploading] = useState(false)

    let buttonContent = isUploading ? <CircularProgress color='primary' /> : 'Submit'

    return (
        <form onSubmit={handleSubmit} style={{ marginTop: 41 }}>
            <FileUploader value={values.file} name='file' handleChange={value => {
                setFieldValue("file", value)
            }} handleUploading={uploadState => setIsUploading(uploadState)}></FileUploader>
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
            <Divider style={{ marginTop: 40 }} />
            <Button size="large" type="submit" id="status" variant="contained" color="primary" style={{ width: '180px', height: '50px', float: 'right', marginTop: '25px' }} disabled={isUploading}>
                {buttonContent}
            </Button>
        </form>
    )
}

const Form = withFormik({
    mapPropsToValues: ({
        link, file
    }) => {
        return {
            link,
            file
        };
    },

    handleSubmit: (values, { setSubmitting, props }) => {
        const image = values.link ? values.link : values.file
        props.submit({ image }).then(() => setSubmitting(false))
    }
})(form)

export default (props) => {
    return <Form {...props} />
}
