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
import { palette, spacing, typography } from '@material-ui/system'
import CollectPayment from './TravelerPages/CollectPayment';

const store = configureStore()

if (localStorage.token) {
    setAuthorizationToken(localStorage.token)
}

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#0A58CE',
        },
        secondary: {
            main: '#83C9F4',
        },
        error: {
            main: '#E24C4C'
        }
    },
    typography: {
        h1: {
            fontFamily: 'roboto',
            fontWeight: 400,
            fontSize: 22,
            color: 'black',
            letterSpacing: 0
        },
        h2: {
            fontFamily: 'roboto',
            fontWeight: 600,
            fontSize: 22,
            color: '#333333',
        },
        h4: {
            fontSize: 40,
            fontWeight: 700,
            color: '#475561'
        },
        h5: {
            fontSize: 30,
            fontWeight: 700,
            color: '#475561'
        },
        h6: {
            fontFamily: 'roboto',
            fontWeight: 600,
            fontSize: 14,
            color: '#666666',
            letterSpacing: 0
        },
        subtitle1: {
            fontFamily: 'Roboto',
            fontSize: 16,
            color: '#768B9F',
            letterSpacing: 0
        },
        subtitle2: {
            fontFamily: 'Roboto',
            fontSize: 16,
            color: '#42505C',
            letterSpacing: 0,
            fontWeight: 400
        },
        caption: {
            fontFamily: 'Roboto',
            fontSize: 12,
            color: '#79828B',
            letterSpacing: 0,
            fontWeight: 400
        }
    },
    overrides: {
        // Style sheet name ⚛️
        MuiTextField: {
            root: {
                marginTop: 25
            }
        },
        MuiButton: {
            containedSecondary: {
                color: 'white',
            },
        },
        MuiContainer: {
            maxWidthXl: {
                maxWidth: 1474
            }
        }
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
                                        className="container-fluid content"
                                        id="app-root"
                                        style={{ minHeight: '90vh' }}
                                    >
                                        <ErrorBoundary>
                                            <Main />
                                        </ErrorBoundary>
                                    </div>
                                    {/* <Footer /> */}
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
