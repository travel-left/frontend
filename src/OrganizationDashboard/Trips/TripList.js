import React from 'react'
import Trip from './Trip'

const TripList = ({ trips, setSelectedTrip, doubleClick }) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            {trips.map(t => (
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
            ))}
        </div>
    )
}

export default TripList
