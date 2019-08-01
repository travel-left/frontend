import { SET_CURRENT_TRIP } from '../actionTypes'

export const setCurrentTrip = trip => {
    return {
        type: SET_CURRENT_TRIP,
        trip: trip
    }
}
