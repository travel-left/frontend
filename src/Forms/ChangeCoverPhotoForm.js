import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
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
    } = props

    const [isUploading, setIsUploading] = useState(false)

    let buttonContent = isUploading ? <CircularProgress color='primary' /> : 'Submit'

    return (
        <form onSubmit={handleSubmit} style={{ marginTop: 41 }}>
            <div >
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
            <Divider style={{ marginTop: 40, marginBottom: 25 }} />
            <LeftButton type="submit" id="status" float disabled={isUploading}>
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
