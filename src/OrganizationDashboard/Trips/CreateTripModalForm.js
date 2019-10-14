import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import moment from 'moment'
import 'react-dates/initialize'
import { DateRangePicker } from 'react-dates'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import 'react-dates/lib/css/_datepicker.css'
import { Portal } from 'react-portal'

export default class CreateTripModalForm extends Component {
    state = {
        modalAnimation: '',
        overlayAnimation: '',
        name: '',
        description: '',
        dates: {
            startDate: moment(),
            endDate: moment().add(7, 'days')
        }
    }

    handleOnChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.submit({
            name: this.state.name,
            description: this.state.description,
            dates: this.state.dates
        })
        this.handleToggleModal()
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
                                <h5 className="modal-title Modal-Form-header pl-3"> {this.props.title}</h5>
                                <IconButton onClick={this.handleToggleModal} style={{ backgroundColor: '#1C61D8' }}>
                                    <CloseIcon style={{ color: 'white' }} fontSize="large" />
                                </IconButton>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-10">
                                        <TextField
                                            required
                                            id="standard-required"
                                            label="Trip name"
                                            value={this.state.name}
                                            placeholder="Austrailia"
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
                                            id="standard-multiline-static"
                                            label="Description"
                                            value={this.state.description}
                                            multiline
                                            rows="2"
                                            placeholder="2020 Summer Study Abroad South Africa Cal State Fullerton"
                                            className="mx-2 mt-4"
                                            margin="normal"
                                            onChange={this.handleOnChange}
                                            name="description"
                                            style={{ width: '100%' }}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-10">
                                        <div className="mx-2 mt-4">
                                            <InputLabel>Dates</InputLabel>
                                            <DateRangePickerWrapper name="dates" value={this.state.dates} onChange={this.handleOnChange} />
                                        </div>
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

class DateRangePickerWrapper extends Component {
    state = {
        focusedInput: moment()
    }

    onDatesChange = ({ startDate, endDate }) => {
        this.setState({
            startDate,
            endDate
        });
    }

    onFocusChange = (focusedInput) => {
        this.setState({ focusedInput });
    }

    handleOnChange = values => {
        this.props.onChange({
            target: {
                name: 'dates',
                value: values
            }
        })
    }

    render() {
        const { focusedInput } = this.state;
        const { value } = this.props

        return (
            <div>
                <DateRangePicker
                    onDatesChange={this.handleOnChange}
                    onFocusChange={this.onFocusChange}
                    focusedInput={focusedInput}
                    startDate={value.startDate}
                    startDateId="your_unique_start_date_id"
                    endDateId="your_unique_end_date_id"
                    endDate={value.endDate}
                />
            </div>
        );
    }
}
