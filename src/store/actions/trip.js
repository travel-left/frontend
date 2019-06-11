import { SET_CURRENT_TRIP, ADD_TRIP } from '../actionTypes'
import { apiCall } from '../../util/api';


export const setCurrentTrip = trip => {
    return apiCall('GET', `api/trips/${trip._id}/cohorts`).then(cohorts => {
        trip.cohorts = cohorts
        return {
            type: SET_CURRENT_TRIP,
            trip: trip
        }
    })
}

export const addTrip = trip => {
    return {
        type: ADD_TRIP,
        trip: trip
    }
}