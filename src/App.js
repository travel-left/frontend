import React from 'react'
import { Provider } from 'react-redux'
import { configureStore } from './util/redux'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from './Navbar/Navbar'
import Main from './Main'
import { setAuthorizationToken } from './util/redux/actions/auth'
import Footer from './util/otherComponents/Footer'
import HttpsRedirect from 'react-https-redirect'

const store = configureStore()

if (localStorage.token) {
    setAuthorizationToken(localStorage.token)
}

const App = () => (
    <HttpsRedirect>
        <Provider store={store}>
            <Router>
                <div>
                    <Navbar />
                    <div className="container-fluid content" id='app-root' style={{ minHeight: '90vh' }}>
                        <Main />
                    </div>
                    <Footer />
                </div>
            </Router>
        </Provider>
    </HttpsRedirect>

)

export default App
