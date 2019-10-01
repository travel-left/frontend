import React from 'react'
import Day from './Day'

export default ({ days, handleClick, selectedDay }) => {
    days.sort(date_sort_asc)
    return (
        <ul className="list-group list-group-flush Events-trip-days-card">
            {days.map(day => (
                <Day
                    handleClick={handleClick}
                    selectedDay={selectedDay === day}
                    key={day}
                    day={day}
                />
            ))}
        </ul>
    )
}

var date_sort_asc = function (date1, date2) {
    if (date1 > date2) return 1
    if (date1 < date2) return -1
    return 0
}
