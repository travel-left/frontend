import React from 'react'
import Day from './Day'
import List from '@material-ui/core/List'

export default ({ days, handleClick, selectedDay }) => {
    days.sort(date_sort_asc)
    return (
        <List component="div" >
            {days.map((day, index) => (
                <Day
                    handleClick={handleClick}
                    key={day.day}
                    day={day}
                    active={selectedDay === day.day}
                    divider={index !== 0}
                />
            ))}
        </List>
    )
}

var date_sort_asc = function (date1, date2) {
    if (date1.day > date2.day) return 1
    if (date1.day < date2.day) return -1
    return 0
}
