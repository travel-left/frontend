import React, { Component } from 'react'

class Event extends Component {
    constructor(props) {
        super(props)
    }

    deleteEvent = () => {
        this.props.removeEvent(this.props.event._id)
    }

    render() {
        let { event } = this.props
        let iconString = ''
        switch (event.category) {
            case 'lodging':
                iconString = 'fa-bed'
                break
            case 'transportation':
                iconString = 'fa-plane'
                break
            case 'event':
                iconString = 'fa-bookmark'
                break
            case 'flight':
                iconString = 'fa-plane'
                break
            default:
                break
        }
        return (
            <div className='card mb-3'>
                <div className="card-body">
                    <h5 className="card-title">
                        <strong> {event.title}</strong>
                        <i className={`fa ${iconString} float-right`} aria-hidden="true" />
                    </h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                        {event.dtStart} - {event.dtEnd}
                    </h6>
                    <p className="card-text">{event.summary}</p>
                    <a href={event.link} className="card-link">
                        {event.linkText}
                    </a>
                    <i className="fa fa-trash float-right" aria-hidden="true" onClick={this.deleteEvent} />
                </div>
            </div>
        )
    }
}

export default Event
