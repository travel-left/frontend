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
            <div className="card event-tile" style={{ width: '50vw' }}>
                <div className="card-body">
                    <form onSubmit={this.handleSubmitEvent}>
                        <div className="form-row">
                            <div className="col">
                                {/* title */}
                                <input name="title" className="form-control" type="text" value={title} onChange={this.handleInputChange} placeholder="Event title..." />
                            </div>
                            <div className="col" />
                            {/* category */}
                            <div className="col">
                                <select id="inputState" className="form-control" name="category" value={this.state.category} onChange={this.handleInputChange}>
                                    <option value="" disabled selected>
                                        Select a Category
                                    </option>
                                    <option value="event">Event</option>
                                    <option value="transportation">Transportation</option>
                                    <option value="lodging">Lodging</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col">
                                {/* time start */}
                                <input name="timeStart" placeholder="9:00" className="form-control" type="time" value={timeStart.toString()} onChange={this.handleInputChange} />
                            </div>
                            <div className="col">
                                {/* time start */}
                                <input name="timeEnd" className="form-control" type="time" value={timeEnd.toString()} onChange={this.handleInputChange} />
                            </div>
                            <div className="col" />
                            <div className="col" />
                        </div>
                        <div className="form-row">
                            {/* summary */}
                            <textarea name="summary" placeholder="A summary of your event" class="form-control" cols="70" rows="2" value={summary} onChange={this.handleInputChange} />
                        </div>
                        <div className="form-row">
                            {/* image */}
                            <input name="image" placeholder="www.urlToYourImage.com" class="form-control" type="text" value={image} onChange={this.handleInputChange} />
                        </div>
                        <div className="form-row">
                            <div className="col">
                                {/* link  */}
                                <input name="link" placeholder="www.aLink.com" className="form-control" type="text" placeholder="link" value={link} onChange={this.handleInputChange} />
                            </div>
                            <div className="col">
                                {/* link title */}
                                <input name="linkText" placeholder="name of your link" className="form-control" type="text" placeholder="link title" value={linkText} onChange={this.handleInputChange} />
                            </div>
                            <div className="col" />
                        </div>
                        <button type="submit" className="btn btn-primary float-right" style={{ backgroundColor: '#079992' }}>
                            SUBMIT
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

export default EventForm
