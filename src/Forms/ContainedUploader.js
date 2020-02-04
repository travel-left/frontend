import React, { Component } from 'react'
import FileUploader from './FileUploader'
import { apiCall } from '../util/api'
import Snack from '../util/otherComponents/Snack'

export default class Resources extends Component {

    TRIP_ID = this.props.tripId

    state = {
        docs: [],
        snack: {
            show: false,
            variant: '',
            message: ''
        },
    }

    closeSnack = () => (this.setState({ snack: { show: false } }))

    createDocument = async doc => {
        doc.link = doc.url

        try {
            await apiCall(
                'post',
                `/api/trips/${this.TRIP_ID}/documents`,
                doc
            )
            this.setState({
                snack: {
                    show: true,
                    variant: 'success',
                    message: 'Success!'
                }
            })
            this.props.onUploadFinish()
        } catch (err) {
            this.setState({
                snack: {
                    show: true,
                    variant: 'error',
                    message: 'An error occurred.'
                }
            })
        }
    }

    uploadInProgress = () => {
        this.setState({
            snack: {
                show: true,
                variant: 'info',
                message: 'Uploading file. . .'
            }
        })
    }

    render() {
        return (
            <div id="file-uploader" style={{ width: '100%', height: '100%' }}>
                <FileUploader
                    handleChange={this.createDocument}
                    handleUploading={this.uploadInProgress}
                    showPreviews={false}
                    showPreviewsInDropzone={false}
                    class='docDropzone'
                    filesLimit={100}

                ></FileUploader>
                {this.state.snack.show && <Snack open={this.state.snack.show} message={this.state.snack.message} variant={this.state.snack.variant} onClose={this.closeSnack}></Snack>}
            </div>
        )
    }
}
