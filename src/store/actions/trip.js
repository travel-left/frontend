import { SET_CURRENT_TRIP, ADD_TRIP } from "../actionTypes";


export const setCurrentTrip = trip => {
    return {
        type: SET_CURRENT_TRIP,
        currentTrip: trip
    }
}

export const addTrip = trip => {
    return {
        type: ADD_TRIP,
        trip: trip
    }
}