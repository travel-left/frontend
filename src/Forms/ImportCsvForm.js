import React, { useState } from 'react'
import Divider from '@material-ui/core/Divider'
import FileUploader from './FileUploader'
import { withFormik } from "formik"
import CircularProgress from '@material-ui/core/CircularProgress'
import Fab from '@material-ui/core/Fab'
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
        <form onSubmit={handleSubmit} >
            <FileUploader
                value={values.file}
                showPreviews={true}
                showPreviewsInDropzone={false}
                class='docDropzone'
                filesLimit={1}
                acceptedFiles={['text/csv']}
                name='file'
                handleChange={value => {
                    setFieldValue("file", value.url)
                }}
                handleUploading={uploadState => setIsUploading(uploadState)}></FileUploader>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Fab variant="extended" color='primary' href="https://travel-left-public.s3.amazonaws.com/UploadTravelers.csv" style={{ color: 'white', marginTop: 16 }}>Download a Template CSV File</Fab>
            </div>
            <Divider style={{ marginTop: 48, marginBottom: 16 }} />
            <LeftButton float type="submit" disabled={isUploading || isSubmitting}>
                {buttonContent}
            </LeftButton>
        </form>
    )
}

const Form = withFormik({
    mapPropsToValues: ({
    }) => {
        return {
            file: ''
        };
    },

    handleSubmit: (values, { setSubmitting, props }) => {
        setSubmitting(true)
        props.submit({ file: values.file }).then(() => setSubmitting(false))
    }
})(form)

export default (props) => {
    return <Form {...props} />
}
