import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { apiCall } from '../../../util/api'
import Snack from '../../../util/otherComponents/Snack'
import Document from './Document'
import Card from '@material-ui/core/Card'
import DocumentForm from '../../../Forms/DocumentForm'
import ContainedUploader from '../../../Forms/ContainedUploader'
import LeftModal from '../../../util/otherComponents/LeftModal'
import LeftFab from '../../../util/otherComponents/LeftFab'
import { withStyles } from '@material-ui/core'

const styles = theme => ({
    resourcesSection: {
        marginTop: theme.spacing(6)
    },
    resourcesHeader: {
        display: "flex",
        alignItems: "center"
    },
    linkBtn: {
        marginLeft: theme.spacing(4)
    },
    resourceList: {
        marginTop: theme.spacing(2)
    },
    resource: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: theme.spacing(2),
        padding: theme.spacing(2),
        maxWidth: theme.spacing(68),
        height: theme.spacing(23)
    },
})

class Resources extends Component {

    TRIP_ID = this.props.tripId

    state = {
        docs: [],
        snack: {
            show: false,
            variant: '',
            message: ''
        },
        isNewLinkModalOpen: false
    }

    constructor(props) {
        super(props)
        this.getDocuments()
    }

    closeSnack = () => (this.setState({ snack: { show: false } }))
    closeModal = () => (this.setState({ isNewLinkModalOpen: false }))
    openModal = () => (this.setState({ isNewLinkModalOpen: true }))

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

    createDocument = async doc => {
        doc.type = 'LINK'
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
        const { classes, share } = this.props
        const { docs } = this.state
        const uploadZone = (
            <Grid item xs={12} sm={8} md={6} >
                <Card className={classes.resource} >
                    <ContainedUploader tripId={this.TRIP_ID} onUploadFinish={this.getDocuments}></ContainedUploader>
                </Card>
            </Grid>
        )

        let documents = docs.map(doc =>
            <Document
                _id={doc._id}
                name={doc.name}
                description={doc.description}
                link={doc.link}
                type={doc.type}
                update={this.updateDocument}
                remove={this.deleteDocument}
                share={share} />
        )

        !share && documents.splice(1, 0, uploadZone)

        return (
            <div className={classes.resourcesSection}>
                <div className={classes.resourcesHeader}>
                    <Typography variant="h2" >Resources</Typography>
                    {!share &&
                        <div className={classes.linkBtn}>
                            <LeftFab
                                onClick={this.openModal}
                                id="add-new-trip-link-button"
                                color="secondary"
                            >
                                Add Link
                            </LeftFab>
                        </div>
                    }
                    {
                        this.state.isNewLinkModalOpen && <LeftModal
                            isOpen={this.state.isNewLinkModalOpen}
                            toggleModal={this.closeModal}
                            title='Create a link'
                            type='LINK'
                            submit={this.createDocument}
                            form={DocumentForm}
                        />
                    }
                </div>
                <Grid container className={classes.resourceList}>
                    {documents}
                </Grid>
                {this.state.snack.show && <Snack open={this.state.snack.show} message={this.state.snack.message} variant={this.state.snack.variant} onClose={this.closeSnack}></Snack>}
            </div>
        )
    }
}

export default withStyles(styles)(Resources)