import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { Portal } from 'react-portal'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default class RegisterAccountModalForm extends Component {
    state = {
        modalAnimation: '',
        overlayAnimation: '',
        name: '',
        number: '',
        address: '',
        tax_id: '',
        url: ''

    }

    handleOnChange = e => {
        // this.setState({ [e.target.name]: e.target.value })
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

    handleCompanyChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const steps = ['Company Information', 'Representative Information', 'Owner Information']
        let { activeStep } = this.state

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
                                <h5 className="modal-title Modal-Form-header pl-3">Register your account to collect payments</h5>
                                <IconButton onClick={this.handleToggleModal} color='primary'>
                                    <CloseIcon style={{ color: 'white' }} fontSize="large" />
                                </IconButton>
                            </div>
                            <div className="modal-body">
                                <Stepper activeStep={activeStep} alternativeLabel>
                                    {steps.map(label => (
                                        <Step key={label}>
                                            <StepLabel>{label}</StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>
                                <CompanySection handleChange={this.handleCompanyChange} name={this.state.name} number={this.state.number} address={this.state.address} tax_id={this.state.tax_id} url={this.state.url}></CompanySection>
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

const CompanySection = ({ handleChange, url, name, number, address, tax_id }) => {
    // let { name, number, address, tax_id, url } = company
    //company name
    //wesbite
    //TOS accept date
    //TOS id
    //us phone number
    //us address
    //company tax id
    //MCC - 4722
    return (
        <>
            <div className="row">
                <div className="col-10">
                    <TextField
                        required
                        id="standard-required"
                        label="company name"
                        value={name}
                        placeholder="Name of your company"
                        margin="normal"
                        className="mx-2 mt-4"
                        onChange={handleChange}
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
                        label="website"
                        value={url}
                        placeholder="Company's website"
                        margin="normal"
                        className="mx-2 mt-4"
                        onChange={handleChange}
                        name="url"
                        style={{ width: '100%' }}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-10">
                    <TextField
                        required
                        id="standard-required"
                        label="phone number"
                        value={number}
                        placeholder="Company's public phone number"
                        margin="normal"
                        className="mx-2 mt-4"
                        onChange={handleChange}
                        name="number"
                        style={{ width: '100%' }}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-10">
                    <TextField
                        required
                        id="standard-required"
                        label="company address"
                        value={address}
                        placeholder="Company's address"
                        margin="normal"
                        className="mx-2 mt-4"
                        onChange={handleChange}
                        name="address"
                        style={{ width: '100%' }}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-10">
                    <TextField
                        required
                        id="standard-required"
                        label="tax id"
                        value={tax_id}
                        placeholder="Company's tax id"
                        margin="normal"
                        className="mx-2 mt-4"
                        onChange={handleChange}
                        name="tax_id"
                        style={{ width: '100%' }}
                    />
                </div>
            </div>
        </>
    )
}