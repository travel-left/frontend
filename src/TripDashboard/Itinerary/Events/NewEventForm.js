import React, { Component } from 'react'
import Mortal from 'react-mortal'
import { types, timezones } from './EventHelpers'
import Select from 'react-select'
import Calendar from 'react-calendar'
import moment from 'moment'
import { customStyles, eventFormDocs, eventTimezone } from '../../../util/forms/SelectStyles'
import { apiCall } from '../../../util/api'

export default class NewEventForm extends Component {
    state = {
        eventType: '',
        open: false,
        err: '',
        name: '',
        date: '',
        step: 1,
        eventType: 'EVENT',
        docs: [],
        selectedDocs: [],
        startTime: '10:00',
        endTime: '13:00',
        timezone: moment.tz.guess(),
        description: '',
        location: ''
    }
    constructor(props) {
        super(props)

        this.getDocuments()
    }

    handleRemove = () => {
        this.toggleModal()
        this.props.remove()
    }

    handleChange = event => {
        console.log(event)

        this.setState({ [event.target.name]: event.target.value });
    }

    handleDateChange = date => {
        this.setState({ date })
    }

    handleEventTypeChange = eventType => {
        this.setState({ eventType: eventType.value })
    }

    handleTimezoneChange = timeZone => {
        this.setState({ timezone: timeZone.value })
    }

    handleDocumentsChange = documents => {
        console.log(documents)
        this.setState({
            selectedDocs: documents.map(doc => doc.value)
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        let { eventType, name, date, selectedDocs, startTime, endTime, timezone, description, location } = this.state
        this.props.submit({
            name,
            tzStart: timezone,
            tzEnd: timezone,
            type: eventType,
            description,
            address: location,
            dateStart: date,
            dateEnd: new Date(date.valueOf()),
            timeStart: startTime,
            timeEnd: endTime,
            documents: []
        })
    }

    toggleModal = () => {
        this.setState(prevState => ({ open: !prevState.open }))
    }

    closeModal = () => {
        this.setState({
            eventType: '',
            open: false,
            err: '',
            name: '',
            date: '',
            step: 1,
            eventType: 'EVENT'
        })
    }

    handleBackClick = e => {
        e.preventDefault()
        this.setState(prevState => (
            {
                ...prevState,
                step: prevState.step - 1
            })
        )
    }

    handleNextClick = e => {
        e.preventDefault()
        this.setState(prevState => (
            {
                ...prevState,
                step: prevState.step + 1
            })
        )
    }

    getDocuments = async () => {
        let docs = await apiCall(
            'get',
            `/api/trips/${this.props.tripId}/documents`
        )
        this.setState({ docs })
    }

    render() {
        let { submit, remove } = this.props
        let { err } = this.state
        return (
            <>
                <button
                    className="btn btn-primary btn-lg"
                    onClick={this.toggleModal}
                >
                    NEW EVENT
                </button>
                <Mortal
                    isOpened={this.state.open}
                    onClose={this.toggleModal}
                    motionStyle={(spring, isVisible) => ({
                        opacity: spring(isVisible ? 1 : 0),
                        modalOffset: spring(isVisible ? 0 : -90, {
                            stiffness: isVisible ? 300 : 200,
                            damping: isVisible ? 15 : 30
                        })
                    })}
                >
                    {(motion, isVisible) => (
                        <div
                            className="modal d-block"
                            style={{
                                maxHeight: 'calc(100vh - 50px)',
                                overflowY: 'auto'
                            }}
                        >
                            <div className="Modal--overlay"
                                style={{
                                    opacity: motion.opacity,
                                    pointerEvents: isVisible
                                        ? 'auto'
                                        : 'none'
                                }}
                                onClick={this.toggleModal}
                            />
                            <div className="modal-dialog" role="document">
                                <div
                                    className="modal-content Modal-Form"
                                    style={{
                                        opacity: motion.opacity,
                                        transform: `translate3d(0, ${
                                            motion.modalOffset
                                            }px, 0)`
                                    }}
                                >
                                    <form >
                                        <div className="modal-header Modal-Form-header py-3 d-flex align-items-center">
                                            <h5
                                                className="modal-title Modal-Form-header pl-3"
                                                id="addnewNameModal"
                                            >
                                                Create an event - {this.state.step} of 3
                                                </h5>
                                            <button
                                                className='btn btn-link'
                                                type="reset"
                                                aria-label="Close"
                                                style={{ backgroundColor: '0F58D1' }}
                                                onClick={this.closeModal}
                                            >
                                                <i class="material-icons" style={{ color: 'white' }}>close</i>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <p className="text-danger"> {err ? err : null}</p>
                                            <EventStep1 step={this.state.step} name={this.state.name} onChange={this.handleChange} handleEventTypeChange={this.handleEventTypeChange}></EventStep1>
                                            <EventStep2 step={this.state.step}
                                                eventType={this.state.eventType}
                                                onDateChange={this.handleDateChange}
                                                onChange={this.handleChange}
                                                handleTimezoneChange={this.handleTimezoneChange}
                                                timezone={this.state.timezone}
                                                startTime={this.state.startTime}
                                                endTime={this.state.endTime}>
                                            </EventStep2>
                                            <EventStep3 step={this.state.step}
                                                docs={this.state.docs}
                                                handleDocuments={this.handleDocumentsChange}
                                                description={this.state.description}
                                                location={this.props.location}
                                                onChange={this.handleChange}>
                                            </EventStep3>
                                            <hr className="my-4" />
                                            <EventButtons step={this.state.step} back={this.handleBackClick} next={this.handleNextClick} submit={this.handleSubmit}></EventButtons>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                </Mortal>
            </>
        )
    }
}

class EventStep1 extends Component {

    render() {
        return (
            this.props.step === 1 ?
                <>
                    <div className="">
                        <label htmlFor="" className="d-block">Name</label>
                        <input className="d-block form-control" type="text" name="name" placeholder="Name for your event" value={this.props.name} onChange={this.props.onChange} />
                    </div>
                    <div className="d-flex justify-content-start">
                        <div className="mt-2">
                            <label htmlFor="" className="d-block">Event Type</label>
                            <Select name="type" options={types} defaultValue={types[1]} label="Type" className="left-select" styles={customStyles} onChange={this.props.handleEventTypeChange} />
                        </div>

                    </div>
                </>
                : null
        )
    }
}

class EventStep2 extends Component {

    render() {
        let formContent
        switch (this.props.eventType) {
            case 'EVENT':
                formContent = <div>
                    <label className="d-block" htmlFor="cal">Date</label>
                    <Calendar onChange={this.props.onDateChange} calendarType="US" />
                    <div className="row">
                        <div className="col-6">
                            <label className="d-block" htmlFor="">Starts</label>
                            <input name="startTime" className="d-block form-control" type="time" value={this.props.startTime} onChange={this.props.onChange} />
                        </div>
                        <div className="col-6">
                            <label className="d-block" htmlFor="" >Ends</label>
                            <input name="endTime" className="d-block form-control" type="time" value={this.props.endTime} onChange={this.props.onChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label className="d-block" htmlFor="" className="d-block">Timezone</label>
                            <Select name="type" options={timezones} value={this.props.timezone} placeholder={this.props.timezone} label="Timezone" className="left-select" styles={eventTimezone} onChange={this.props.handleTimezoneChange} />
                        </div>
                        <div className="col-6">

                        </div>
                    </div>
                </div>
                break
            case 'FLIGHT':

                break
            case 'TRANSPORTATION':

                break
            case 'LODGING':
                break
            default:

                break
        }
        return (
            this.props.step === 2 ?
                <div className="">
                    {formContent}
                </div>
                : null
        )
    }
}

class EventStep3 extends Component {
    render() {
        return (
            this.props.step === 3 ? (
                <div>
                    <label className="d-block" htmlFor="">Description</label>
                    <textarea name="description"
                        name="description"
                        cols="70"
                        rows="2"
                        placeholder="A description of your event"
                        className="d-block form-control"
                        value={this.props.description}
                        onChange={this.props.onChange}
                    ></textarea>
                    <label className="d-block" htmlFor="">Location</label>
                    <input className="d-block form-control" type="text" name="location" id="" placeholder="Address for your event" value={this.props.location} onChange={this.props.onChange} />
                    <label className="d-block" htmlFor="" className="d-block">Documents </label>
                    <Select isMulti name="type" options={this.props.docs.map(doc => (
                        {
                            label: doc.name,
                            value: doc._id
                        }
                    ))} label="Timezone" className="left-select" styles={eventFormDocs} onChange={this.props.handleDocuments} />
                </div>
            ) : null
        )
    }
}

const EventButtons = ({ step, back, next, submit }) => {
    let buttons
    switch (step) {
        case 1:
            buttons = (
                <>
                    <button className="btn btn-lg btn-secondary" onClick={submit}>CREATE EVENT</button>
                    <div className="float-right">
                        <button className="btn btn-lg btn-primary" onClick={next}>NEXT</button>
                    </div>
                </>
            )
            break
        case 2:
            buttons = (
                <>
                    <button className="btn btn-lg btn-secondary" onClick={submit}>CREATE EVENT</button>
                    <div className="float-right">
                        <button className="btn btn-lg btn-link text-primary" onClick={back}>PREV</button>
                        <button className="btn btn-lg btn-primary" onClick={next}>NEXT</button>
                    </div>
                </>
            )
            break
        case 3:
            buttons = (
                <>
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-lg btn-link text-primary" onClick={back}>PREV</button>
                        <button className="btn btn-lg btn-primary" onClick={submit}>CREATE EVENT</button>
                    </div>
                </>
            )
            break

        default:
            break
    }
    return buttons
}