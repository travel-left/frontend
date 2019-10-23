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
        step: 0,
        name: '',
        number: '',
        address: '',
        tax_id: '',
        url: '',
        mcc: 4722,
        firstName: '',
        lastName: '',
        dob: '',
        repAddress: '',
        ssn: '',
        title: '',
        email: '',
        repPhone: '',
        ownerFirstName: '',
        ownerLastName: '',
        ownerEmail: ''
    }

    next = e => {
        e.preventDefault()
        this.setState(prevState => ({ ...prevState, step: prevState.step + 1 }))
    }
    back = e => {
        e.preventDefault()
        this.setState(prevState => ({ ...prevState, step: prevState.step - 1 }))
    }

    handleSubmit = e => {
        e.preventDefault()
        console.log(this.state)
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
        let { step, firstName, lastName, dob, repAddress, ssn, title, email, repPhone, ownerEmail, ownerLastName, ownerFirstName } = this.state

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
                                <Stepper activeStep={step} alternativeLabel>
                                    {steps.map(label => (
                                        <Step key={label}>
                                            <StepLabel>{label}</StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>

                                {step === 0 && <CompanySection
                                    handleChange={this.handleCompanyChange}
                                    name={this.state.name}
                                    number={this.state.number}
                                    address={this.state.address}
                                    tax_id={this.state.tax_id}
                                    url={this.state.url}
                                ></CompanySection>}

                                {step === 1 && <RepresentativeSection
                                    handleChange={this.handleCompanyChange}
                                    firstName={firstName}
                                    lastName={lastName}
                                    dob={dob}
                                    repAddress={repAddress}
                                    ssn={ssn}
                                    title={title}
                                    email={email}
                                    repPhone={repPhone}
                                ></RepresentativeSection>}
                                {step === 2 && <OwnerSection
                                    handleChange={this.handleCompanyChange}
                                    ownerFirstName={ownerFirstName}
                                    ownerLastName={ownerLastName}
                                    ownerEmail={ownerEmail}
                                ></OwnerSection>}
                                <hr className="my-4" />
                                {/* <Button type="submit" className="float-right" size="large" variant="contained" color="primary" style={{ width: '180px', height: '50px' }} onClick={this.handleSubmit}>SUBMIT</Button> */}
                                <StepThroughButtons step={this.state.step} length={2} back={this.back} next={this.next} onSubmit={this.handleSubmit}></StepThroughButtons>
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
    //MCC - 
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

const RepresentativeSection = ({ handleChange, firstName, lastName, dob, repAddress, ssn, title, email, repPhone }) => {
    // --------- rep first name
    // --------- rep last name
    // --------- rep DOB
    // --------- rep address
    // --------- last four SSN
    // --------- rep relationship title
    // --------- rep email
    // --------- rep phone
    return (
        <>
            <div className="row">
                <div className="col-10">
                    <TextField
                        required
                        id="standard-required"
                        label="first name"
                        value={firstName}
                        placeholder="Your first name"
                        margin="normal"
                        className="mx-2 mt-4"
                        onChange={handleChange}
                        name="firstName"
                        style={{ width: '100%' }}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-10">
                    <TextField
                        required
                        id="standard-required"
                        label="last name"
                        value={lastName}
                        placeholder="Your last name"
                        margin="normal"
                        className="mx-2 mt-4"
                        onChange={handleChange}
                        name="lastName"
                        style={{ width: '100%' }}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-10">
                    <TextField
                        required
                        id="standard-required"
                        label="Date of birth"
                        value={dob}
                        placeholder="Your birthday"
                        margin="normal"
                        className="mx-2 mt-4"
                        onChange={handleChange}
                        name="dob"
                        style={{ width: '100%' }}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-10">
                    <TextField
                        required
                        id="standard-required"
                        label="addresss"
                        value={repAddress}
                        placeholder="Your address"
                        margin="normal"
                        className="mx-2 mt-4"
                        onChange={handleChange}
                        name="repAddress"
                        style={{ width: '100%' }}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-10">
                    <TextField
                        required
                        id="standard-required"
                        label="Last four digits of SSN"
                        value={ssn}
                        placeholder="Last four digits of your SSN"
                        margin="normal"
                        className="mx-2 mt-4"
                        onChange={handleChange}
                        name="ssn"
                        style={{ width: '100%' }}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-10">
                    <TextField
                        required
                        id="standard-required"
                        label="Title"
                        value={title}
                        placeholder="Your title"
                        margin="normal"
                        className="mx-2 mt-4"
                        onChange={handleChange}
                        name="title"
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
                        value={email}
                        placeholder="Your email"
                        margin="normal"
                        className="mx-2 mt-4"
                        onChange={handleChange}
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
                        value={repPhone}
                        placeholder="Your phone number"
                        margin="normal"
                        className="mx-2 mt-4"
                        onChange={handleChange}
                        name="repPhone"
                        style={{ width: '100%' }}
                    />
                </div>
            </div>
        </>
    )
}

const OwnerSection = ({ handleChange, ownerFirstName, ownerLastName, ownerEmail }) => {
    return (
        <>
            <div className="row">
                <div className="col-10">
                    <TextField
                        required
                        id="standard-required"
                        label="First name"
                        value={ownerFirstName}
                        placeholder="Company owner's first name"
                        margin="normal"
                        className="mx-2 mt-4"
                        onChange={handleChange}
                        name="ownerFirstName"
                        style={{ width: '100%' }}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-10">
                    <TextField
                        required
                        id="standard-required"
                        label="Last name"
                        value={ownerLastName}
                        placeholder="Company owner's last name"
                        margin="normal"
                        className="mx-2 mt-4"
                        onChange={handleChange}
                        name="ownerLastName"
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
                        value={ownerEmail}
                        placeholder="Company owner's email"
                        margin="normal"
                        className="mx-2 mt-4"
                        onChange={handleChange}
                        name="ownerEmail"
                        style={{ width: '100%' }}
                    />
                </div>
            </div>
        </>
    )
}

const StepThroughButtons = ({ length, step, back, next, onSubmit, onDestroy }) => {
    let buttons
    if (step === 0) {//first page
        buttons = (
            <div className="float-right">
                <Button size="large" variant="contained" color="secondary" style={{ width: '180px', height: '50px', color: "white" }} onClick={next}>
                    NEXT
                </Button>
            </div>
        )
    } else if (step === length) {//last page
        buttons = (
            <div className="float-right">
                <button className="btn btn-lg btn-link text-primary" onClick={back}>PREV</button>
                <Button size="large" variant="contained" color="primary" style={{ width: '180px', height: '50px', color: "white" }} onClick={onSubmit}>
                    SUBMIT
                </Button>
            </div>
        )
    } else {//in between pages
        buttons = (
            <div className="float-right">
                <button className="btn btn-lg btn-link text-primary" onClick={back}>PREV</button>
                <Button size="large" variant="contained" color="secondary" style={{ width: '180px', height: '50px', color: "white" }} onClick={next}>
                    NEXT
                </Button>
            </div>
        )
    }

    return buttons
}