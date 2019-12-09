import React, { Component } from 'react'
import DayList from './Days/DaysList'
import EventList from './Events/EventList'
import { apiCall, flightApi } from '../../util/api'
import moment from 'moment-timezone'
import { scroller } from 'react-scroll'
import './Events.css'
import ReactGA from 'react-ga'
import Snack from '../../util/otherComponents/Snack'
import Grid from '@material-ui/core/Grid'
import CreateQuickEventForm from '../../Forms/CreateQuickEventForm'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import LeftModal from '../../util/otherComponents/LeftModal';
import EventForm from '../../Forms/EventForm'
import Card from '@material-ui/core/Card'
import ContainedUploader from '../../Forms/ContainedUploader'

function initializeReactGA() {
    ReactGA.initialize('UA-145382520-1')
    ReactGA.pageview('/events')
}


class events extends Component {
    localTimezone = moment.tz.guess(true)

    state = {
        documents: [],
        days: [],
        selectedDay: {},
        events: [],
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
        this.getDocuments()
    }

    closeSnack = () => (this.setState({ snack: { show: false } }))

    getDaysAndEvents = async () => {
        let days = []
        let events = await apiCall('get', `/api/trips/${this.props.currentTrip._id}/events`)

        let flightEvents = []
        let newevents = await Promise.all(events.map(async event => {
            if (!days.map(day => day.day).includes(moment(event.start).tz(this.localTimezone).format('YYYY-MM-DD'))) {
                days.push({
                    day: moment(event.start).tz(this.localTimezone).format('YYYY-MM-DD'),
                    name: event.name
                })
            }
            if (event.type === 'FLIGHT') {
                try {
                    let flightStats = await apiCall('post', '/api/flightstats', {
                        date: event.start,
                        airline: event.airline,
                        flightNumber: event.flightNumber
                    })
                    event = {
                        ...event,
                        flightNumber: flightStats.flightNumber,
                        departureTerminal: flightStats.departureTerminal,
                        departureGate: flightStats.departureGate,
                        departureAirportCode: flightStats.departureAirportCode,
                        arrivalAirportCode: flightStats.arrivalAirportCode,
                        start: flightStats.startDate,
                        end: flightStats.endDate
                    }
                    console.log(event)
                    flightEvents.push(event)
                } catch (err) {
                    console.log(err)
                }
            }

            return event
        }))

        events = newevents.map(event => ({
            ...event,
            start: formatDateToLocalTimezone(event.start),
            end: formatDateToLocalTimezone(event.end)
        }))

        this.setState({ events, days, selectedDay: days[0].day })
    }

    getDocuments = async () => {
        let documents = await apiCall('get', `/api/trips/${this.props.currentTrip._id}/documents`)
        this.setState({ documents })
    }

    createEvent = async event => {
        console.log(event)
        event = formatEventForBackend(event)
        console.log(event)
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
    }

    createQuickEvent = async event => {
        event.start = new Date(event.date)
        event.end = new Date(event.date.setHours(event.start.getHours() + 1))
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
            await apiCall('PUT', `/api/trips/${this.props.currentTrip._id}/events/${eventId}`, event, true)
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

    render() {
        const { days, events, selectedDay } = this.state
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
                removeEvent={this.removeEvent}
                trip={this.props.currentTrip}
                documents={this.state.documents}
            />
        ) : <h4 className="text-info" />

        return (
            <div className="d-flex row" style={{ paddingLeft: 24, paddingRight: 16, marginTop: 16 }}>
                <div className="col-12 col-lg-8">
                    <Grid item xs={12} style={{ marginRight: 16 }}>
                        <div className="row justify-content-between">
                            <Typography variant="h2">Trip Itinerary</Typography>
                        </div>
                        <div className="row d-flex flex-column">
                            {eventList}
                        </div>
                    </Grid>
                </div>
                <div className="col-12 col-lg-4 px-0">
                    <div style={{ padding: 16 }}>
                        <div className="row flex-column align-items-center" style={{ marginBottom: 16 }}>
                            <Button size="large" onClick={this.toggleModal} variant="contained" color="primary" style={{ width: '180px', height: '50px', float: 'right', marginTop: 25, marginBottom: 25, marginLeft: 16, marginRight: 16 }} >
                                NEW EVENT
                            </Button>
                            {this.state.isOpen &&
                                <LeftModal
                                    submit={this.createEvent}
                                    date={this.props.currentTrip.dateStart}
                                    documents={this.state.documents}
                                    trip={this.props.currentTrip}
                                    toggleModal={this.toggleModal}
                                    isOpen={this.state.isOpen}
                                    title='Create a new event'
                                    form={EventForm}
                                />
                            }
                        </div>
                        <div className="row flex-column">
                            {dayList}
                            <Card style={{ padding: 16, marginTop: 16 }}>
                                <CreateQuickEventForm
                                    submit={this.createQuickEvent}
                                    date={this.props.currentTrip.dateStart}
                                ></CreateQuickEventForm>
                            </Card>
                            <div style={{ marginTop: 16 }}>
                                <ContainedUploader tripId={this.props.currentTrip._id} onUploadFinish={this.getDocuments}></ContainedUploader>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.snack.show && <Snack open={this.state.snack.show} message={this.state.snack.message} variant={this.state.snack.variant} onClose={this.closeSnack}></Snack>}
            </div>
        )
    }
}

export default events

function formatEventForBackend(event) {
    //get date from event.date
    let date = moment(event.date).toDate()
    //get start and end time
    let startTimeHours = new Date(event.start.valueOf()).getHours()
    let endTimeHours = new Date(event.end.valueOf()).getHours()
    let startTimeMinutes = new Date(event.start.valueOf()).getMinutes()
    let endTimeMinutes = new Date(event.end.valueOf()).getMinutes()
    //set the hours of start and end
    event.start = new Date(date.setHours(startTimeHours))
    event.start = new Date(date.setMinutes(startTimeMinutes))
    event.end = new Date(date.setHours(endTimeHours))
    event.end = new Date(event.end.setMinutes(endTimeMinutes))

    event.type = event.type.toUpperCase()
    event.documents = event.selectedDocuments
    console.log(event.links)
    event.links = event.links.length ? event.links.split(' ').map(link => link) : []
    event.airline = event.airline.value

    delete event.selectedDocuments
    delete event.date
    return event
}

//takes the UTC date and converts it to the user's timezone
function formatDateToLocalTimezone(date) {
    let localTimezone = moment.tz.guess(true)
    date = moment(date).tz(localTimezone)
    return date
}