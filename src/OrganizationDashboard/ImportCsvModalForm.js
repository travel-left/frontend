import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { Portal } from 'react-portal'
import { apiCall } from '../util/api'
import CircularProgress from '@material-ui/core/CircularProgress'
import Snack from '../util/Snack'

export default class ImportCsvModalForm extends Component {
    state = {
        modalAnimation: '',
        overlayAnimation: '',
        uploading: false,
        fileUrl: '',
        snack: {
            show: false,
            variant: '',
            message: ''
        },
    }

    closeSnack = () => (this.setState({ snack: { show: false } }))
    handleUpload = async file => {
        const fileSize = file.size / 1024 / 1024 // In MB
        if (fileSize > 100) {
            throw new Error('File size is too large (maximum is 100 MB)')
        }
        this.setState({ uploading: true })
        let formData = new FormData()
        formData.append('file', file)
        let s3
        try {
            s3 = await apiCall('post', '/api/fileUploads/unAuth', formData)
            this.setState({ uploading: false, fileUrl: s3.url, error: false })
            this.props.submit({ file: s3.url })
            this.handleToggleModal()
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

    handleToggleModal = async () => {
        if (this.props.isOpen) {
            this.setState({
                modalAnimation: 'zoomOut', overlayAnimation: 'fadeOut',
            },
                () => {
                    setTimeout(() => {
                        this.props.toggleModal()
                    }, 321);
                })
        }
    }

    render() {
        const { uploading, fileUrl } = this.state

        let spinner = uploading ? <LoadingSpinner /> : null
        return (
            <>
                <Portal >
                    <div className="modal d-block" style={{
                        maxHeight: 'calc(100vh - 50px)',
                        overflowY: 'auto'
                    }}
                    >
                        <div className={`Modal--overlay animated fadeIn ${this.state.overlayAnimation}`} onClick={this.handleToggleModal} />
                        <div className="modal-dialog" role="document">
                            <form className={`modal-content Modal-Form animated zoomIn ${this.state.modalAnimation}`} style={{ backgroundColor: '#FFFFFF' }}>
                                <div className="modal-header Modal-Form-header py-3 d-flex align-items-center">
                                    <h5 className="modal-title Modal-Form-header pl-3"> Import travelers from CSV file</h5>
                                    <IconButton onClick={this.handleToggleModal} color='primary'>
                                        <CloseIcon style={{ color: 'white' }} fontSize="large" />
                                    </IconButton>
                                </div>
                                <div className="modal-body p-4">
                                    <div className="row">
                                        <div className="col-12 justify-content-center align-items-center flex-column">
                                            <Button href="https://travel-left-public.s3.amazonaws.com/UploadTravelers.csv" >
                                                Download a Template CSV File
                                        </Button>
                                        </div>
                                    </div>
                                    <hr className="my-4" />
                                    <div className="float-right">
                                        <input
                                            id="contained-button-file"
                                            multiple
                                            type="file"
                                            className="d-none"
                                            onChange={async event => {
                                                try {
                                                    await this.handleUpload(event.currentTarget.files[0])
                                                } catch (err) {
                                                    console.log(err)
                                                }
                                            }}
                                        />
                                        <label htmlFor="contained-button-file">
                                            <Button variant="contained" component="span" color="secondary" style={{ width: '180px', height: '50px', color: 'white' }}>
                                                {spinner ? spinner : 'Upload'}
                                            </Button>
                                        </label>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </Portal >
                {this.state.snack.show && <Snack open={this.state.snack.show} message={this.state.snack.message} variant={this.state.snack.variant} onClose={this.closeSnack}></Snack>}
            </>
        )
    }
}

const LoadingSpinner = () => <CircularProgress color='primary' />