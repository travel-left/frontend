import React, { Component } from 'react'
import EventForm from './Event/EventForm'
import DayList from './Day/DayList'
import CohortList from './Cohort/CohortList'
import EventList from './Event/EventList'
import { apiCall } from '../../../util/api'
import DayForm from './Day/DayForm'
import './Itinerary.css'
import Alert from '../../Other/Alert'
import DashboardHeader from '../../Other/DashboardHeader'
import SideBar from '../SideBar'

class Itinerary extends Component {
    state = {
        itineraries: [],
        days: [],
        events: [],
        currentItinerary: null,
        currentDayId: null,
        showCohortList: false,
        showEventList: false,
        showDayList: false
    }

    constructor(props) {
        super(props)

        this.getAndSetItineraries()
            .then(() => this.getAndSetDays())
            .then(() => this.getAndSetEvents())
            .catch(err => {
                console.log(err)
            })
    }

    getAndSetItineraries = () => {
        let tripId = this.props.currentTrip._id
        return apiCall('get', `/api/trips/${tripId}/cohorts?populate=itinerary`).then(data => {
            return this.setState({
                itineraries: data.map(c => {
                    return {
                        ...c.itinerary,
                        title: c.title
                    }
                }),
                currentItinerary: data[0].itinerary,
                showCohortList: true
            })
        })
    }

    getAndSetDays = () => {
        let tripId = this.props.currentTrip._id
        let cohortId = this.state.currentItinerary.cohort_id
        return apiCall('get', `/api/trips/${tripId}/cohorts/${cohortId}/itinerary/days`).then(data => {
            return this.setState({
                days: data,
                currentDayId: data.length > 0 ? data[0]._id : null,
                showDayList: true
            })
        })
    }

    getAndSetEvents = () => {
        let tripId = this.props.currentTrip._id
        let cohortId = this.state.currentItinerary.cohort_id
        let dayId = this.state.currentDayId
        return apiCall('get', `/api/trips/${tripId}/cohorts/${cohortId}/itinerary/days/${dayId}/events`).then(data => {
            return this.setState({
                showEventList: data ? true : false,
                events: data
            })
        })
    }

    setCurrentItinerary = itinerary => {
        let tripId = this.props.currentTrip._id
        let currentItin = this.state.itineraries.filter(i => i._id === itinerary)[0]
        let cohortId = currentItin.cohort_id
        let dayId = this.state.currentDayId
        apiCall('get', `/api/trips/${tripId}/cohorts/${cohortId}/itinerary/days`)
            .then(data => {
                return this.setState({
                    currentItinerary: this.state.itineraries.filter(i => i._id === itinerary)[0],
                    days: data,
                    currentDayId: null,
                    showDayList: true,
                    showEventList: false
                })
            })
            .then(() => {
                return apiCall('get', `/api/trips/${tripId}/cohorts/${cohortId}/itinerary/days/${dayId}/events`)
            })
            .then(data => {
                return this.setState({
                    showEventList: false,
                    events: null,
                    currentItinerary: itinerary
                })
            })
    }

    setCurrentDay = day => {
        let tripId = this.props.currentTrip._id
        let cohortId = this.state.currentItinerary.cohort_id
        let dayId = this.state.currentDayId
        apiCall('get', `/api/trips/${tripId}/cohorts/${cohortId}/itinerary/days/${dayId}/events`).then(data => {
            this.setState({
                currentDayId: day,
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
        let cohortId = this.state.currentItinerary.cohort_id
        event.day_id = this.state.currentDayId
        apiCall('post', `/api/trips/${tripId}/cohorts/${cohortId}/itinerary/days/${event.day_id}/events`, event).then(() => this.setCurrentDay(this.state.currentDayId))
    }

    submitDay = date => {
        let day = {
            date,
            itinerary_id: this.state.currentItinerary._id
        }

        let tripId = this.props.currentTrip._id
        let cohortId = this.state.currentItinerary.cohort_id

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
                    return {
                        ...prevState,
                        days: prevState.days.filter(day => dayId !== day._id),
                        showEventList: false
                    }
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    removeEvent = eventId => {
        let tripId = this.props.currentTrip._id
        let cohortId = this.state.currentItinerary.cohort_id
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
        let cohortList = this.state.showCohortList ? <CohortList submit={this.setCurrentItinerary} itineraries={this.state.itineraries} currentItinerary={this.state.currentItinerary} /> : null

        let dayList = this.state.showDayList ? <DayList days={this.state.days} setCurrentDay={this.setCurrentDay} currentDayId={this.state.currentDayId} removeDay={this.removeDay} /> : null

        let eventList = this.state.showEventList ? <EventList events={this.state.events} removeEvent={this.removeEvent} /> : <h3>Select a day with events or add a new one!</h3>

        return (
            <div class="">
                <div className="row">
                    <div className="col-12">
                        <Alert text="Create an itinerary for each of your cohorts here. Travelers will see the days that have events on the mobile app." />
                    </div>
                </div>
                <div className="row">
                    <div className="col-8">
                        <DashboardHeader title="Itinerary for your " cTor={cohortList} secondTitle="cohort" description="Set the trip activities, accommodations, flights, addresses, checklists, forms and more" />
                        <div>{dayList}</div>
                        <div>{eventList}</div>
                    </div>
                    <SideBar ctr={[<DayForm submit={this.submitDay} />, <EventForm submit={this.submitEvent} />]} />
                </div>
            </div>
        )
    }
}

export default Itinerary
