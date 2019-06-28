import React, { Component } from 'react'
import DayList from './Day/DayList'
import EventList from './Event/EventList'
import { apiCall } from '../../../util/api'
import AddEvent from './Event/AddEvent'
import moment from 'moment-timezone'

class Itinerary extends Component {

    tripId = this.props.currentTrip._id
    cohortId = this.props.currentTrip.cohorts[0]._id

    state = {
        allDates: [],
        days: [],
        events: [],
        currentDate: null,
        showEventList: false,
        showDayList: false,
        tz: moment.tz.guess(true)
    }

    constructor(props) {
        super(props)

        this.getAndSetDays().then(() => this.getAndSetEvents())
    }

    componentDidUpdate(prevProps) {
        if (this.props.currentCohort !== prevProps.currentCohort) {
            this.getAndSetDays().then(() => this.getAndSetEvents())
        }
    }

    getAndSetDays = async () => {
        const { tz } = this.state
        let days = await apiCall('get', `/api/trips/${this.tripId}/cohorts/${this.cohortId}/itinerary/days?tz=${tz}`)

        return this.setState({
            showDayList: days.length > 0 ? true : false,
            days,
            currentDate: days.length > 0 ? days[0] : null
        })
    }

    getAndSetEvents = async () => {
        const { tz, currentDate } = this.state
        const cdMoment = moment(currentDate).format('YYYY-MM-DD')
        let events = await apiCall('get', `/api/trips/${this.tripId}/cohorts/${this.cohortId}/itinerary/events?tz=${tz}&date=${cdMoment}`)

        return this.setState({
            showEventList: events.length > 0 ? true : false,
            events
        })
    }

    setCurrentDay = newDate => {
        this.setState(
            {
                currentDate: newDate
            },
            () => this.getAndSetEvents()
        )
    }

    onNewEventClick = () => {
        this.setState({
            showEventList: false
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
        await this.getAndSetDays()
        await this.getAndSetEvents()
        await this.setCurrentDay(date)
    }

    removeEvent = eventId => {
        let date = this.state.currentDate
        apiCall('delete', `/api/trips/${this.tripId}/cohorts/${this.cohortId}/itinerary/events/${eventId}`) // Delete event
            .then(() => this.getAndSetDays().then(() => this.getAndSetEvents()))
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        let dayList = this.state.showDayList ? <DayList dates={this.state.allDates} days={this.state.days} setCurrentDay={this.setCurrentDay} currentDate={this.state.currentDate} /> : null
        let eventList = this.state.showEventList ? <EventList events={this.state.events} removeEvent={this.removeEvent} /> : <h3>Select a day with events or add a new one!</h3>

        return (
            <div className="">
                <div className="row">
                    <div className="col-md-8">
                        {dayList}
                        <div className="d-flex justify-content-around my-3">
                            <AddEvent submit={this.submitEvent} />
                        </div>
                        {eventList}
                    </div>
                </div>
            </div>
        )
    }
}

export default Itinerary
