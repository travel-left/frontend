import React, { Component } from 'react'
import { connect } from 'react-redux'
import EventForm from '../components/Itinerary/Event/EventForm'
import DayList from '../components/Itinerary/Day/DayList'
import ItineraryList from "../components/Itinerary/ItineraryList"
import EventList from '../components/Itinerary/Event/EventList'
import { apiCall } from "../services/api"
import DayForm from '../components/Itinerary/Day/DayForm'

// An event has a title, a date, a time start, a time end, a summary, a picture, a link, and link text
// A list has events in it
// The admin submit through a form or a csv file and then sees the list of events below, list is arranged by date

class Itinerary extends Component {
    state = {
        itineraries: [],
        currentItinerary: null,
        days: [],
        currentDay: null,
        events: [],
        currentEvent: null,
        currentDayId: null,
        showItineraryList: false,
        showEventList: false,
        showDayList: false, 
        showEventForm: false,
        showDayForm: false,
        showNewDayButton: true
    }
    constructor(props){
        super(props)

        //set current itinerary
        //get all days
        //set current day
        //get events
        //set current event
        apiCall('get', `/api/trip/${this.props.currentTrip.id}/cohort/all`)
        .then(data => {
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
        .then(() => {
            return apiCall('get', `/api/itinerary/${this.state.currentItinerary._id}/days`)
        })
        .then(data => {
            return this.setState({
                days: data.days,
                currentDayId: data.days[0]._id,
                showDayList: true,
                showNewDayButton: true
            })
        })
        .then(() => {
            return apiCall('get', `/api/itinerary/day/${this.state.currentDayId}/events`)
        })
        .then(data => {
            return this.setState({
                showEventList: true,
                events: data.events
            })
        })
        .catch(err => {
            this.setState({
                currentItinerary: 'error getting itineraries'
            })
        })

    }

    setCurrentItinerary = itinerary => {
        console.log(itinerary)
        apiCall('get', `/api/itinerary/${itinerary}/days`)
        .then(data => {
            return this.setState({
                currentItinerary: this.state.itineraries.filter(i => i._id === itinerary)[0],
                days: data.days,
                currentDayId: null,
                showDayList: true,
                showNewDayButton: true
            })
        })
        .then(() => {
            return apiCall('get', `/api/itinerary/day/${this.state.currentDayId}/events`)
        })
        .then(data => {
            return this.setState({
                showEventList: false,
                events: null
            })
        })
    }
    //PURPOSE: set the current day
    //on click of day, the current day is updated to that day
    //pass function down to DayList=>Day
    //listen for click in Day, pass day back up to DayList => Itinerary
    setCurrentDay = day => {

        console.log('looking for events at id: ' + day)
        apiCall('get', `/api/itinerary/day/${day}/events`)
        .then(data => {
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
        console.log(event)
        apiCall('post', `/api/itinerary/event`, event)
        .then(data => {
            console.log(data)
        })
        .then(() => this.setCurrentDay(this.state.currentDayId))
    }

    submitDay = date => {
        let day = {
            date
        }
        day.itinerary_id = this.state.currentItinerary._id
        let dayId = null
        apiCall('post', `/api/itinerary/day`, day)
        .then(data => {
            dayId = data._id
            return apiCall('get', `/api/itinerary/${this.state.currentItinerary._id}/days`)
        })
        .then(data => {
            console.log(data)
            return this.setState({
                days: data.days,
                currentDayId: dayId,
                showDayList: true,
                showNewDayButton: true,
                showDayForm: false
            })
        })
        .then(() => {
            return apiCall('get', `/api/itinerary/day/${this.state.currentDayId}/events`)
        })
        .then(data => {
            return this.setState({
                showEventList: true,
                events: data.events
            })
        })

    }

    hideEventList = () => {
        this.setState({showEventList: false})
    }

    render() {
        let itineraryList, dayList, eventList, eventForm, dayForm, newDayButton = null
        eventList = <h3>Select a day to view and add events!</h3>

        if(this.state.showItineraryList) {
            itineraryList = <ItineraryList submit={this.setCurrentItinerary} itineraries={this.state.itineraries} currentItinerary={this.state.currentItinerary}/>
        }else {
            //TODO: render an empty list
        }

        if(this.state.showDayList) {
            dayList = <DayList days={this.state.days} setCurrentDay={this.setCurrentDay} currentDayId={this.state.currentDayId} hideEvents={this.hideEventList}/>
        }else {
            //TODO: render an empty list
        }

        if(this.state.showEventList) {
            // <EventList dayId={this.state.currentDay} 
            eventList = this.state.events.length > 0 ? <EventList dayId={this.state.currentDay} events={this.state.events}/> : <h3>Select a day with events or add a new one!</h3>
        }
        else{

        }

        if(this.state.showEventForm && this.state.currentDayId) {
            eventForm = <EventForm submit={this.submitEvent}/>
        }

        if(this.state.showDayForm) {
            dayForm = <DayForm submit={this.submitDay}/>
        }

        if(this.state.showNewDayButton) {
            newDayButton = (
                <button class="btn btn-lg" style={{backgroundColor: '#38ada9', color: 'white', marginTop: '25px'}} onClick={this.onNewDayClick}>
                    <i class="fa fa-plus-square" aria-hidden="true"></i> New Day
                </button>
            )
        }

        return (
            <div class="">
                <div className="itinerary-header-image">
                </div>
                <div className="itinerary-header-title">
                    <div>Create your {this.props.currentTrip.name} 
                    { itineraryList } 
                    Itinerary </div>
                </div>
                <div className="container">
                    <div class="row">
                        <div class="days col-3">
                            <div className='day-list'>   
                                { dayList }
                                { dayForm }
                                { newDayButton }
                            </div>
                        </div>
                        <div class="col-8">
                                <div style={{width: '100%', display: 'inline-block'}}>
                                    <button class="btn btn-lg float-right" style={{backgroundColor: '#38ada9', color: 'white'}} onClick={this.onNewEventClick}>
                                        <i class="fa fa-plus-square" aria-hidden="true"></i> New Event
                                    </button>
                                </div>
                            { eventList }
                            { eventForm }
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

export default connect(mapStateToProps, null)(Itinerary)