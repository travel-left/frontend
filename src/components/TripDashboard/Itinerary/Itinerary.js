import React, { Component } from 'react'
import DayList from './Day/DayList'
import EventList from './Event/EventList'
import { apiCall } from '../../../util/api'
import AddEvent from './Event/AddEvent'
import moment from 'moment-timezone'

class Itinerary extends Component {
    tripId = this.props.currentTrip._id

    cohortId = this.props.currentTrip.cohorts[0]._id

    tdStart = this.props.currentTrip.dateStart

    tz = moment.tz.guess(true)

    state = {
        days: [],
        events: [],
        currentDay: null
    }

    constructor(props) {
        super(props)
        this.getDEandSetState()
    }

    componentDidUpdate(prevProps) {
        if (this.props.currentCohort !== prevProps.currentCohort) {
            this.getDEandSetState()
        }
    }

    getDaysandEvents = async () => {
        const days = await this.getDays()
        const currentDay = days.length > 0 ? days[0] : null
        const events = currentDay ? await this.getEvents() : null
        return {
            days,
            currentDay,
            events
        }
    }

    getDEandSetState = async () => {
        const state = await this.getDaysandEvents()
        this.setState(state)
    }

    getEvents = currentDay => {
        const cdMoment = moment(currentDay).format('YYYY-MM-DD')
        return apiCall('get', `/api/trips/${this.tripId}/cohorts/${this.cohortId}/itinerary/events?tz=${this.tz}&date=${cdMoment}`)
    }

    getDays = () => {
        return apiCall('get', `/api/trips/${this.tripId}/cohorts/${this.cohortId}/itinerary/days?tz=${this.tz}`)
    }

    setCurrentDay = async newDay => {
        const events = await this.getEvents(newDay)
        this.setState({
            currentDay: newDay,
            events
        })
    }

    submitEvent = async event => {
        const eventToSend = {
            category: event.category,
            dtStart: `${event.dateStart}T${event.timeStart}:00`,
            image: event.image,
            link: event.link,
            linkText: event.linkText,
            summary: event.summary,
            dtEnd: `${event.dateEnd}T${event.timeEnd}:00`,
            tzStart: event.tzStart,
            tzEnd: event.tzEnd,
            title: event.title
        }
        let date = this.state.currentDate

        await apiCall('post', `/api/trips/${this.tripId}/cohorts/${this.cohortId}/itinerary/events`, eventToSend)
        const state = await this.getDaysandEvents()
        this.setState({
            ...state,
            currentDay: date
        })
    }

    removeEvent = async eventId => {
        await apiCall('delete', `/api/trips/${this.tripId}/cohorts/${this.cohortId}/itinerary/events/${eventId}`)
        this.getDEandSetState()
    }

    render() {
        const { days, events, currentDay } = this.state

        console.log(days, events, currentDay)

        const dayList = days.length ? <DayList days={days} setCurrentDay={this.setCurrentDay} currentDay={currentDay} submit={this.setCurrentDay} /> : null
        const eventList = events.length ? <EventList events={events} removeEvent={this.removeEvent} /> : <h3>Select a day with events or add a new one!</h3>

        const addEventDay = days.length ? currentDay : this.tdStart

        return (
            <div className="container mt-4">
                <div>
                    <div className="row">
                        <div className="col-md-12 d-flex d-row justify-content-between align-items-center">
                            {dayList}
                            <AddEvent submit={this.submitEvent} initDay={addEventDay} />
                        </div>
                    </div>
                </div>
                <div className="mt-5">
                    <div className="row">
                        <div className="col-md-12">{eventList}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Itinerary
