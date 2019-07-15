import React from 'react'
import { Provider } from 'react-redux'
import { configureStore } from './redux'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from './Navbar/Navbar'
import Main from './Main'
import { setAuthorizationToken } from './redux/actions/auth'
import Footer from './OtherComponents/Footer'

const store = configureStore()

if (localStorage.token) {
    setAuthorizationToken(localStorage.token)
}

const App = () => (
    <Provider store={store}>
        <Router>
            <div>
                <Navbar />
                <div className="container-fluid content animated" id='app-root' style={{ minHeight: '90vh' }}>
                    <Main />
                </div>
                <Footer />
            </div>
        </Router>
    </Provider>
)

export default App
