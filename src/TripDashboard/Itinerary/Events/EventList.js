import React from 'react'
import Event from './Event'
import moment from 'moment'

export default ({ events, removeEvent, updateEvent, documents, share }) => {
    let daysList = []

    return events.map(event => {
        let dayHeader = daysList.includes(event.start.format('MMM DD YYYY')) ? null
            : <h3 className="mt-4 mb-3 Document-title" name={moment(event.start).format('MMM DD YYYY')}>{moment(event.start).format('MMM DD')}</h3>

        daysList.push(event.start.format('MMM DD YYYY'))

        return (
            <div key={event._id}>
                {dayHeader}
                <Event event={event} removeEvent={removeEvent} updateEvent={updateEvent} documents={documents} share={share} />
            </div>
        )
    })
}
