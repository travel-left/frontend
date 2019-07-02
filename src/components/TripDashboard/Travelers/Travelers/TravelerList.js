import React from 'react'
import Traveler from './Traveler'

const TravelerList = ({ travelers, cohorts, addTravelerToCohort, currentCohort, updateTraveler }) => {
    let travelerList = travelers.map(traveler => {
        return <Traveler traveler={traveler} cohorts={cohorts} addTravelerToCohort={addTravelerToCohort} currentCohort={currentCohort} submit={updateTraveler} />
    })
    return <ul className="list-group d-flex flex-column">{travelerList}</ul>
}

export default TravelerList
