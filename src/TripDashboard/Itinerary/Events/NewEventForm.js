import React, { Component } from 'react'
import Mortal from 'react-mortal'
import { schema, types, timezones } from './EventHelpers'
import Select from 'react-select'
import Calendar from 'react-calendar'
import { customStyles } from '../../../util/forms/SelectStyles'

export default class NewEventForm extends Component {
    state = {
        eventType: '',
        open: false,
        err: '',
        name: '',
        date: '',
        step: 1
    }
    constructor(props) {
        super(props)
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

    toggleModal = () => {
        this.setState(prevState => ({ open: !prevState.open }))
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
                            <div
                                className="Modal--overlay"
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
                                                Create an event
                                                </h5>
                                            <button
                                                className='btn btn-link'
                                                type="reset"
                                                aria-label="Close"
                                                style={{ backgroundColor: '0F58D1' }}
                                            >
                                                <i class="material-icons" style={{ color: 'white' }}>close</i>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <p className="text-danger">
                                                {err ? err : null}
                                            </p>{' '}
                                            <div className="form-row">
                                                <EventStep1 step={this.state.step} name={this.state.name} onChange={this.handleChange} onDateChange={this.handleDateChange}></EventStep1>
                                                <EventStep2 step={this.state.step}></EventStep2>
                                            </div>

                                            <hr className="my-4" />
                                            {remove && (
                                                <button
                                                    type="button"
                                                    className="btn btn-lg btn-danger ml-4 mb-4 text-light hover"
                                                    onClick={this.handleRemove}
                                                >
                                                    DELETE
                                                </button>
                                            )}
                                            <button className="btn btn-lg btn-secondary">CREATE EVENT</button>
                                            <div className="float-right">
                                                <button className="btn btn-lg btn-link text-primary" onClick={this.handleBackClick}>PREV</button>
                                                <button className="btn btn-lg btn-primary" onClick={this.handleNextClick}>NEXT</button>
                                            </div>
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
                    <div className="col-12">
                        <label htmlFor="" className="d-block">Name</label>
                        <input type="text" name="name" placeholder="Name for your event" value={this.props.name} onChange={this.props.onChange} />
                    </div>
                    <div className="col-12 d-flex justify-content-start">
                        <div className="mt-2">
                            <label htmlFor="cal">Date</label>
                            <Calendar onChange={this.props.onDateChange} />
                        </div>

                    </div>
                </>
                : null
        )
    }
}

class EventStep2 extends Component {

    render() {
        return (
            this.props.step === 2 ?
                <>
                    <label htmlFor="" className="d-block">Event Type</label>
                    <Select name="type" options={types} label="Type" className="left-select" styles={customStyles} />
                </>
                : null
        )
    }
}