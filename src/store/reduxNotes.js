//redux provides a store and a clearly defined process of how the state may change

//STATE - any data that detirmines what the user will see on the page
const initialState = {
    counter: 0
}
//COMPONENT
//dispatches
//ACTION - an information package
store.dispatch({ type: 'ACTION_TYPE', payload: {} })
//reaches

//MIDDLEWARE

//REDUCERS - pure functions that receive action and old state, return new state
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ACTION_TYPE':
            //make sure we copy the state - immutable
            return {
                ...state,
                payload: action.payload
            }

        default:
            return state
    }
}
//update
//STORE - holds the entire application state
const store = createStore(rootReducer)
store.getState()
//triggers
//SUBSCRIPTIONS - keeps track of when state changes
store.subscribe(() => {})
//notify (pass updated state as props)
//COMPONENT

//a component becomes a container when
export default connect(mapStateToProps)(Component)
//the map state to props function maps the global state to an object specified to become props of the component
