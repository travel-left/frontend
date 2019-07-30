import React, { Component } from 'react'
import UpdateEventForm from './UpdateEventForm'
import UpdateTripDateForm from '../../Information/TripDates/UpdateTripDateForm'
import Map from './Map'

class Event extends Component {
    remove = () => {
        this.props.removeEvent(this.props.event._id)
    }

    update = updateObject => {
        this.props.updateEvent(this.props.event._id, updateObject)
    }

    render() {
        let { event } = this.props
        let iconString,
            color = ''
        switch (event.type.toLowerCase()) {
            case 'lodging':
                iconString = 'fa-bed'
                color = '#FEA600'
                break
            case 'transportation':
                iconString = 'fa-car'
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

        if (event.tripDate) {
            iconString = 'fa-calendar'
            color = '#FF0000'
        }

        const updater = event.tripDate ? (
            <UpdateTripDateForm
                {...event}
                submit={this.update}
                remove={this.remove}
                onItinerary={true}
            />
        ) : (
                <UpdateEventForm
                    event={event}
                    submit={this.update}
                    remove={this.remove}
                />
            )

        const date =
            event.dtStart && event.dtEnd
                ? `${event.dtStart} - ${event.dtEnd}`
                : null

        const map = event.coordinates ? (
            event.coordinates.lat && event.coordinates.long ? (
                <div className="row">
                    <div className="col-12">
                        <Map coordinates={event.coordinates} />
                    </div>
                </div>
            ) : null
        ) : null

        const name = event.tripDate ? `Trip Date: ${event.name}` : event.name

        const address = event.address ? (
            <p className="card-text">{'Address: ' + event.address}</p>
        ) : null

        return (
            <div
                className="card mb-3 border-0 shadow px-3 py-1 rounded-lg"
            >
                <div className="row">
                    <div className="card-body">
                        <h5 className="card-title">
                            <strong> {name}</strong>
                            <i
                                className={`fa ${iconString} float-right`}
                                style={{ color: color }}
                            />
                        </h5>
                        <div className="row">
                            <div className="col-md-6 d-flex flex-column">
                                <h6
                                    className="card-subtitle mb-2"
                                    style={{ color: color }}
                                >
                                    {date}
                                </h6>
                                {/* <Image diameter="100px" src={event.image} /> */}
                                <p className="card-text">{event.description}</p>
                                <a
                                    href={event.link}
                                    className="card-link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {event.linkDescription}
                                </a>
                                <div className="mt-auto">{updater}</div>
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
