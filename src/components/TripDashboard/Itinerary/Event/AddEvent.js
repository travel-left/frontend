import React, { Component } from 'react'
import moment from 'moment-timezone'
import OptionList from '../../../Other/OptionList'
import FileUploader from '../../../Other/FileUploader'

class AddEvent extends Component {
    state = {
        title: '',
        dateStart: this.props.initDay.split('T')[0],
        timeStart: '09:00',
        tzStart: moment.tz.guess(true),
        dateEnd: this.props.initDay.split('T')[0],
        timeEnd: '12:00',
        tzEnd: moment.tz.guess(true),
        category: '',
        summary: '',
        image: '',
        link: '',
        linkText: ''
    }

    userChangedDates = false

    componentDidUpdate(prevProps) {
        if (prevProps.initDay !== this.props.initDay && !this.userChangedDates) {
            this.setState({
                dateStart: this.props.initDay.split('T')[0],
                dateEnd: this.props.initDay.split('T')[0]
            })
        }
    }

    handleUpload = url => {
        let updatedEvent = {
            ...this.state
        }
        updatedEvent.image = url
        this.setState({
            ...updatedEvent
        })
    }

    handleInputChange = e => {
        if (e.target.name === 'dateStart' || e.target.name === 'dateEnd') {
            this.userChangedDates = true
        }
        let updatedEvent = {
            ...this.state
        }
        updatedEvent[e.target.name] = e.target.value
        this.setState({
            ...updatedEvent
        })
    }

    handleSubmitEvent = event => {
        event.preventDefault()
        this.props.submit(this.state)
    }

    render() {
        let { title, category, dateStart, timeStart, tzStart, dateEnd, timeEnd, tzEnd, summary, image, link, linkText } = this.state
        const categories = [
            {
                name: 'Category',
                value: '',
                hidden: true,
                default: true
            },
            {
                name: 'Lodging',
                value: 'lodging'
            },
            {
                name: 'Event',
                value: 'event'
            },
            {
                name: 'Transportation',
                value: 'transportation'
            },
            {
                name: 'Flight',
                value: 'flight'
            }
        ]
        let names = moment.tz.names().map(name => {
            const offset = moment.tz(name).format('Z')
            const abbrev = moment.tz(name).format('z')
            return {
                name: `(UTC${offset}) ${name} (${abbrev})`,
                value: name,
                offset: offset
            }
        })

        names = names.sort((f, s) => {
            return parseInt(f.offset, 10) - parseInt(s.offset, 10)
        })

        return (
            <>
                <button class="btn btn-lg btn-primary" data-toggle="modal" data-target="#newEvent">
                    ADD NEW EVENT
                </button>
                <div class="modal fade" id="newEvent" tabindex="-1" role="dialog" aria-labelledby="addnewEventModal" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="addnewEventModal">
                                    Fill out an event
                                </h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <div className="form-row">
                                                <div className="col-6">
                                                    <label htmlFor="title">Title</label>
                                                    <input name="title" className="form-control" type="text" value={title} onChange={this.handleInputChange} placeholder="Title" />
                                                </div>
                                                <div className="col-6">
                                                    <label htmlFor="category">Category</label>
                                                    <select id="inputState" className="form-control" name="category" value={category} onChange={this.handleInputChange}>
                                                        <OptionList options={categories} />
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="col-6">
                                                    <label htmlFor="dateStart">Time Start</label>
                                                    <input name="dateStart" className="form-control" type="date" value={dateStart} style={{ width: '100%' }} onChange={this.handleInputChange} />
                                                </div>
                                                <div className="col-6">
                                                    <label htmlFor="dateEnd">Time End</label>
                                                    <input name="dateEnd" className="form-control" type="date" value={dateEnd} style={{ width: '100%' }} onChange={this.handleInputChange} />
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="col-6">
                                                    <input name="timeStart" className="form-control" type="time" value={timeStart.toString()} onChange={this.handleInputChange} />
                                                </div>
                                                <div className="col-6">
                                                    <input name="timeEnd" className="form-control" type="time" value={timeEnd.toString()} onChange={this.handleInputChange} />
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="col-6">
                                                    <select id="inputState" className="form-control" name="tzStart" value={tzStart} onChange={this.handleInputChange}>
                                                        <OptionList options={names} />
                                                    </select>
                                                </div>
                                                <div className="col-6">
                                                    <select id="inputState" className="form-control" name="tzEnd" value={tzEnd} onChange={this.handleInputChange}>
                                                        <OptionList options={names} />
                                                    </select>
                                                </div>
                                            </div>
                                            <label htmlFor="Summary">Summary</label>
                                            <textarea name="summary" placeholder="A summary of your event" className="form-control" cols="70" rows="2" value={summary} onChange={this.handleInputChange} />
                                            <div className="form-row">
                                                <div className="col-6">
                                                    <label htmlFor="image">Image link</label>
                                                    <div className="input-group">
                                                        <input name="image" className="form-control" type="text" value={image} onChange={this.handleInputChange} placeholder="https://www.link-to-your=image.com" />
                                                        <FileUploader id="addEvent" isAuth={true} onUpload={this.handleUpload} accept="image/*" />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <label htmlFor="Link">Link</label>
                                                    <input name="link" placeholder="www.aLink.com" className="form-control" type="text" placeholder="link" value={link} onChange={this.handleInputChange} />
                                                </div>
                                            </div>
                                            <label htmlFor="linkText">Link text</label>
                                            <input name="linkText" placeholder="name of your link" className="form-control" type="text" placeholder="link title" value={linkText} onChange={this.handleInputChange} />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button onClick={this.handleSubmitEvent} type="button" class="btn btn-primary" data-dismiss="modal">
                                    SUBMIT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default AddEvent
