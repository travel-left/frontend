import React, { Component } from 'react'
import { DropzoneArea } from 'material-ui-dropzone'
import { apiCall } from '../util/api'
import { withStyles } from '@material-ui/core'

const styles = theme => ({
    fileUploader: {
        height: "100%",
        minHeight: "100%",
        width: "100%",
        minWidth: "100%",
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: theme.spacing(.5)
    },
    paragraph: {
        ...theme.typography.subtitle2,
    }
})

class FileUploader extends Component {

    handleChange = async file => {
        this.props.handleUploading(true)
        let formData = new FormData()
        formData.append('file', file)
        try {
            let s3 = await apiCall('post', '/api/fileUploads', formData)
            this.props.handleUploading(false)
            this.props.handleChange(s3)
        } catch (err) {
            this.props.handleUploading(false)
        }
    }

    render() {
        const { classes } = this.props
        return (
            <DropzoneArea
                onDrop={this.handleChange}
                showAlerts={false}
                dropzoneText='Drag and drop a file or click here'
                dropzoneClass={this.props.class}
                filesLimit={this.props.filesLimit}
                showPreviews={this.props.showPreviews}
                showPreviewsInDropzone={this.props.showPreviewsInDropzone}
                dropzoneParagraphClass={classes.paragraph}
                dropzoneClass={classes.fileUploader}
                acceptedFiles={this.props.acceptedFiles}
            />
        )
    }
}

export default withStyles(styles)(FileUploader)