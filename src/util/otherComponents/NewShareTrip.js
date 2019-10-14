import React, { Component } from 'react'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import moment from 'moment'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import { Portal } from 'react-portal'
import Fab from '@material-ui/core/Fab'
import { CopyToClipboard } from 'react-copy-to-clipboard'


export default class NewShareTrip extends Component {
    state = {
        modalAnimation: '',
        overlayAnimation: '',
    }

    handleToggleModal = async () => {
        if (this.props.isOpen) {
            this.setState({
                modalAnimation: 'zoomOut', overlayAnimation: 'fadeOut', name: '',
                description: '',
                dates: {
                    startDate: moment(),
                    endDate: moment().add(7, 'days')
                }
            },
                () => {
                    setTimeout(() => {
                        this.props.toggleModal()
                    }, 321);
                })
        }
    }

    render() {
        return (
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
                                <h5 className="modal-title Modal-Form-header pl-3">Share Trip</h5>
                                <IconButton onClick={this.handleToggleModal} color="primary">
                                    <CloseIcon style={{ color: 'white' }} fontSize="large" />
                                </IconButton>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="px-4">
                                            <p style={{
                                                fontFamily: 'Roboto',
                                                fontSize: '18px',
                                                color: '#666666',
                                                lineHeight: '24px',
                                                paddingTop: '10px',
                                                paddingBottom: '15px'
                                            }}>Use this link to share the trip. Anyone with the link can view only trip itinerary, info and coordinator details.</p>
                                            <div className="d-flex justify-content-center align-items-center mb-4">

                                                <CopyToClipboard text={`https://app.travel-left.com/trips/${this.props.tripId}/share`} onCopy={this.handleToggleModal}>
                                                    <Fab variant="extended" aria-label="delete" className="linky-boi-button">Copy link to clipboard</Fab>
                                                </CopyToClipboard>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </Portal >
        )
    }
}