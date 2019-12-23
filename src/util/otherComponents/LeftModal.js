import React, { Component } from 'react'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { Portal } from 'react-portal'

export default class LeftModal extends Component {
    state = {
        modalAnimation: '',
        overlayAnimation: '',
    }

    handleToggleModal = async () => {
        if (this.props.isOpen) {
            this.setState({
                modalAnimation: 'zoomOut', overlayAnimation: 'fadeOut', name: '',
            },
                () => {
                    setTimeout(() => {
                        this.props.toggleModal()
                    }, 321);
                })
        }
    }

    handleSubmit = async formData => {
        await this.props.submit(formData)
        this.handleToggleModal()
    }

    render() {
        const Form = this.props.form ? this.props.form : null
        return (
            <Portal >
                <div className="modal d-block" style={{
                    maxHeight: 'calc(100vh - 48px)',
                    overflowY: 'auto'
                }}
                >
                    <div className={`Modal--overlay animated fadeIn ${this.state.overlayAnimation}`} onClick={this.handleToggleModal} />
                    <div className="modal-dialog" role="document" >
                        <div className={`modal-content Modal-Form animated zoomIn ${this.state.modalAnimation}`} style={{ backgroundColor: '#FFFFFF', borderRadius: 8 }}>
                            <div className="modal-header Modal-Form-header d-flex align-items-center bg-primary" style={{ padding: 16, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
                                <h5 className="modal-title Modal-Form-header"> {this.props.title}</h5>
                                <IconButton onClick={this.handleToggleModal} color='primary'>
                                    <CloseIcon style={{ color: 'white' }} fontSize="large" />
                                </IconButton>
                            </div>
                            <div className="modal-body" style={{ paddingLeft: 16, paddingRight: 16, backgroundColor: 'white', borderRadius: 8 }}>
                                <Form  {...this.props} submit={this.handleSubmit} />
                            </div>
                        </div>
                    </div>
                </div>
            </Portal >
        )
    }
}


