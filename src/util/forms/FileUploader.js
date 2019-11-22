import React, { Component } from 'react'
import { DropzoneArea } from 'material-ui-dropzone'
import { apiCall } from '../api'

export default class FileUploader extends Component {

    handleChange = async file => {
        this.props.handleUploading(true)
        let formData = new FormData()
        formData.append('file', file)
        try {
            let s3 = await apiCall('post', '/api/fileUploads/unAuth', formData)
            this.props.handleUploading(false)
            this.props.handleChange(s3.url)
        } catch (err) {
            this.props.handleUploading(false)
        }
    }

    render() {
        return (
            <DropzoneArea
                onDrop={this.handleChange}
                showAlerts={false}
                filesLimit={1}
                showPreviews
                showPreviewsInDropzone={false}
                dropzoneParagraphClass='TripInfo-description'
                dropzoneClass='FileUploader'
            />
        )
    }
} 
