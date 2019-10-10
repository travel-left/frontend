import React, { Component } from 'react'
import DayList from './Days/DaysList'
import EventList from './Events/EventList'
import { apiCall } from '../../util/api'
import NewEventForm from './Events/NewEventForm'
import moment from 'moment-timezone'
import { scroller } from 'react-scroll'
import './Events.css'
import ReactGA from 'react-ga'

function initializeReactGA() {
    ReactGA.initialize('UA-145382520-1')
    ReactGA.pageview('/events')
}


class events extends Component {
    localTimezone = moment.tz.guess(true)

    state = {
        days: [],
        selectedDay: '',
        events: [],
        isOpen: false
    }

    constructor(props) {
        super(props)
        if (process.env.NODE_ENV === 'production') {
            initializeReactGA()
        }
        this.getDaysAndEvents()
    }

    getDaysAndEvents = async () => {
        let days = []
        let events = await apiCall('get', `/api/trips/${this.props.currentTrip._id}/events`)

        for (const event of events) {
            if (!days.includes(moment(event.start).tz(this.localTimezone).format('YYYY-MM-DD'))) days.push(moment(event.start).tz(this.localTimezone).format('YYYY-MM-DD'))
        }

        events = events.map(event => ({
            ...event,
            start: moment(event.start).tz(this.localTimezone),
            end: moment(event.end).tz(this.localTimezone)
        }))

        this.setState({ events, days, selectedDay: days[0] })
    }

    createEvent = async event => {
        event = formatEventForBackend(event)
        await apiCall('post', `/api/trips/${this.props.currentTrip._id}/events`, event, true)
        this.getDaysAndEvents()
    }

    updateEvent = async (eventId, event) => {
        event = formatEventForBackend(event)
        await apiCall('PUT', `/api/trips/${this.props.currentTrip._id}/events/${eventId}`, event, true)
        this.getDaysAndEvents()
    }

    removeEvent = async eventId => {
        await apiCall('delete', `/api/trips/${this.props.currentTrip._id}/events/${eventId}`, true)
        this.getDaysAndEvents()
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
            />
        ) : <h4 className="text-info" />

        return (
            <div className="col-md-12 mt-4 mx-0 px-0">
                <div className="row mx-0">
                    <div className="col-md-2 pl-0">
                        <button className="btn btn-primary btn-lg" onClick={this.toggleModal}>NEW EVENT</button>
                        {this.state.isOpen &&
                            <NewEventForm
                                submit={this.createEvent}
                                initDay={this.props.currentTrip.dateStart}
                                trip={this.props.currentTrip}
                                toggleModal={this.toggleModal}
                                isOpen={this.state.isOpen}
                            />
                        }
                        <div className="Events-trip-days-card mt-4">
                            {dayList}
                        </div>
                    </div>
                    <div className="col-md-10 pr-0">
                        {eventList}
                    </div>
                </div>
            </div>
        )
    }
}

export default events

function formatEventForBackend(event) {
    let formattedEvent = { ...event }
    let start = new Date(formattedEvent.date.valueOf())
    let end = new Date(formattedEvent.date.valueOf())
    start.setHours(formattedEvent.start.split(':')[0])
    end.setHours(formattedEvent.end.split(':')[0])
    formattedEvent.start = start
    formattedEvent.end = end
    delete formattedEvent.date

    return formattedEvent
}