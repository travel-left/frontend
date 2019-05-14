import React from "react"
import Event from './Event';

const EventList = ({events, removeEvent}) => {

    let eventList = events.map(event => {
        return <Event event={event} removeEvent={removeEvent}/>
    })
    return (
        <div className="event-list">
            <div class="row">
                { eventList }
            </div>
        </div>
    )
}

export default EventList