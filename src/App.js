import React from 'react'
import { Provider } from 'react-redux'
import { configureStore } from './util/redux'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './util/otherComponents/Navbar'
import Main from './Main'
import { setAuthorizationToken } from './util/redux/actions/auth'
import HttpsRedirect from 'react-https-redirect'
import ErrorBoundary from './util/otherComponents/ErrorBoundary'
import { ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import CollectPayment from './TravelerPages/CollectPayment'
import Share from './TravelerPages/Share'
import CollectInfo from './TravelerPages/CollectInfo';

const store = configureStore()

if (localStorage.token) {
    setAuthorizationToken(localStorage.token)
}

const theme = createMuiTheme({
    palette: {
        primary: {
            main: process.env.REACT_APP_THEME_PRIMARY_MAIN,
        },
        secondary: {
            main: process.env.REACT_APP_THEME_SECONDARY_MAIN,
        },
        error: {
            main: '#FF5555'
        },
        grey: {
            A600: '#79828B',
            A700: '#475561'
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
            fontWeight: 500,
            color: '#475561'
        },
        h5: {
            fontSize: 30,
            fontWeight: 500,
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
            fontWeight: 400,
            lineSpacing: 0
        },
        caption: {
            fontFamily: 'Roboto',
            fontSize: 14,
            color: '#79828B',
            letterSpacing: 0,
            fontWeight: 400
        }
    },
    overrides: {
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
                            path="/traveler/:travelerId/info"
                            render={routeProps => <CollectInfo {...routeProps} />}
                        />
                        <Route
                            path=""
                            render={routeProps => (
                                <div>
                                    <Navbar />
                                    <div
                                        id="app-root"
                                        style={{ minHeight: '90vh', backgroundColor: process.env.REACT_APP_THEME_BACKGROUND }}
                                    >
                                        <ErrorBoundary>
                                            <Main />
                                        </ErrorBoundary>
                                    </div>
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
