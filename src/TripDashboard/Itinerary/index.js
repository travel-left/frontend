import React, { Component } from 'react'
import DayList from './Days/DaysList'
import EventList from './Events/EventList'
import { apiCall } from '../../util/api'
import moment from 'moment-timezone'
import { scroller } from 'react-scroll'
import ReactGA from 'react-ga'
import Snack from '../../util/otherComponents/Snack'
import Grid from '@material-ui/core/Grid'
import CreateQuickEventForm from '../../Forms/CreateQuickEventForm'
import Typography from '@material-ui/core/Typography'
import LeftModal from '../../util/otherComponents/LeftModal';
import EventForm from '../../Forms/EventForm'
import Card from '@material-ui/core/Card'
import ContainedUploader from '../../Forms/ContainedUploader'
import { airports } from '../../util/airlines'
import { withStyles } from '@material-ui/core'
import LeftButton from '../../util/otherComponents/LeftButton'
import SavedEvents from './SavedEvents';
import { formatEventForBackend, formatDateToLocalTimezone, formatDateTime } from './eventHelpers'

function initializeReactGA() {
    ReactGA.initialize('UA-145382520-1')
    ReactGA.pageview('/events')
}

const styles = theme => ({
    container: {
        display: 'flex',
        width: '100%'
    },
    eventsSection: {
        paddingRight: theme.spacing(2)
    },
    eventList: {
        display: "flex",
        flexDirection: "column",
        paddingLeft: theme.spacing(2)
    },
    newEventContainer: {
        display: 'flex',
        alignItems: "center",
        justifyContent: "center",
        height: theme.spacing(16),
    },
    quickEventForm: {
        padding: theme.spacing(2),
        margin: theme.spacing(1, 0),
    },
    uploadContainer: {
        height: theme.spacing(16),
        margin: theme.spacing(2, 0)
    },
    sidebar: {
        display: props => props.share && 'none'
    }
})

class Events extends Component {
    localTimezone = moment.tz.guess(true)

    state = {
        documents: null,
        days: [],
        selectedDay: {},
        events: [],
        savedEvents: [],
        isOpen: false,
        snack: {
            show: false,
            variant: '',
            message: ''
        }
    }

    constructor(props) {
        super(props)
        if (process.env.NODE_ENV === 'production') {
            initializeReactGA()
        }
        this.getDaysAndEvents()
        this.getDaysAndEventsFlights()
        this.getDocuments()
        !props.share && this.getSavedEvents()
    }

    closeSnack = () => (this.setState({ snack: { show: false } }))

    getDaysAndEvents = async () => {
        let days = []
        let events = await apiCall('get', `/api/trips/${this.props.currentTrip._id}/events`)

        let newevents = events.map(event => {
            if (!days.map(day => day.day).includes(moment(event.start).tz(this.localTimezone).format('YYYY-MM-DD'))) {
                days.push({
                    day: moment(event.start).tz(this.localTimezone).format('YYYY-MM-DD'),
                    name: event.name ? event.name : 'Flight'
                })
            }
            return event
        })

        events = newevents.map(event => ({
            ...event,
            start: formatDateToLocalTimezone(event.start),
            end: formatDateToLocalTimezone(event.end)
        }))

        this.setState({ events, days, selectedDay: days[0] ? days[0].day : {} })
    }

    getDaysAndEventsFlights = async () => {
        let events = await apiCall('get', `/api/trips/${this.props.currentTrip._id}/events`)

        let newevents = await Promise.all(events.map(async event => {
            if (event.type === 'FLIGHT') {

                try {
                    let flightStats = await apiCall('post', '/api/flightstats', {
                        date: event.start,
                        airline: event.airline,
                        flightNumber: event.flightNumber
                    })

                    let geo = airports.filter(airport => airport.airport === flightStats.departureIata)[0]

                    event = {
                        ...event,
                        start: moment(event.start.split('T')[0] + ' ' + flightStats.departureTime),
                        end: moment(event.end.split('T')[0] + ' ' + flightStats.arrivalTime),
                        coordinates: {
                            long: geo.longitude,
                            lat: geo.latitude
                        },
                        address: flightStats.departureIata,
                        airline: flightStats.airlineIata,
                        flightNumber: flightStats.flightNumber,
                        arrivalTerminal: flightStats.arrivalTerminal,
                        departureTerminal: flightStats.departureTerminal,
                        departureAirportCode: flightStats.departureIata,
                        arrivalAirportCode: flightStats.arrivalIata,
                        startTime: flightStats.departureTime,
                        endTime: flightStats.arrivalTime
                    }
                } catch (err) {
                }
            }

            return event
        }))

        events = newevents.map(event => ({
            ...event,
            start: formatDateToLocalTimezone(event.start),
            end: formatDateToLocalTimezone(event.end)
        }))

        this.setState({ events })
    }

    getDocuments = async () => {
        let documents = await apiCall('get', `/api/trips/${this.props.currentTrip._id}/documents`)
        this.setState({ documents })
    }

    createEvent = async event => {
        event = formatEventForBackend(event)

        try {
            await apiCall('post', `/api/trips/${this.props.currentTrip._id}/events`, event)
            this.setState({
                snack: {
                    show: true,
                    variant: 'success',
                    message: 'Success!'
                }
            })

        } catch (err) {
            this.setState({
                snack: {
                    show: true,
                    variant: 'error',
                    message: 'An error occurred.'
                }
            })
        }
        this.getDaysAndEvents()
        this.getDaysAndEventsFlights()
    }

    createQuickEvent = async event => {
        let date = moment(event.date).toDate()
        event.start = new Date(date)
        event.end = new Date(date.setHours(event.start.getHours() + 1))
        event.start = formatDateTime(date, event.start)
        event.end = formatDateTime(date, event.end)
        event.timezone = this.localTimezone
        try {
            await apiCall('post', `/api/trips/${this.props.currentTrip._id}/events`, event)
            this.setState({
                snack: {
                    show: true,
                    variant: 'success',
                    message: 'Success!'
                }
            })
            this.getDaysAndEvents()
        } catch (err) {
            this.setState({
                snack: {
                    show: true,
                    variant: 'error',
                    message: 'An error occurred.'
                }
            })
        }
    }

    updateEvent = async (eventId, event) => {
        event = formatEventForBackend(event)

        try {
            await apiCall('PUT', `/api/trips/${this.props.currentTrip._id}/events/${eventId}`, event)
            this.setState({
                snack: {
                    show: true,
                    variant: 'success',
                    message: 'Success!'
                }
            })
        } catch (err) {
            this.setState({
                snack: {
                    show: true,
                    variant: 'error',
                    message: 'An error occurred.'
                }
            })
        }
        this.getDaysAndEvents()
        if (event.type === 'FLIGHT') {
            this.getDaysAndEventsFlights()
        }
    }

    toggleSaveEvent = async (eventId, isSaved) => {
        try {
            await apiCall('PUT', `/api/trips/${this.props.currentTrip._id}/events/${eventId}/isSaved`, { isSaved })

            const { events, savedEvents } = this.state
            let days = [...this.state.days]

            const updatedEvents = events.map(e => {
                if (e._id == eventId) {
                    e.isSaved = isSaved
                }

                if (!days.map(day => day.day).includes(moment(e.start).tz(this.localTimezone).format('YYYY-MM-DD'))) {
                    days.push({
                        day: moment(e.start).tz(this.localTimezone).format('YYYY-MM-DD'),
                        name: e.name ? e.name : 'Flight'
                    })
                }

                return e
            })

            let updatedSavedEvents
            if (isSaved) {
                updatedSavedEvents = [...savedEvents, { ...events.filter(e => e._id == eventId)[0], isSaved: true }]
            } else {
                updatedSavedEvents = savedEvents.filter(event => event._id != eventId)
            }

            this.setState({
                days,
                events: updatedEvents,
                savedEvents: updatedSavedEvents,
                snack: {
                    show: true,
                    variant: 'success',
                    message: 'Success!'
                }
            })
        } catch (err) {
            this.setState({
                snack: {
                    show: true,
                    variant: 'error',
                    message: 'An error occurred.'
                }
            })
        }
    }

    removeEvent = async eventId => {
        try {
            await apiCall('delete', `/api/trips/${this.props.currentTrip._id}/events/${eventId}`, true)
            this.setState({
                snack: {
                    show: true,
                    variant: 'success',
                    message: 'Success!'
                }
            })
        } catch (err) {
            this.setState({
                snack: {
                    show: true,
                    variant: 'error',
                    message: 'An error occurred.'
                }
            })
        }
        this.getDaysAndEvents()
        this.getDaysAndEventsFlights()
    }

    onDayClick = day => {
        scroller.scrollTo(moment(day).format('MMM DD YYYY'), {
            duration: 1500,
            delay: 100,
            smooth: true,
            offset: -15 // Scrolls to element + 50 pixels down the page
        })

        this.setState({
            selectedDay: day
        })
    }

    toggleModal = () => {
        this.setState(prevState => ({ isOpen: !prevState.isOpen }))
    }

    getSavedEvents = async () => {
        const { currentUser } = this.props
        let savedEvents = await apiCall('get', `/api/coordinators/${currentUser._id}/savedEvents`)

        savedEvents = savedEvents.map(event => ({
            ...event,
            start: formatDateToLocalTimezone(event.start),
            end: formatDateToLocalTimezone(event.end)
        }))

        this.setState({ savedEvents })
    }

    addToItinerary = async eventToAddId => {
        try {
            await apiCall('post', `/api/trips/${this.props.currentTrip._id}/events/${eventToAddId}/addFromSaved`)
            this.setState({
                snack: {
                    show: true,
                    variant: 'success',
                    message: 'Success!'
                }
            })

        } catch (err) {
            this.setState({
                snack: {
                    show: true,
                    variant: 'error',
                    message: 'An error occurred.'
                }
            })
        }
        this.getDaysAndEvents()
        this.getDaysAndEventsFlights()
    }

    render() {
        const { classes, share } = this.props
        const { days, events, selectedDay, documents, savedEvents } = this.state
        const dayList = days.length ? (
            <DayList
                selectedDay={selectedDay}
                days={days}
                handleClick={this.onDayClick}
            />
        ) : null
        const eventList = events.length ? (

            <EventList
                events={events}
                updateEvent={this.updateEvent}
                toggleSaveEvent={this.toggleSaveEvent}
                removeEvent={this.removeEvent}
                trip={this.props.currentTrip}
                documents={this.state.documents}
                share={this.props.share}
                savedEvents={savedEvents.map(e => e._id)}
            />
        ) : <h4 />

        return (
            <>
                <Grid container className={classes.container}>
                    <Grid item xs={12} md={!share ? 8 : 12} className={classes.eventsSection}>
                        <Typography variant="h2">Itinerary</Typography>
                        <div className={classes.eventList}>
                            {eventList}
                        </div>
                    </Grid>
                    <Grid item xs={12} md={4} className={classes.sidebar}>
                        <div className={classes.newEventContainer}>
                            {documents &&
                                <LeftButton
                                    onClick={this.toggleModal}
                                    id="new-activity"
                                >
                                    NEW activity
                            </LeftButton>
                            }
                        </div>
                        <div>
                            {dayList}
                            <Card className={classes.quickEventForm}>
                                <CreateQuickEventForm
                                    submit={this.createQuickEvent}
                                    date={this.props.currentTrip.dateStart}
                                ></CreateQuickEventForm>
                            </Card>
                            <div className={classes.uploadContainer}>
                                <ContainedUploader tripId={this.props.currentTrip._id} onUploadFinish={this.getDocuments}></ContainedUploader>
                            </div>
                            {!share &&
                                <SavedEvents
                                    savedEvents={this.state.savedEvents}
                                    addToItinerary={this.addToItinerary}
                                >
                                </SavedEvents>
                            }
                        </div>
                    </Grid>
                </Grid>

                {/* MODALS */}

                <>
                    {this.state.isOpen &&
                        <LeftModal
                            submit={this.createEvent}
                            date={this.props.currentTrip.dateStart}
                            documents={this.state.documents}
                            trip={this.props.currentTrip}
                            closeModal={this.toggleModal}
                            title='Create a new activity'
                            form={EventForm}
                        />
                    }
                    {this.state.snack.show && <Snack
                        open={this.state.snack.show}
                        message={this.state.snack.message}
                        variant={this.state.snack.variant}
                        onClose={this.closeSnack}>
                    </Snack>
                    }
                </>
            </>
        )
    }
}

export default withStyles(styles)(Events)