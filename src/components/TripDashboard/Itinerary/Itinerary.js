import React, { Component } from 'react'
import uniqid from 'uniqid'
import EventForm from './Event/EventForm'
import DayList from './Day/DayList'
import EventList from './Event/EventList'
import { apiCall } from '../../../util/api'
import DayForm from './Day/DayForm'
import Alert from '../../Other/Alert'
import DashboardHeader from '../../Other/DashboardHeader'
import SideBar from '../SideBar'

class Itinerary extends Component {
    state = {
        days: [],
        events: [],
        currentDayId: null,
        showEventList: false,
        showDayList: false
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

    getAndSetDays = () => {
        let tripId = this.props.currentTrip._id
        let cohortId = this.props.currentCohort._id

        return apiCall('get', `/api/trips/${tripId}/cohorts/${cohortId}/itinerary/days`).then(days => {
            return this.setState({
                showDayList: true,
                days: days,
                currentDayId: days[0] ? days[0]._id : null
            })
        })
    }

    getAndSetEvents = () => {
        let tripId = this.props.currentTrip._id
        let cohortId = this.state.id
        let dayId = this.state.currentDayId
        return apiCall('get', `/api/trips/${tripId}/cohorts/${cohortId}/itinerary/days/${dayId}/events`).then(events => {
            return this.setState({
                showEventList: events.length > 0 ? true : false,
                events: events.length > 0 ? events : null
            })
        })
    }

    setCurrentDay = dayId => {
        let tripId = this.props.currentTrip._id
        let cohortId = this.state.id

        return apiCall('get', `/api/trips/${tripId}/cohorts/${cohortId}/itinerary/days/${dayId}/events`).then(data => {
            this.setState({
                currentDayId: dayId,
                showEventList: true,
                events: data
            })
        })
    }

    onNewEventClick = () => {
        this.setState({
            showEventList: false
        })
    }

    submitEvent = event => {
        let tripId = this.props.currentTrip._id
        let cohortId = this.state.id
        let dayId = this.state.currentDayId

        return apiCall('post', `/api/trips/${tripId}/cohorts/${cohortId}/itinerary/days/${dayId}/events`, event).then(() => this.setCurrentDay(this.state.currentDayId))
    }

    submitDay = date => {
        let day = {
            date,
            itinerary_id: this.state.currentItinerary._id
        }

        let tripId = this.props.currentTrip._id
        let cohortId = this.props.currentCohort._id

        let dayId = null
        apiCall('post', `/api/trips/${tripId}/cohorts/${cohortId}/itinerary/days`, day)
            .then(data => {
                dayId = data._id
                return apiCall('get', `/api/trips/${tripId}/cohorts/${cohortId}/itinerary/days`)
            })
            .then(data => {
                return this.setState({
                    days: data,
                    currentDayId: dayId,
                    showDayList: true
                })
            })
            .then(() => {
                return this.getAndSetEvents()
            })
    }

    removeDay = dayId => {
        let tripId = this.props.currentTrip._id
        let cohortId = this.state.currentItinerary.cohort_id
        apiCall('delete', `/api/trips/${tripId}/cohorts/${cohortId}/itinerary/days/${dayId}`)
            .then(() => {
                return this.setState(prevState => {
                    const newDays = prevState.days.filter(day => dayId !== day._id)
                    return {
                        ...prevState,
                        days: newDays,
                        currentDayId: newDays[0]._id,
                        showEventList: newDays[0].events.length > 0 ? true : false
                    }
                })
            })
            .then(this.getAndSetEvents)
            .catch(err => {
                console.log(err)
            })
    }

    removeEvent = eventId => {
        let tripId = this.props.currentTrip._id
        let cohortId = this.state.id
        let dayId = this.state.currentDayId
        apiCall('delete', `/api/trips/${tripId}/cohorts/${cohortId}/itinerary/days/${dayId}/events/${eventId}`) // Delete event
            .then(() => {
                return this.setState(prevState => {
                    return {
                        ...prevState,
                        events: prevState.events.filter(event => eventId !== event._id)
                    }
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        let dayList = this.state.showDayList ? <DayList days={this.state.days} setCurrentDay={this.setCurrentDay} currentDayId={this.state.currentDayId} removeDay={this.removeDay} /> : null
        let eventList = this.state.showEventList ? <EventList events={this.state.events} removeEvent={this.removeEvent} /> : <h3>Select a day with events or add a new one!</h3>

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
                        {eventList}
                    </div>
                    <SideBar ctr={[<DayForm submit={this.submitDay} key={uniqid()} />, <EventForm submit={this.submitEvent} key={uniqid()} />]} />
                </div>
            </div>
        )
    }
}

export default Itinerary
