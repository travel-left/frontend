import React from 'react'
import TripDate from './TripDate'

const TripDatesList = ({ tripDates, updateTripDate }) => {
    let list = tripDates.map(d => {
        return <TripDate name={d.name} key={d._id} date={d.date} type={d.type} _id={d._id} editTripDate={body => updateTripDate(d._id, body)} />
    })

    return list
}

export default TripDatesList
