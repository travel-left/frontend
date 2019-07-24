import React from 'react'
import Day from './Day'

export default ({ days }) => {
    days.sort(date_sort_asc)
    return days.map(day => (<Day key={day} day={day} />))
}

var date_sort_asc = function (date1, date2) {
    if (date1 > date2) return 1;
    if (date1 < date2) return -1;
    return 0;
}