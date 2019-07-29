import React, { Component } from 'react'
import DayList from './DayList'
import EventList from './Event/EventList'
import { apiCall } from '../../util/api'
import CreateEventForm from './Event/CreateEventForm'
import moment from 'moment-timezone'
import Alert from '../../util/otherComponents/Alert'

class Itinerary extends Component {
    closeAlert = async () => {
        const { _id } = this.props.currentUser.user
        await apiCall('put', `/api/coordinators/${_id}`, {
            showAlerts: { itinerary: false }
        })
        this.setState({
            showAlert: false
        })
    }

    getShowAlertAndSetState = async () => {
        const { _id } = this.props.currentUser
        const coordinator = await apiCall('get', `/api/coordinators/${_id}`)
        if (coordinator.showAlerts.itinerary === 'true') {
            this.setState({
                showAlert: true
            })
        }
    }

    tripId = this.props.currentTrip._id
    tz = moment.tz.guess(true)

    state = {
        days: [],
        events: [],
        showAlert: false
    }

    constructor(props) {
        super(props)
        this.getShowAlertAndSetState()
        this.getDaysAndEvents()
    }

    getDaysAndEvents = async () => {
        let events = await apiCall(
            'get',
            `/api/trips/${this.tripId}/itinerary?tz=${this.tz}`
        )
        events.sort(time_sort_asc)
        let days = []
        events.forEach(event => {
            if (!days.includes(event.dateStart)) days.push(event.dateStart)
        })

        this.setState({ events, days })
    }

    createEvent = async event => {
        await apiCall('post', `/api/trips/${this.tripId}/events`, {
            ...event,
            dtStart: `${event.dateStart}T${event.timeStart}:00`,
            dtEnd: `${event.dateEnd}T${event.timeEnd}:00`
        })
        this.getDaysAndEvents()
    }

    updateEvent = async (eventId, updateObject) => {
        updateObject.dtStart = `${updateObject.dateStart}T${
            updateObject.timeStart
        }:00`
        updateObject.dtEnd = `${updateObject.dateEnd}T${
            updateObject.timeEnd
        }:00`
        await apiCall(
            'put',
            `/api/trips/${this.tripId}/events/${eventId}`,
            updateObject
        )
        this.getDaysAndEvents()
    }

    updateTripDate = async (tdId, updateObject) => {
        await apiCall(
            'put',
            `/api/trips/${this.tripId}/tripDates/${tdId}`,
            updateObject
        )
        this.getDaysAndEvents()
    }

    removeEvent = async eventId => {
        await apiCall('delete', `/api/trips/${this.tripId}/events/${eventId}`)
        this.getDaysAndEvents()
    }

    removeTripDate = async tripDateId => {
        await apiCall(
            'delete',
            `/api/trips/${this.tripId}/tripDates/${tripDateId}`
        )
        this.getDaysAndEvents()
    }

    render() {
        const { days, events, showAlert } = this.state
        const dayList = days.length ? <DayList days={days} /> : null
        const eventList = events.length ? (
            <EventList
                events={events}
                updateEvent={this.updateEvent}
                removeEvent={this.removeEvent}
                updateTripDate={this.updateTripDate}
                removeTripDate={this.removeTripDate}
            />
        ) : (
            <h4 className="text-info">
                Nothing here? Use the 'NEW EVENT' button to create your first
                event!
            </h4>
        )
        let alert = showAlert ? (
            <Alert
                text='This is your trip itinerary.  Here you can manage events and days.  Click "ADD NEW EVENT" to get started.'
                closeAlert={this.closeAlert}
            />
        ) : null

        return (
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-12 d-none d-md-block">{alert}</div>
                </div>
                <div className="row">
                    <div className="col-md-2">
                        <h2>Trip Days</h2>
                        <hr />
                        {dayList}
                    </div>
                    <div className="col-md-9">
                        <div className="row float-right mb-5">
                            <CreateEventForm
                                submit={this.createEvent}
                                initDay={this.props.currentTrip.dateStart}
                            />
                        </div>
                        <div className="row mx-3 mt-5">
                            <div className="col-md-11">{eventList}</div>
                        </div>
                    </div>
                    <div className="col-md-1" />
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
