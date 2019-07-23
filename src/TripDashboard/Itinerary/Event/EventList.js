import React from 'react'
import Event from './Event'

export default ({ events, removeEvent, updateEvent }) => events.map(event => (
    <Event event={event} removeEvent={removeEvent} updateEvent={updateEvent} key={event._id} />
))

