
import { combineReducers } from "redux"
import currentUser from './currentUser'
import errors from './errors'
import currentTrip from "./currentTrip";

//reducers specify how the application's state reduces in response to actions sent to the store.
//Actions describe 'what happened', but don't describe how the application's state changes.

//the combineReducers helper function turns an object whose values are different reducting functions into a single
//reducing function that gets passed to createStore
//the resulting reducer calls all the child reducers and gathers their results into a single state object
//the state produced namespaces the states of each reducer under their keys as passed to combineReducers
const rootReducer = combineReducers({
    currentUser,
    currentTrip,
    errors
})

export default rootReducer