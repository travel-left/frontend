import React from 'react'
import { Provider } from 'react-redux'
import { configureStore } from './store'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from './containers/Navbar/Navbar'
import Main from './containers/Main'
import { setAuthorizationToken } from './store/actions/auth'
import Footer from './components/Other/Footer'

const store = configureStore()

if (localStorage.token) {
    setAuthorizationToken(localStorage.token)
}

const App = () => (
    <Provider store={store}>
        <Router>
            <div>
                <Navbar />
                <div className="container-fluid content" id='app-root' style={{ minHeight: '90vh' }}>
                    <Main />
                </div>
                <div id="modal-root"></div>
                <Footer />
            </div>
        </Router>
    </Provider>
)

export default App
