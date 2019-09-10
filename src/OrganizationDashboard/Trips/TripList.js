import React from 'react'
import Trip from './Trip'

const TripList = ({ trips, setSelectedTrip, doubleClick }) => {
    let list = trips.map(t => (
        <Trip
            key={t._id}
            id={t._id}
            image={t.image}
            name={t.name}
            dateStart={t.dateStart}
            dateEnd={t.dateEnd}
            status={t.status}
            click={setSelectedTrip}
            onDoubleClick={doubleClick}
        />
    ))
    return (
        <ul
            className="list-group"
            style={{ display: 'flex', flexDirection: 'column' }}
        >
            {list}
        </ul>
    )
}

export default TripList
