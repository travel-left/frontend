import React from 'react'
import TripDate from './TripDate'

const TripDatesList = ({ tripDates, updateTripDate, deleteTripDate }) => {
    let list = tripDates.map(d => {
        return <TripDate name={d.name} key={d._id} date={d.date} type={d.type} _id={d._id} deleteTripDate={deleteTripDate} editTripDate={body => updateTripDate(d._id, body)} />
    })

    return (
        <div className="card shadow border-0 mb-3 col-md-4 mx-4">
            {list}
        </div>
    )
}

export default TripDatesList
