import React from 'react'
import Event from './Event'
import moment from 'moment'

export default ({ events, removeEvent, updateEvent, trip }) => {
    let daysList = []

    return events.map(event => {
        let dayHeader = daysList.includes(event.start) ? null
            : <h3 className="mt-4 mb-3 Document-title" name={moment(event.start).format('MMM DD YYYY')}>{moment(event.start).format('MMM DD')}</h3>

        daysList.push(event.start)

        return (
            <div key={event._id}>
                {dayHeader}
                <Event event={event} removeEvent={removeEvent} updateEvent={updateEvent} trip={trip} />
            </div>
        )
    })
}
