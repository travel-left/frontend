import React from 'react'
import { Provider } from 'react-redux'
import { configureStore } from './util/redux'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './util/otherComponents/Navbar'
import Main from './Main'
import { setAuthorizationToken } from './util/redux/actions/auth'
import Footer from './util/otherComponents/Footer'
import HttpsRedirect from 'react-https-redirect'
import ErrorBoundary from './util/otherComponents/ErrorBoundary'
import Share from './TripDashboard/Share/index'
import ReactGA from 'react-ga'

function initializeReactGA() {
    ReactGA.initialize('UA-145382520-1')
    ReactGA.pageview('/homepage')
}

if (process.env.NODE_ENV === 'production') {
    initializeReactGA()
}

const store = configureStore()

if (localStorage.token) {
    setAuthorizationToken(localStorage.token)
}

const App = () => (
    <HttpsRedirect>
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route
                        path="/trips/:tripId/share"
                        render={routeProps => <Share {...routeProps} />}
                    />
                    <Route
                        path=""
                        render={routeProps => (
                            <div>
                                <Navbar />
                                <div
                                    className="container-fluid content"
                                    id="app-root"
                                    style={{ minHeight: '90vh' }}
                                >
                                    <ErrorBoundary>
                                        <Main />
                                    </ErrorBoundary>
                                </div>
                                <Footer />
                            </div>
                        )}
                    />
                </Switch>
            </Router>
        </Provider>
    </HttpsRedirect>
)

export default App
