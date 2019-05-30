import { SET_CURRENT_USER, ADD_TRIP } from '../actionTypes'

const DEFAULT_STATE = {
    isAuthenticated: false,
    user: {}
}

export default (state = DEFAULT_STATE, action) => {
    console.log(state)
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                isAuthenticated: !!Object.keys(action.user).length,
                user: action.user
            }
        case ADD_TRIP:
            let usersTrips = state.user.trips
            usersTrips.push(action.trip)
            return {
                ...state,
                user: {
                    ...state.user,
                    trips: usersTrips
                }
            }
        default:
            return state
    }
}
