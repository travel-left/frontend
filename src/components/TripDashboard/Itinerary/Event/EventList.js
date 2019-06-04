import React from 'react'
import Event from './Event'

const EventList = ({ events, removeEvent }) => {
    let eventList = events.map(event => {
        return <Event event={event} removeEvent={removeEvent} key={event._id} />
    })
    return (
        <div className="event-list">
            <div className="row" style={{ justifyContent: 'center' }}>
                {eventList}
            </div>
        </div>
    )
}

export default EventList
