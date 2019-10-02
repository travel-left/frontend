import React, { Component } from 'react'
import { Portal } from 'react-portal'
import { types, timezones } from './EventHelpers'
import Select from 'react-select'
import Calendar from 'react-calendar'
import moment from 'moment'
import { customStyles, eventFormDocs, eventTimezone } from '../../../util/forms/SelectStyles'
import { apiCall } from '../../../util/api'

export default class NewEventForm extends Component {
    state = {
        err: '',
        step: 1,
        documents: [],
        event: this.props.event ? this.props.event : {
            name: '',
            type: 'EVENT',
            date: new Date(this.props.trip.dateStart),
            timezone: moment.tz.guess(),
            start: '10:00',
            end: '13:00',
            description: '',
            documents: [],
            address: '',
            links: ['']
        },
        formAnimation: '',
        overlayAnimation: ''
    }

    constructor(props) {
        super(props)

        this.getDocuments()
    }

    handleRemove = () => {
        this.toggleModal()
        this.props.remove()
    }

    handleChange = e => {
        let key = e.target.name
        let value = e.target.value
        this.setState(prevState => ({
            event: {
                ...prevState.event,
                [key]: value
            }
        }))
    }

    handleTypeChange = type => {
        this.setState(prevState => ({
            event: {
                ...prevState.event,
                type: type.value
            }
        }))
    }

    handleDateChange = date => {
        this.setState(prevState => ({
            event: {
                ...prevState.event,
                date
            }
        }))
    }

    handleTimezoneChange = timezone => {
        this.setState(prevState => ({
            event: {
                ...prevState.event,
                timezone: timezone.value
            }
        }))
    }

    handleDocumentsChange = docs => {
        if (docs) {
            docs = docs.map(doc => doc.value)
            this.setState(prevState => ({
                event: {
                    ...prevState.event,
                    documents: this.state.documents.filter(document => docs.indexOf(document._id) !== -1)
                }
            }))
        } else {
            this.setState(prevState => ({
                event: {
                    ...prevState.event,
                    documents: []
                }
            }))
        }
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.submit(this.state.event)
        this.handleToggleModal()
    }

    handleToggleModal = () => {
        if (this.props.isOpen) this.setState({ formAnimation: 'zoomOut', overlayAnimation: 'fadeOut' })
        setTimeout(() => {
            this.props.toggleModal()
        }, 210);

    }

    handleBackClick = e => {
        e.preventDefault()
        this.setState(prevState => ({ step: prevState.step - 1 }))
    }

    handleNextClick = e => {
        e.preventDefault()
        this.setState(prevState => ({ step: prevState.step + 1 }))
    }

    getDocuments = async () => {
        let documents = await apiCall('get', `/api/trips/${this.props.trip._id}/documents`)
        this.setState({ documents })
    }

    handleAddingLink = e => {
        e.preventDefault()
        this.setState(prevState => {
            return {
                event: {
                    ...prevState.event,
                    links: [...prevState.event.links, '']
                }
            }
        })
    }

    handleLinkChange = e => {
        let links = [...this.state.event.links]
        let index = e.target.name.split('-')[1]
        links[index] = e.target.value
        this.setState(prevState => {
            return {
                event: {
                    ...prevState.event,
                    links
                }
            }
        })
    }

    render() {
        let { err } = this.state
        return (
            <Portal >
                <div className="modal d-block" style={{
                    maxHeight: 'calc(100vh - 50px)',
                    overflowY: 'auto'
                }}
                >
                    <div className={`Modal--overlay animated fadeIn ${this.state.overlayAnimation}`} onClick={this.handleToggleModal} />
                    <div className="modal-dialog" role="document">
                        <form className={`modal-content Modal-Form animated zoomIn ${this.state.formAnimation}`} style={{ backgroundColor: '#FFFFFF' }}>
                            <div className="modal-header Modal-Form-header py-3 d-flex align-items-center">
                                <h5 className="modal-title Modal-Form-header pl-3" id="addnewNameModal"> Create an event - {this.state.step} of 3</h5>
                                <button
                                    className='btn btn-link'
                                    type="reset"
                                    aria-label="Close"
                                    style={{ backgroundColor: '0F58D1' }}
                                    onClick={this.handleToggleModal}
                                >
                                    <i class="material-icons" style={{ color: 'white' }}>close</i>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p className="text-danger"> {err ? err : null}</p>
                                <EventStep1
                                    step={this.state.step}
                                    name={this.state.event.name}
                                    onChange={this.handleChange}
                                    onTypeChange={this.handleTypeChange}
                                >
                                </EventStep1>
                                <EventStep2
                                    step={this.state.step}
                                    type={this.state.event.type}
                                    onDateChange={this.handleDateChange}
                                    onChange={this.handleChange}
                                    handleTimezoneChange={this.handleTimezoneChange}
                                    timezone={this.state.event.timezone}
                                    start={this.state.event.start}
                                    end={this.state.event.end}
                                    calendarValue={this.state.event.date}
                                >
                                </EventStep2>
                                <EventStep3
                                    step={this.state.step}
                                    documents={this.state.documents}
                                    selectedDocuments={this.state.event.documents}
                                    handleDocuments={this.handleDocumentsChange}
                                    description={this.state.event.description}
                                    address={this.state.event.address}
                                    onChange={this.handleChange}
                                    links={this.state.event.links}
                                    addLink={this.handleAddingLink}
                                    onLinkChange={this.handleLinkChange}
                                >
                                </EventStep3>
                                <hr className="my-4" />
                                <EventButtons step={this.state.step} back={this.handleBackClick} next={this.handleNextClick} submit={this.handleSubmit}></EventButtons>
                            </div>
                        </form>
                    </div>
                </div>
            </Portal>
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
                            <Select name="type" options={types} defaultValue={types[1]} label="Type" className="left-select" styles={customStyles} onChange={this.props.onTypeChange} />
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
            = <div>
                <label className="d-block" htmlFor="cal">Date</label>
                <Calendar onChange={this.props.onDateChange} calendarType="US" value={this.props.calendarValue} />
                <div className="row">
                    <div className="col-6">
                        <label className="d-block" htmlFor="">Starts</label>
                        <input name="start" className="d-block form-control" type="time" value={this.props.start} onChange={this.props.onChange} />
                    </div>
                    <div className="col-6">
                        <label className="d-block" htmlFor="" >Ends</label>
                        <input name="end" className="d-block form-control" type="time" value={this.props.end} onChange={this.props.onChange} />
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
        let links = this.props.links.map((link, i) => <input name={'link-' + i} className="d-block form-control mt-2 mb-1" type="text" placeholder="Your link" onChange={this.props.onLinkChange} value={link} />)

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
                    <label className="d-block" htmlFor="">Address</label>
                    <input className="d-block form-control" type="text" name="address" id="" placeholder="Address for your event" value={this.props.address} onChange={this.props.onChange} />
                    <label className="d-block" htmlFor="" className="d-block">Resources </label>
                    <Select isMulti name="type" options={this.props.documents.map(doc => (
                        {
                            label: doc.name,
                            value: doc._id
                        }
                    ))} value={
                        this.props.selectedDocuments.map(doc => (
                            {
                                label: doc.name,
                                value: doc._id
                            }
                        ))
                    } label="Timezone" className="left-select" styles={eventFormDocs} onChange={this.props.handleDocuments} />
                    <label className="d-block" htmlFor="" className="d-block">Links </label>
                    {links}
                    <button className="btn btn-link" onClick={this.props.addLink}>Add another link</button>
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