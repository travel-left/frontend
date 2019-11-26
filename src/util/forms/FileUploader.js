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
            this.props.handleChange(s3)
        } catch (err) {
            this.props.handleUploading(false)
        }
    }

    render() {
        return (
            <DropzoneArea
                onDrop={this.handleChange}
                showAlerts={false}
                dropzoneText='Drag and drop a file here or click'
                dropzoneClass={this.props.class}
                filesLimit={this.props.filesLimit}
                showPreviews={this.props.showPreviews}
                showPreviewsInDropzone={this.props.showPreviewsInDropzone}
                dropzoneParagraphClass='TripInfo-description'
                dropzoneClass='FileUploader'
            />
        )
    }
} 
