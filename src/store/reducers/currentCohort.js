import { SET_CURRENT_COHORT } from '../actionTypes'

const DEFAULT_STATE = {
    _id: ''
}

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case SET_CURRENT_COHORT:
            return {
                ...action.cohort
            }
        default:
            return state
    }
}
