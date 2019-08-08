import React, { Component } from 'react'
import UpdateEventForm from './UpdateEventForm'
import UpdateTripDateForm from '../../TripInformation/TripDates/UpdateTripDateForm'
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

        const name = event.tripDate ? (<><span >{event.name}</span><span className='text-muted h5'>{' '} (Trip Date)</span> </>) : event.name

        const address = event.address ? (
            <p className="card-text text-muted">{'Address: ' + event.address}</p>
        ) : null

        const documents = event.documents ? event.documents.map((e, i) => (
            <div className='card shadow p-2 my-2'>
                <a
                    key={i}
                    href={e.link}
                    className="card-link"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {e.name}
                </a> <span className="text-muted">{e.description}</span>
            </div>

        ))
            : null

        return (
            <div className="card mb-3 border-0 shadow px-3 py-1 rounded-lg animated fadeIn">
                <div className="row">
                    <div className="card-body">
                        <h5 className="card-title mb-3">
                            <strong>
                                <i
                                    className={`fa ${iconString} pr-2`}
                                    style={{ color: color }}
                                /> {name}</strong>
                            {updater}
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
                                {documents}
                            </div>
                            <div className="col-md-6">
                                {map}
                                <div className="d-flex justify-content-center align-items-center mt-3">
                                    {address}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Event