import React from 'react'
import Trip from './Trip';


const TripList = ({trips, setSelectedTrip}) => {
    let list = trips.map(t => <Trip key={t._id} id={t._id} image={t.image} name={t.name} date={t.dateStart} clicked={setSelectedTrip}/>)
    return (
        <ul className="list-group" style={{display: 'flex', flexDirection: 'column'}}>
            {list}
        </ul>
    )
}

export default TripList