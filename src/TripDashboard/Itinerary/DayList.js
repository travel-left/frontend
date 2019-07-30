import React from 'react'
import Day from './Day'
import { Trail } from 'react-spring/renderprops'

export default ({ days, handleClick, selectedDay }) => {
    days.sort(date_sort_asc)
    return (
        <div className="shadow">
            <ul className="list-group list-group-flush bg-light">
                <Trail
                    items={days}
                    from={{ opacity: 0 }}
                    to={{ opacity: 1 }}
                >
                    {item => props => (<Day style={props} handleClick={handleClick} selectedDay={selectedDay === item} key={item} day={item} />)}
                </Trail>
            </ul>
        </div>
    )
}

var date_sort_asc = function (date1, date2) {
    if (date1 > date2) return 1;
    if (date1 < date2) return -1;
    return 0;
}