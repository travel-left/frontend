import React, { Component } from 'react'
import EventForm from './EventForm'
import Map from './Map'

class Event extends Component {
    deleteEvent = () => {
        this.props.removeEvent(this.props.event._id)
    }

    updateEvent = updateObject => {
        this.props.updateEvent(this.props.event._id, updateObject)
    }

    render() {
        let { event } = this.props
        let iconString,
            color = ''
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
                iconString = 'fa-calendar-check'
                color = '#83C9F4'
                break
            case 'flight':
                iconString = 'fa-plane'
                color = '#CCAA55'
                break
            default:
                break
        }

        const map =
            event.coordinates.long && event.coordinates.lat ? (
                <div className="row">
                    <div className="col-12">
                        <Map coordinates={event.coordinates} />
                    </div>
                </div>
            ) : null

        const address = event.address ? (
            <p className="card-text">{'Address: ' + event.address}</p>
        ) : null

        return (
            <div className="card mb-3 border-0 shadow px-3 py-1 rounded-lg">
                <div className="row">
                    <div className="card-body">
                        <h5 className="card-title">
                            <strong> {event.title}</strong>
                            <i className={`fa ${iconString} float-right`} style={{ color: color }} />
                        </h5>
                        <div className="row">
                            <div className="col-md-6 d-flex flex-column">
                                <h6 className="card-subtitle mb-2" style={{ color: color }}>
                                    {event.dtStart} - {event.dtEnd}
                                </h6>
                                <p className="card-text">{event.summary}</p>
                                <a href={event.link} className="card-link" target="_blank" rel="noopener noreferrer">
                                    {event.linkText}
                                </a>
                                <div className='mt-auto'>
                                    <EventForm formType="edit" event={this.props.event} submit={this.updateEvent} />
                                    <button className="btn btn-danger ml-3" onClick={this.deleteEvent}>delete</button>
                                </div>
                            </div>
                            <div className="col-md-6">
                                {map}
                                {address}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Event
