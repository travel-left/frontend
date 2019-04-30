import { SET_CURRENT_TRIP } from '../actionTypes'

const DEFAULT_STATE = {
    _id: ''
}

export default (state = DEFAULT_STATE, action) => {
    
    switch (action.type) {
        case SET_CURRENT_TRIP:
            return {
                id: action.currentTrip.id,
                name: action.currentTrip.name,
                image: action.currentTrip.image
            }
        default:
            return state;
    }
}