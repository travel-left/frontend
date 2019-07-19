import { SET_CURRENT_USER } from '../actionTypes'
import { apiCall, setTokenHeader } from '../../../util/api'
import { setCurrentCohort } from './cohort'
import { setCurrentTrip } from './trip'

export const setCurrentUser = user => {
    return {
        type: SET_CURRENT_USER,
        user
    }
}

export const setAuthorizationToken = token => {
    setTokenHeader(token)
}

export const authUser = (type, userData) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall('post', `/api/auth/coordinators/${type}`, userData)
                .then(({ token, ...user }) => {
                    localStorage.setItem('token', token)
                    setAuthorizationToken(token)
                    dispatch(setCurrentUser(user))
                    resolve()
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}

export const logout = () => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            localStorage.clear()
            dispatch(setCurrentTrip({}))
            dispatch(setCurrentCohort({}))
            setAuthorizationToken()
            dispatch(setCurrentUser({}))
            resolve()
        })
    }
}
