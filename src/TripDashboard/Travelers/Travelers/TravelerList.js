import React from 'react'
import Traveler from './Traveler'

const TravelerList = ({ travelers, cohorts, addTravelerToCohort, currentCohort, updateTraveler, toggle }) => {
    let travelerList = travelers.map(traveler => {
        return <Traveler key={traveler._id} traveler={traveler} cohorts={cohorts} addTravelerToCohort={addTravelerToCohort} currentCohort={currentCohort} submit={updateTraveler} toggle={toggle} />
    })
    return <ul className="list-group d-flex flex-column">{travelerList}</ul>
}

export default TravelerList
