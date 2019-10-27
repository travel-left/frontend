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
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import CollectPayment from './TravelerPages/CollectPayment';

const store = configureStore()

if (localStorage.token) {
    setAuthorizationToken(localStorage.token)
}

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#235CE0',
        },
        secondary: {
            main: '#92CFF8',
        },
    },
})

const App = () => (
    <HttpsRedirect>
        <Provider store={store}>
            <Router>
                <ThemeProvider theme={theme}>
                    <Switch>
                        <Route
                            path="/trips/:tripId/share"
                            render={routeProps => <Share {...routeProps} />}
                        />
                        <Route
                            path="/coordinator/:coordinatorId/form/:formId"
                            render={routeProps => <CollectPayment {...routeProps} />}
                        />
                        <Route
                            path=""
                            render={routeProps => (
                                <div>
                                    <Navbar />
                                    <div
                                        className="container-fluid content mb-5"
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
                </ThemeProvider>
            </Router>
        </Provider>
    </HttpsRedirect>
)

export default App
