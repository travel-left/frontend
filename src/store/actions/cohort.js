import { SET_CURRENT_COHORT } from '../actionTypes';

export const setCurrentCohort = cohort => {
    return {
        type: SET_CURRENT_COHORT,
        cohort: cohort
    }
}