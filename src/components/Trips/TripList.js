import React from 'react'
import Trip from './Trip';


const TripList = ({trips}) => {
    let list = trips.map(t => <Trip image={t.image} name={t.name}/>)
    return (
        <ul className="list-group" style={{display: 'flex', flexDirection: 'column'}}>
            {list}
        </ul>
    )
}

export default TripList