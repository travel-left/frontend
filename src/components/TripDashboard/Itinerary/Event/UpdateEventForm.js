import React, { Component } from 'react'
import moment from 'moment'
import OptionList from '../../../Other/OptionList'
import FileUploader from '../../../Other/FileUploader'

class UpdateEventForm extends Component {
    state = {
        title: this.props.event.title,
        timeStart: moment(this.props.event.dtStart, ["h:mm A"]).format("HH:mm"),
        timeEnd: moment(this.props.event.dtEnd, ["h:mm A"]).format("HH:mm"),
        tzStart: this.props.event.tzStart,
        tzEnd: this.props.event.tzEnd,
        category: this.props.event.category,
        summary: this.props.event.summary,
        image: this.props.event.image,
        link: this.props.event.link,
        linkText: this.props.event.linkText
    }

    handleUpload = url => {
        let updatedEvent = {
            ...this.state
        }
        updatedEvent.image = url
        return this.setState({
            ...updatedEvent
        })
    }

    handleInputChange = e => {
        let updatedEvent = {
            ...this.state
        }

        updatedEvent[e.target.name] = e.target.value
        return this.setState({
            ...updatedEvent
        })
    }

    handleSubmitEvent = event => {
        event.preventDefault()
        this.props.submit(this.state)
    }

    render() {
        let id = this.props.event._id
        let { title, category, timeStart, timeEnd, tzStart, tzEnd, summary, image, link, linkText } = this.state
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
                <h5 className="text-light hover d-inline" data-toggle="modal" data-target={`#editEvent${id}`}>
                    <i class="far fa-edit text-secondary pl-2"></i>
                </h5>
                <div class="modal fade" id={`editEvent${id}`} tabindex="-1" role="dialog" aria-labelledby="addnewEventModal" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="">
                                    Update an event
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
                                            {/* <div className="form-row">
                                                <div className="col-6">
                                                    <label htmlFor="dateStart">Time Start</label>
                                                    <input name="dateStart" className="form-control" type="date" value={dtStart} style={{ width: '100%' }} onChange={this.handleInputChange} />
                                                </div>
                                                <div className="col-6">
                                                    <label htmlFor="dateEnd">Time End</label>
                                                    <input name="dateEnd" className="form-control" type="date" value={dtEnd} style={{ width: '100%' }} onChange={this.handleInputChange} />
                                                </div>
                                            </div> */}
                                            <div className="form-row">
                                                <div className="col-6">
                                                    <input name="timeStart" className="form-control" type="time" value={timeStart} onChange={this.handleInputChange} />
                                                </div>
                                                <div className="col-6">
                                                    <input name="timeEnd" className="form-control" type="time" value={timeEnd} onChange={this.handleInputChange} />
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

export default UpdateEventForm
