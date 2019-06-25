import React, { Component } from 'react'
import DayList from './Day/DayList'
import EventList from './Event/EventList'
import { apiCall } from '../../../util/api'
import Alert from '../../Other/Alert'
import DashboardHeader from '../../Other/DashboardHeader'
import AddEvent from './Event/AddEvent'
import moment from 'moment-timezone'

class Itinerary extends Component {
    tripId = this.props.currentTrip._id

    state = {
        allDates: [],
        days: [],
        events: [],
        currentDate: null,
        showEventList: false,
        showDayList: false,
        tz: moment.tz.guess(true)
    }

    //have all days of trip in array
    //render a box for all days of trip
    //if day has an event, make box be colored

    constructor(props) {
        super(props)

        this.getAndSetDays().then(() => this.getAndSetEvents())
    }

    componentDidMount() {
        this.getAllDaysOfTrips(this.props.currentTrip.dateStart, this.props.currentTrip.dateEnd)
    }

    componentDidUpdate(prevProps) {
        if (this.props.currentCohort !== prevProps.currentCohort) {
            this.getAndSetDays().then(() => this.getAndSetEvents())
        }
    }

    getAllDaysOfTrips = (startDate, endDate) => {
        var dates = [moment(startDate).toDate()]

        var currDate = moment(startDate).startOf('day')
        var lastDate = moment(endDate).startOf('day')

        while (currDate.add(1, 'days').isSameOrBefore(lastDate)) {
            dates.push(currDate.clone().toDate())
        }
        console.log(dates)

        return this.setState({ allDates: dates })
    }

    getAndSetDays = () => {
        const { tz } = this.state
        return apiCall('get', `/api/trips/${this.tripId}/cohorts/${this.props.currentCohort._id}/itinerary/days?tz=${tz}`).then(days => {
            return this.setState({
                showDayList: days.length > 0 ? true : false,
                days: days,
                currentDate: days.length > 0 ? days[0] : null
            })
        })
    }

    getAndSetEvents = () => {
        const { tz, currentDate } = this.state
        const cdMoment = moment(currentDate).format('YYYY-MM-DD')
        return apiCall('get', `/api/trips/${this.tripId}/cohorts/${this.props.currentCohort._id}/itinerary/events?tz=${tz}&date=${cdMoment}`).then(events => {
            return this.setState({
                showEventList: events.length > 0 ? true : false,
                events: events
            })
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

    submitEvent = event => {
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

        return apiCall('post', `/api/trips/${this.tripId}/cohorts/${this.props.currentCohort._id}/itinerary/events`, eventToSend).then(() => this.getAndSetDays().then(() => this.setCurrentDay(date)))
    }

    removeEvent = eventId => {
        let date = this.state.currentDate
        apiCall('delete', `/api/trips/${this.tripId}/cohorts/${this.props.currentCohort._id}/itinerary/events/${eventId}`) // Delete event
            .then(() => this.getAndSetDays().then(() => this.getAndSetEvents()))
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        let dayList = this.state.showDayList ? <DayList dates={this.state.allDates} days={this.state.days} setCurrentDay={this.setCurrentDay} currentDate={this.state.currentDate} /> : null
        let eventList = this.state.showEventList ? <EventList events={this.state.events} removeEvent={this.removeEvent} /> : <h3>Select a day with events or add a new one!</h3>

        let calendar = this.state.allDates ? this.state.allDates.map(date => {
            return (
                <div style={{ minHeight: '10px', minWidth: '10px', backgroundColor: 'black', display: 'inline-block' }} className='my-3 mx-3'></div>
            )
        }) : null

        return (
            <div className="">
                <div className="row">
                    <div className="col-12">
                        <Alert text="Create an itinerary for each of your cohorts here. Travelers will see the days that have events on the mobile app." />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <DashboardHeader title="Itinerary" description="Set the trip activities, accommodations, flights, addresses, checklists, forms and more" currentTrip={this.props.currentTrip} />
                        {dayList}
                        <div className="d-flex justify-content-around my-3">
                            <AddEvent submit={this.submitEvent} />
                        </div>
                        {eventList}
                        {calendar}
                    </div>
                </div>
            </div>
        )
    }
}

export default Itinerary
