import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import { Portal } from 'react-portal'

export default class AddNewTravelerModalForm extends Component {
    state = {
        modalAnimation: '',
        overlayAnimation: '',
        name: '',
        email: '',
        phone: '',
        personalNotes: ''
    }

    handleOnChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = e => {
        const { name, email, phone, personalNotes } = this.state
        e.preventDefault()
        this.props.submit({
            name,
            email,
            phone,
            personalNotes
        })
        this.handleToggleModal()
    }

    handleToggleModal = async () => {
        if (this.props.isOpen) {
            this.setState({
                modalAnimation: 'zoomOut', overlayAnimation: 'fadeOut', name: '',
                name: '',
                email: '',
                phone: '',
                personalNotes: ''
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
                                <h5 className="modal-title Modal-Form-header pl-3"> Add a new traveler to your organization</h5>
                                <IconButton onClick={this.handleToggleModal} color='primary'>
                                    <CloseIcon style={{ color: 'white' }} fontSize="large" />
                                </IconButton>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-10">
                                        <TextField
                                            required
                                            id="standard-required"
                                            label="Full Name"
                                            value={this.state.name}
                                            placeholder="John Doe"
                                            margin="normal"
                                            className="mx-2 mt-4"
                                            onChange={this.handleOnChange}
                                            name="name"
                                            style={{ width: '100%' }}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-10">
                                        <TextField
                                            required
                                            id="standard-required"
                                            label="Email"
                                            value={this.state.email}
                                            placeholder="Traveler's email"
                                            margin="normal"
                                            className="mx-2 mt-4"
                                            onChange={this.handleOnChange}
                                            name="email"
                                            style={{ width: '100%' }}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-10">
                                        <TextField
                                            required
                                            id="standard-required"
                                            label="Phone number"
                                            value={this.state.phone}
                                            placeholder="Traveler's phone"
                                            margin="normal"
                                            className="mx-2 mt-4"
                                            onChange={this.handleOnChange}
                                            name="phone"
                                            style={{ width: '100%' }}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-10">
                                        <TextField
                                            id="standard-multiline-static"
                                            label="Personal notes"
                                            value={this.state.personalNotes}
                                            multiline
                                            rows="2"
                                            placeholder="Allergies: Health Restrictions: Favorite band: etc."
                                            className="mx-2 mt-4"
                                            margin="normal"
                                            onChange={this.handleOnChange}
                                            name="personalNotes"
                                            style={{ width: '100%' }}
                                        />
                                    </div>
                                </div>
                                <hr className="my-4" />
                                <Button type="submit" className="float-right" size="large" variant="contained" color="primary" style={{ width: '180px', height: '50px' }} onClick={this.handleSubmit}>SUBMIT</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </Portal >
        )
    }
}

