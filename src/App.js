import React from 'react'
import { Provider } from 'react-redux'
import { configureStore } from './store'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from './containers/Navbar'
import Main from './containers/Main'
import SideNav from "./containers/SideNav";
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
                <div className="container-fluid" style={{backgroundColor: '#ECEDED', height: '100vw'}}>
                    {/* {localStorage.token ? 
                        <div className="row">
                            <div className="col-2">
                                <SideNav />
                            </div>
                            <div className="col-10" style={{backgroundColor: '#ECEDED', height: '100vw'}}>
                                <Main />
                            </div>
                        </div>
                    : */}
                    <Main />
                    {/* } */}
                </div>
            </div>
        </Router>
    </Provider>
)

export default App
