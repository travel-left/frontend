import React, { Component } from 'react'
import DayList from './Days'
import EventList from './Events'
import { apiCall, genericSubUpdater } from '../../util/api'
import CreateEventForm from './Events/CreateEventForm'
import moment from 'moment-timezone'
import { scroller } from 'react-scroll'

class Itinerary extends Component {
    tz = moment.tz.guess(true)

    state = {
        days: [],
        selectedDay: '',
        itinerary: []
    }

    constructor(props) {
        super(props)
        // this.getShowAlertAndSetState()
        this.getDaysAndEvents()
    }

    getDaysAndEvents = async () => {
        let itinerary = await apiCall(
            'get',
            `/api/trips/${this.props.currentTrip._id}/itinerary?tz=${this.tz}`
        )
        itinerary.sort(time_sort_asc)
        let days = []
        for (const event of itinerary) {
            if (!days.includes(event.dateStart)) {
                days.push(event.dateStart)
            }
        }

        this.setState({ itinerary, days, selectedDay: days[0] })
    }

    createEvent = async event => {
        console.log(event)
        const docs = event.documents
        event.documents = []
        const createdEvent = await apiCall(
            'post',
            `/api/trips/${this.props.currentTrip._id}/events`,
            {
                ...event,
                dtStart: `${event.dateStart}T${event.timeStart}:00`,
                dtEnd: `${event.dateEnd}T${event.timeEnd}:00`
            }
        )

        await Promise.all(
            docs.map(d =>
                apiCall(
                    'post',
                    `/api/trips/${this.props.currentTrip._id}/events/${
                        createdEvent._id
                    }/documents`,
                    d
                )
            )
        )
        this.getDaysAndEvents()
    }

    updateEvent = async (eventId, updateObject) => {
        updateObject.dtStart = `${updateObject.dateStart}T${
            updateObject.timeStart
        }:00`
        updateObject.dtEnd = `${updateObject.dateEnd}T${
            updateObject.timeEnd
        }:00`

        const originalEvent = this.state.itinerary.find(
            e => e._id.toString() === eventId
        )
        updateObject = await genericSubUpdater(
            `/api/trips/${this.props.currentTrip._id}/events/${eventId}`,
            originalEvent,
            updateObject,
            'documents'
        )

        await apiCall(
            'put',
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
        ) : null
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
        // let alert = showAlert ? (
        //     <Alert
        //         text='This is your trip itinerary.  Here you can manage events and days.  Click "ADD NEW EVENT" to get started.'
        //         closeAlert={this.closeAlert}
        //     />
        // ) : null

        return (
            <div className="container mt-4">
                {/* <div className="row">
                    <div className="col-md-12 d-none d-md-block">{alert}</div>
                </div> */}
                <div className="row">
                    <div className="col-md-2">{dayList}</div>
                    <div className="col-md-10">
                        <div className="row float-right mb-5 mr-2">
                            <CreateEventForm
                                submit={this.createEvent}
                                initDay={this.props.currentTrip.dateStart}
                            />
                        </div>
                        <div className="row mx-3 mt-5">
                            <div className="col-md-12">{eventList}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Itinerary

const time_sort_asc = function(event1, event2) {
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
