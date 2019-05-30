import React, { Component } from 'react'
import EventForm from './Event/EventForm'
import DayList from './Day/DayList'
import CohortList from './Cohort/CohortList'
import EventList from './Event/EventList'
import { apiCall } from '../../services/api'
import DayForm from './Day/DayForm'
import './Itinerary.css'
import Alert from '../Other/Alert';
import DashboardHeader from '../Other/DashboardHeader';

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
        return apiCall('get', `/api/trip/${this.props.currentTrip._id}/cohort/all`).then(data => {
            return this.setState({
                itineraries: data.cohorts.map(c => {
                    return {
                        ...c.itinerary,
                        title: c.title
                    }
                }),
                currentItinerary: data.cohorts[0].itinerary,
                showCohortList: true
            })
        })
    }

    getAndSetDays = () => {
        return apiCall('get', `/api/itinerary/${this.state.currentItinerary._id}/days`).then(data => {
            return this.setState({
                days: data.days,
                currentDayId: data.days.length > 0 ? data.days[0]._id : null,
                showDayList: true
            })
        })
    }

    getAndSetEvents = () => {
        return apiCall('get', `/api/itinerary/day/${this.state.currentDayId}/events`).then(data => {
            return this.setState({
                showEventList: data.events ? true : false,
                events: data.events
            })
        })
    }

    setCurrentItinerary = itinerary => {
        apiCall('get', `/api/itinerary/${itinerary}/days`)
            .then(data => {
                return this.setState({
                    currentItinerary: this.state.itineraries.filter(i => i._id === itinerary)[0],
                    days: data.days,
                    currentDayId: null,
                    showDayList: true,
                    showEventList: false
                })
            })
            .then(() => {
                return apiCall('get', `/api/itinerary/day/${this.state.currentDayId}/events`)
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
        apiCall('get', `/api/itinerary/day/${day}/events`).then(data => {
            this.setState({
                currentDayId: day,
                showEventList: true,
                events: data.events
            })
        })
    }

    onNewEventClick = () => {
        this.setState({
            showEventList: false
        })
    }

    submitEvent = event => {
        event.day_id = this.state.currentDayId
        apiCall('post', `/api/itinerary/event`, event)
        .then(() => this.setCurrentDay(this.state.currentDayId))
    }

    submitDay = date => {
        let day = {
            date,
            itinerary_id: this.state.currentItinerary._id
        }

        let dayId = null
        apiCall('post', `/api/itinerary/day`, day)
            .then(data => {
                dayId = data._id
                return apiCall('get', `/api/itinerary/${this.state.currentItinerary._id}/days`)
            })
            .then(data => {
                return this.setState({
                    days: data.days,
                    currentDayId: dayId,
                    showDayList: true
                })
            })
            .then(() => {
                return this.getAndSetEvents()
            })
    }

    removeDay = dayId => {
        apiCall('delete', `/api/itinerary/day/${dayId}`)
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
        apiCall('delete', `/api/itinerary/event/${eventId}`)
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
        let cohortList = this.state.showCohortList ? 
            <CohortList submit={this.setCurrentItinerary} itineraries={this.state.itineraries} currentItinerary={this.state.currentItinerary} />
            : null

        let dayList = this.state.showDayList ? 
            <DayList days={this.state.days} setCurrentDay={this.setCurrentDay} currentDayId={this.state.currentDayId} removeDay={this.removeDay} />
            : null

        let eventList = this.state.showEventList ?
            <EventList events={this.state.events} removeEvent={this.removeEvent} />
            : <h3>Select a day with events or add a new one!</h3>

        return (
            <div class="">
                <div className="row">
                    <div className="col-12">
                        <Alert />
                    </div>
                </div>
                <div className="row">
                    <div className="col-8">
                        <DashboardHeader title='Itinerary for your ' cTor={cohortList} secondTitle='cohort' description='Set the trip activities, accommodations, flights, addresses, checklists, forms and more'/>
                        <div>
                            {dayList}
                        </div>
                        <div>
                            {eventList}
                        </div>
                    </div>
                    <div className="col-4" style={{ backgroundColor: '#FBFBFB', height: '100vh', boxShadow: 'rgb(136, 136, 136) 0px 2px 4px' }}>
                        <div class="card" style={{ border: 'none', backgroundColor: '#FBFBFB' }}>
                            <div class="card-body" style={{marginTop: '20px'}}>
                                <h3 className='text-center'>Add Days and Events</h3>
                                <DayForm submit={this.submitDay} />
                                <EventForm submit={this.submitEvent} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentTrip: state.currentTrip
    }
}

export default Itinerary
