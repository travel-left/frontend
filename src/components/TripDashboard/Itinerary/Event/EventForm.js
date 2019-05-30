import React, { Component } from 'react'

class EventForm extends Component {
    state = {
        event: {
            title: '',
            timeStart: '09:00',
            timeEnd: '12:00',
            category: '',
            summary: '',
            image: '',
            link: '',
            linkText: ''
        }
    }

    constructor(props) {
        super(props)
    }

    handleInputChange = e => {
        let updatedEvent = {
            ...this.state.event
        }
        updatedEvent[e.target.name] = e.target.value
        return this.setState({
            event: updatedEvent
        })
    }

    handleSubmitEvent = event => {
        event.preventDefault()
        this.props.submit(this.state.event)
    }

    render() {
        let { title, timeStart, timeEnd, summary, image, link, linkText } = this.state.event

        return (
            <form onSubmit={this.handleSubmitEvent} style={{marginTop: '60px'}}>
                                                <h3>Add an event</h3>
                <div class="form-row">
                    <div class="form-group">
                        <div className="form-row">
                            <div className="col-6">
                                <label htmlFor="title">Title</label>
                                <input name="title" className="form-control" type="text" value={title} onChange={this.handleInputChange} placeholder="Title" />
                            </div>
                            <div className="col-6">
                                <label htmlFor="category">Category</label>
                                <select id="inputState" className="form-control" name="category" value={this.state.category} onChange={this.handleInputChange}>
                                    <option value="" disabled selected> Category </option>
                                    <option value="event">Event</option>
                                    <option value="transportation">Transportation</option>
                                    <option value="lodging">Lodging</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col-6">
                                <label htmlFor="timeStart">Start</label>
                                <input name="timeStart" className="form-control" type="time" value={timeStart.toString()} onChange={this.handleInputChange} />
                            </div>
                            <div className="col-6">
                                <label htmlFor="timeEnd">End</label>
                                <input name="timeEnd" className="form-control" type="time" value={timeEnd.toString()} onChange={this.handleInputChange} />
                            </div>
                        </div>
                        <label htmlFor="Summary">Summary</label>
                        <textarea name="summary" placeholder="A summary of your event" class="form-control" cols="70" rows="2" value={summary} onChange={this.handleInputChange} />
                        <div className="form-row">
                            <div className="col-6">
                                <label htmlFor="image">Image link</label>
                                <input name="image" placeholder="www.urlToYourImage.com" class="form-control" type="text" value={image} onChange={this.handleInputChange} />
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
                <button type="submit" className="btn btn-lg btn-square dark pull-right"> SUBMIT </button>
            </form>
        )
    }
}

export default EventForm
