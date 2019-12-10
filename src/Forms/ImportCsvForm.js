import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import FileUploader from './FileUploader'
import { withFormik } from "formik"
import CircularProgress from '@material-ui/core/CircularProgress'
import Fab from '@material-ui/core/Fab'

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
            <div style={{ margin: 16 }}>
                <div className="d-flex justify-content-center align-items-center">
                    <Fab variant="extended" color='primary' href="https://travel-left-public.s3.amazonaws.com/UploadTravelers.csv" style={{ color: 'white' }}>Download a Template CSV File</Fab>
                </div>
            </div>
            <Divider style={{ marginTop: 40 }} />
            <Button size="large" variant="contained" color="primary" style={{ width: '180px', height: '50px', float: 'right', marginTop: '25px' }} >
                {buttonContent}
            </Button>
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
