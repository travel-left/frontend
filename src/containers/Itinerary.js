import React, { Component } from 'react'
import { connect } from 'react-redux'
import EventForm from '../components/Itinerary/Event/EventForm'
import DayList from '../components/Itinerary/Day/DayList'
import ItineraryList from '../components/Itinerary/ItineraryList'
import EventList from '../components/Itinerary/Event/EventList'
import { apiCall } from '../services/api'
import DayForm from '../components/Itinerary/Day/DayForm'
import './Itinerary.css'
import Alert from '../components/Other/Alert';
import DashboardHeader from '../components/Other/DashboardHeader';

class Itinerary extends Component {
    state = {
        itineraries: [],
        days: [],
        events: [],
        currentItinerary: null,
        currentDayId: null,
        showItineraryList: false,
        showEventList: false,
        showDayList: false,
        showEventForm: false,
        showDayForm: false,
        showNewDayButton: true
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
                showItineraryList: true
            })
        })
    }

    getAndSetDays = () => {
        return apiCall('get', `/api/itinerary/${this.state.currentItinerary._id}/days`).then(data => {
            return this.setState({
                days: data.days,
                currentDayId: data.days.length > 0 ? data.days[0]._id : null,
                showDayList: true,
                showNewDayButton: true
            })
        })
    }

    getAndSetEvents = () => {
        return apiCall('get', `/api/itinerary/day/${this.state.currentDayId}/events`).then(data => {
            return this.setState({
                showEventList: true,
                events: data.events
            })
        })
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

    setCurrentItinerary = itinerary => {
        apiCall('get', `/api/itinerary/${itinerary}/days`)
            .then(data => {
                return this.setState({
                    currentItinerary: this.state.itineraries.filter(i => i._id === itinerary)[0],
                    days: data.days,
                    currentDayId: null,
                    showDayList: true,
                    showEventList: false,
                    showNewDayButton: true
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
                events: data.events,
                showEventForm: false,
                showDayForm: false
            })
        })
    }

    onNewEventClick = () => {
        this.setState({
            showEventForm: true,
            showEventList: false
        })
    }

    onNewDayClick = () => {
        this.setState({
            showDayForm: true,
            showNewDayButton: false
        })
    }

    submitEvent = event => {
        event.day_id = this.state.currentDayId
        apiCall('post', `/api/itinerary/event`, event).then(() => this.setCurrentDay(this.state.currentDayId))
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
                    showDayList: true,
                    showNewDayButton: true,
                    showDayForm: false
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
        let itineraryList,
            dayList,
            eventList,
            eventForm,
            dayForm,
            newDayButton = null
        eventList = <h3>Select a day to view and add events!</h3>

        if (this.state.showItineraryList) {
            itineraryList = <ItineraryList submit={this.setCurrentItinerary} itineraries={this.state.itineraries} currentItinerary={this.state.currentItinerary} />
        }

        if (this.state.showDayList) {
            dayList = <DayList days={this.state.days} setCurrentDay={this.setCurrentDay} currentDayId={this.state.currentDayId} removeDay={this.removeDay} />
        }

        if (this.state.showEventList) {
            eventList = this.state.events.length > 0 ? <EventList events={this.state.events} removeEvent={this.removeEvent} /> : <h3>Select a day with events or add a new one!</h3>
        }

        if (this.state.showEventForm && this.state.currentDayId) {
            eventForm = <EventForm submit={this.submitEvent} />
        }

        if (this.state.showDayForm) {
            dayForm = <DayForm submit={this.submitDay} />
        }

        if (this.state.showNewDayButton) {
            newDayButton = (
                <button className="btn btn-lg btn-square light" onClick={this.onNewDayClick}>
                    New Day
                </button>
            )
        }

        return (
            <div class="">
                <div className="row">
                    <div className="col-12">
                        <Alert />
                    </div>
                </div>
                <div className="row">
                    <div className="col-8">
                        <DashboardHeader title='Itinerary' description='Set the trip activities, accommodations, flights, addresses, checklists, forms and more'/>
                        <div>
                            {dayList}
                        </div>
                        <div>
                            {eventList}
                        </div>
                    </div>
                    <div className="col-4" style={{ backgroundColor: '#FBFBFB', height: '100vh', boxShadow: 'rgb(136, 136, 136) 0px 2px 4px' }}>
                        <div class="card" style={{ border: 'none', backgroundColor: '#FBFBFB' }}>
                            <div class="card-body" style={{ marginTop: '20px' }}>
                            <span style={{ fontSize: '1.3em', color: '#3A3A3A', fontWeight: '600', display: 'block' }}>Cohort: {itineraryList}</span>
                            {newDayButton}
                            <br/>
                            <br/>
                            {dayForm}
                            <button class="btn btn-lg btn-square light" onClick={this.onNewEventClick}>
                            New Event
                            </button>
                            {eventForm}
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

export default connect(
    mapStateToProps,
    null
)(Itinerary)
