import React, { Component } from 'react'
import DayList from './Days'
import EventList from './Events'
import { apiCall } from '../../util/api'
import NewEventForm from './Events/NewEventForm'
import moment from 'moment-timezone'
import { scroller } from 'react-scroll'
import './Itinerary.css'
import ReactGA from 'react-ga'
function initializeReactGA() {
    ReactGA.initialize('UA-145382520-1')
    ReactGA.pageview('/itinerary')
}


class Itinerary extends Component {
    tz = moment.tz.guess(true)

    state = {
        days: [],
        selectedDay: '',
        itinerary: []
    }

    constructor(props) {
        super(props)
        if (process.env.NODE_ENV === 'production') {
            initializeReactGA()
        }
        this.getDaysAndEvents()
    }

    getDaysAndEvents = async () => {
        let itinerary = await apiCall(
            'get',
            `/api/trips/${this.props.currentTrip._id}/itinerary?tz=${this.tz}`
        )
        if (itinerary.length > 0) {
            itinerary.sort(time_sort_asc)
            let days = []
            for (const event of itinerary) {
                console.log(event)
                if (!days.includes(event.dateStart)) {
                    days.push(event.dateStart)
                }
            }


            this.setState({ itinerary, days, selectedDay: days[0] })
        }
    }

    createEvent = async event => {
        let timeStart = event.timeStart.split(":")
        let timeEnd = event.timeEnd.split(":")
        event.dateStart.setHours(timeStart[0], timeStart[1])
        event.dateEnd.setHours(timeEnd[0], timeEnd[1])
        let gmtStart = moment(event.dateStart).tz('GMT').toString()
        let gmtEnd = moment(event.dateEnd).tz('GMT').toString()
        // let noEmptyDocs = event.documents.filter(doc => doc.name.length > 3)
        // event.documents = noEmptyDocs
        await apiCall(
            'post',
            `/api/trips/${this.props.currentTrip._id}/events`,
            {
                ...event,
                dtStart: gmtStart,
                dtEnd: gmtEnd
            }
        )

        this.getDaysAndEvents()
    }

    updateEvent = async (eventId, updateObject) => {
        let localStart = moment.tz(
            `${updateObject.dateStart}T${updateObject.timeStart}:00`,
            updateObject.tzStart
        )
        let localEnd = moment.tz(
            `${updateObject.dateEnd}T${updateObject.timeEnd}:00`,
            updateObject.tzEnd
        )
        let gmtStart = moment.tz(localStart, 'GMT').toString()
        let gmtEnd = moment.tz(localEnd, 'GMT').toString()

        updateObject.dtStart = gmtStart
        updateObject.dtEnd = gmtEnd
        let noEmptyDocs = updateObject.documents.filter(doc => doc.name.length > 3)
        updateObject.documents = noEmptyDocs
        await apiCall(
            'PUT',
            `/api/trips/${this.props.currentTrip._id}/events/${eventId}`,
            updateObject
        )

        this.getDaysAndEvents()
    }

    updateTripDate = async (tdId, updateObject) => {
        await apiCall(
            'put',
            `/api/trips/${this.props.currentTrip._id}/tripDates/${tdId}`,
            updateObject
        )
        this.getDaysAndEvents()
    }

    removeEvent = async eventId => {
        await apiCall(
            'delete',
            `/api/trips/${this.props.currentTrip._id}/events/${eventId}`
        )
        this.getDaysAndEvents()
    }

    removeTripDate = async tripDateId => {
        await apiCall(
            'delete',
            `/api/trips/${this.props.currentTrip._id}/tripDates/${tripDateId}`
        )
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

    render() {
        const { days, itinerary, selectedDay } = this.state
        const dayList = days.length ? (
            <DayList
                selectedDay={selectedDay}
                days={days}
                handleClick={this.onDayClick}
            />
        ) : (
                <p className="p-2">Click NEW EVENT to get started</p>
            )
        const eventList = itinerary.length ? (
            <EventList
                events={itinerary}
                updateEvent={this.updateEvent}
                removeEvent={this.removeEvent}
                updateTripDate={this.updateTripDate}
                removeTripDate={this.removeTripDate}
            />
        ) : (
                <h4 className="text-info" />
            )

        return (
            <div className="col-md-12 mt-4">
                <div className="col-md-10 d-flex flex-row justify-content-between">
                    <h4 className='Itinerary-title'>Trip Days</h4>
                    <NewEventForm
                        submit={this.createEvent}
                        initDay={this.props.currentTrip.dateStart}
                        tripId={this.props.currentTrip._id}
                    />
                </div>
                <div className="row mx-0">
                    <div className="col-md-2">
                        <div className="Itinerary-trip-days-card mt-4">
                            {dayList}
                        </div>
                    </div>
                    <div className="col-md-8">
                        {eventList}
                    </div>
                </div>
            </div>
        )
    }
}

export default Itinerary

const time_sort_asc = function (event1, event2) {
    if (
        moment(event1.dtStart, ['h:mm A']).format('HH:mm') >
        moment(event2.dtStart, ['h:mm A']).format('HH:mm')
    )
        return 1
    if (
        moment(event1.dtStart, ['h:mm A']).format('HH:mm') <
        moment(event2.dtStart, ['h:mm A']).format('HH:mm')
    )
        return -1
    return 0
}
