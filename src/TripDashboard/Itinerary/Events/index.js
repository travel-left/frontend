import React from 'react'
import Event from './Event'
import moment from 'moment'

export default ({
    events,
    removeEvent,
    updateEvent,
    updateTripDate,
    removeTripDate
}) => {
    let daysList = []
    events.sort(date_sort_asc)
    return events.map(event => {
        let dayHeader = daysList.includes(event.dateStart) ? null : (
            <h3
                className="mt-4 mb-3"
                name={moment(event.dateStart).format('MMM DD YYYY')}
            >
                {moment(event.dateStart).format('MMM DD')}
            </h3>
        )
        daysList.push(event.dateStart)
        const update = event.tripDate ? updateTripDate : updateEvent
        const remove = event.tripDate ? removeTripDate : removeEvent
        return (
            <div key={event._id}>
                {dayHeader}
                <Event
                    event={event}
                    removeEvent={remove}
                    updateEvent={update}
                />
            </div>
        )
    })
}

var date_sort_asc = function (date1, date2) {
    if (date1.dateStart > date2.dateStart) return 1
    if (date1.dateStart < date2.dateStart) return -1
    return 0
}
