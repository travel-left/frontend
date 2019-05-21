import React from 'react'
import Trip from './Trip';


const TripList = ({}) => {
    return (
        <ul className="list-group" style={{display: 'flex', flexDirection: 'column'}}>
            <Trip />
            <Trip />
            <Trip />
            <Trip />
        </ul>
    )
}

export default TripList