import { SET_CURRENT_COHORT } from '../actionTypes'
import { apiCall, setTokenHeader } from '../../../util/api'

export const setCurrentCohort = cohort => {
    return {
        type: SET_CURRENT_COHORT,
        cohort: cohort
    }
}

export const handleSetCurrentCohort = (tripId, cohortId) => {
    return dispatch => {
        return apiCall('GET', `/api/trips/${tripId}/cohorts/${cohortId}`)
            .then(cohort => {
                dispatch(setCurrentCohort(cohort))
            })
            .catch(err => {
                console.error('error setting trip')
            })
    }
}
