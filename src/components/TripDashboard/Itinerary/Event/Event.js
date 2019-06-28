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
        let iconString, color = ''
        switch (event.category) {
            case 'lodging':
                iconString = 'fa-bed'
                color = '#FEA600'
                break
            case 'transportation':
                iconString = 'fa-plane'
                color = '#BF9DD9'
                break
            case 'event':
                iconString = 'fa-bookmark'
                color = '#83C9F4'
                break
            case 'flight':
                iconString = 'fa-plane'
                color = '#CCAA55'
                break
            default:
                break
        }

        return (
            <div className='card mb-3 border-0 shadow'>
                <div className="card-body">
                    <h5 className="card-title">
                        <strong> {event.title}</strong>
                        <i className={`fa ${iconString} float-right`} style={{ color: color }} />
                    </h5>
                    <h6 className="card-subtitle mb-2" style={{ color: color }}>
                        {event.dtStart} - {event.dtEnd}
                    </h6>
                    <p className="card-text">{event.summary}</p>
                    <a href={event.link} className="card-link" target="_blank">
                        {event.linkText}
                    </a>
                    <i className="fa fa-trash float-right hover" onClick={this.deleteEvent} />
                </div>
            </div>
        )
    }
}

export default Event
