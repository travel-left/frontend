import React from 'react'
import { Provider } from 'react-redux'
import { configureStore } from './store'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from './containers/Navbar'
import Main from './containers/Main'
import { setAuthorizationToken, setCurrentUser } from './store/actions/auth'
import jwtDecode from 'jwt-decode'

const store = configureStore()

if(localStorage.token) {
    setAuthorizationToken(localStorage.token)
    try {
        store.dispatch(setCurrentUser(jwtDecode(localStorage.token)))
    }catch(e){
        store.dispatch(setCurrentUser({}))
    }
}

const App = () => (
    <Provider store={store}>
        <Router>
            <div className="">
                <Navbar/>
                <div className="container-fluid" style={{backgroundColor: '#ECEDED'}}>
                    <Main />
                </div>
            </div>
        </Router>
    </Provider>
)

export default App
