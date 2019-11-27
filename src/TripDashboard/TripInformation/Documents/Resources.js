import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { apiCall } from '../../../util/api'
import Snack from '../../../util/Snack'
import Document from './Document'
import FileUploader from '../../../util/forms/FileUploader'
import LeftItem from '../../../util/LeftItem';

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

    constructor(props) {
        super(props)
        this.getDocuments()
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
            this.getDocuments()
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

    getDocuments = async () => {
        let docs = await apiCall('get', `/api/trips/${this.TRIP_ID}/documents`)
        this.setState({ docs })
    }

    updateDocument = async (documentId, updateObject) => {
        try {
            await apiCall(
                'put',
                `/api/trips/${this.TRIP_ID}/documents/${documentId}`,
                updateObject, true
            )
            this.setState({
                snack: {
                    show: true,
                    variant: 'success',
                    message: 'Success!'
                }
            })

            this.getDocuments()
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

    deleteDocument = async docId => {
        try {
            await apiCall(
                'delete',
                `/api/trips/${this.TRIP_ID}/documents/${docId}`, true
            )
            this.setState({
                snack: {
                    show: true,
                    variant: 'success',
                    message: 'Success!'
                }
            })
            this.getDocuments()
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

    render() {
        const { docs } = this.state
        const uploadZone = (
            <LeftItem>
                <FileUploader
                    handleChange={this.createDocument}
                    handleUploading={this.uploadInProgress}
                    showPreviews={false}
                    showPreviewsInDropzone={false}
                    class='docDropzone'
                    filesLimit={100}
                ></FileUploader>
            </LeftItem>
        )

        let documents = docs.map(doc =>
            <Document
                _id={doc._id}
                name={doc.name}
                description={doc.description}
                link={doc.link}
                update={this.updateDocument}
                remove={this.deleteDocument} />
        )

        documents.splice(1, 0, uploadZone)

        return (
            <div style={{ marginTop: 64 }}>
                <Typography variant="h2" style={{ marginBottom: 16 }}>Trip Resources</Typography>
                <Grid container>
                    {documents}
                </Grid>
                {this.state.snack.show && <Snack open={this.state.snack.show} message={this.state.snack.message} variant={this.state.snack.variant} onClose={this.closeSnack}></Snack>}
            </div>
        )
    }
}
