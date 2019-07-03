import { SET_CURRENT_TRIP, ADD_TRIP } from '../actionTypes'
import { apiCall } from '../../util/api'

export const setCurrentTrip = trip => {
    return {
        type: SET_CURRENT_TRIP,
        trip: trip
    }
}

export const addTrip = trip => {
    return {
        type: ADD_TRIP,
        trip: trip
    }
}

export const handleSetCurrentTrip = trip => {
    return dispatch => {
        return apiCall('GET', `/api/trips/${trip._id}/cohorts`)
            .then(cohorts => {
                console.log(cohorts)
                trip.cohorts = cohorts
                dispatch(setCurrentTrip(trip))
            })
            .catch(err => {
                console.log('error setting trip')
            })
    }
}
