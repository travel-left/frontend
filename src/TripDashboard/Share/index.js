import React, { Component } from 'react'
import moment from 'moment-timezone'
import { apiCall } from '../../util/api'
import Image from '../../util/otherComponents/Image'
import Map from '../Itinerary/Events/Map'
import { Switch, Route, withRouter, NavLink } from 'react-router-dom'
import { getIcon } from '../../util/file-icons'
import Event from '../Itinerary/Events/Event'
import ReactGA from 'react-ga'
ReactGA.pageview('/share')

class Share extends Component {
    tripId = this.props.match.params.tripId
    source = this.props.match.path.includes('preview') ? 'preview' : 'share'
    tz = moment.tz.guess(true)

    state = {
        trip: {},
        days: [],
        events: [],
        orgName: '',
        selectedDay: {}
    }
    constructor(props) {
        super(props)
        this.getTripInfo()
    }

    getTripInfo = async () => {
        let data = await apiCall(
            'get',
            `/api/trips/${this.tripId}/share?tz=${this.tz}`
        )
        let events = data.itinerary
        events.sort(time_sort_asc)
        let days = []
        events.forEach(event => {
            if (!days.includes(event.dateStart)) days.push(event.dateStart)
        })
        days.sort(date_sort_asc)
        let orgName = await apiCall(
            'get',
            `/api/organization/${data.trip.coordinators[0].organization}/name`
        )
        this.setState({
            trip: data.trip,
            events,
            days,
            selectedDay: days[0],
            orgName
        })
    }

    setSelectedDay = day => {
        this.setState({
            selectedDay: day
        })
    }

    render() {
        const { days, events, selectedDay, trip, orgName } = this.state
        const dayList = days.map(day => {
            let activeClass = day === selectedDay ? 'text-primary' : ''
            return (
                <div
                    className={`mx-4 d-flex flex-column align-items-center hover ${activeClass}`}
                    onClick={() => this.setSelectedDay(day)}
                >
                    <span>{moment(day).format('dd')}</span>
                    <span className="h6">{moment(day).format('DD')}</span>
                </div>
            )
        })

        const eventList = events.map(event => {
            event.share = true
            if (event.dateStart === selectedDay) {
                return <Event event={event} />
            }
        })

        const documentList = this.state.trip.documents
            ? this.state.trip.documents.map(doc => {
                  return <ShareDocument doc={doc} />
              })
            : null

        const contactsList =
            trip.contacts || trip.coordinators
                ? [...trip.coordinators, ...trip.contacts].map(contact => {
                      return <ShareContact contact={contact} />
                  })
                : null

        return (
            <div className="container-fluid">
                <div className="">
                    <div className="row d-flex justify-content-between">
                        <h2 className="text p-2">{trip.name}</h2>
                        <h2 className="text p-2">{orgName}</h2>
                    </div>
                    <ShareCover trip={trip} />
                    <div className="position-relative">
                        <div
                            className="d-flex justify-content-center position-absolute"
                            style={{
                                top: '-5vh',
                                left: '50%',
                                right: '50%'
                            }}
                        >
                            <Navigation
                                tripId={this.tripId}
                                source={this.source}
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-5">
                    <Switch>
                        <Route
                            exact
                            path={`/trips/:tripId/${this.source}/documents`}
                            render={props => (
                                <div className="container">
                                    <div className="row d-flex justify-content-around">
                                        {documentList}
                                    </div>
                                </div>
                            )}
                        />
                        <Route
                            exact
                            path={`/trips/:tripId/${this.source}/contacts`}
                            render={props => (
                                <div className="container">
                                    <div className="row d-flex justify-content-around">
                                        {contactsList}
                                    </div>
                                </div>
                            )}
                        />
                        <Route
                            path={`/trips/:tripId/${this.source}/`}
                            render={props => (
                                <div>
                                    <h4 className="mb-3">
                                        Itinerary:{' '}
                                        {moment(trip.dateStart).format(
                                            'MMM DD'
                                        )}{' '}
                                        to{' '}
                                        {moment(trip.dateEnd).format('MMM DD')}
                                    </h4>
                                    <div className="row px-0 d-flex justify-content-center">
                                        <div className="d-flex flex-wrap justify-content-start mb-3">
                                            {dayList}
                                        </div>
                                    </div>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-12 d-flex flex-column align-items-center">
                                                {eventList}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        />
                    </Switch>
                </div>
            </div>
        )
    }
}

export default withRouter(Share)

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

const date_sort_asc = function(date1, date2) {
    if (date1 > date2) return 1
    if (date1 < date2) return -1
    return 0
}

const ShareDocument = ({ doc }) => {
    const linkImg = getIcon(doc.link)
    return (
        <div className="card mb-3 border-0 shadow px-1 rounded-lg animated fadeIn col-5 mx-2">
            <div className="card-body">
                <div className="d-flex flex-column align-items-center justify-content-between">
                    <a
                        className="hove d-flex alighn-self-center py-1"
                        href={doc.link}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src={linkImg}
                            alt=""
                            style={{ objectFit: 'cover' }}
                        />
                    </a>
                    <strong className="text-center"> {doc.name}</strong>
                </div>
            </div>
        </div>
    )
}

const ShareContact = ({ contact }) => {
    return (
        <div className="card mb-3 border-0 shadow px-1 rounded-lg animated fadeIn col-5 mx-2">
            <div className="card-body">
                <div className="d-flex flex-column align-items-center justify-content-center">
                    <Image src={contact.image} diameter="65px" />
                    <strong className="h6 mt-3 text-center">
                        {contact.name}
                    </strong>
                    <p
                        className="card-text text-center"
                        style={{ fontSize: '.6em' }}
                    >
                        {contact.number}
                    </p>
                    <p
                        className="card-text text-center"
                        style={{ fontSize: '.6em' }}
                    >
                        {contact.email}
                    </p>
                </div>
            </div>
        </div>
    )
}

const ShareCover = ({ trip }) => {
    return (
        <div
            className="row d-flex flex-column justify-content-between p-4"
            style={{
                backgroundImage: `url(${trip.image})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                height: '20vh'
            }}
        />
    )
}

const Navigation = ({ tripId, source }) => (
    <span
        className="badge badge-light badge-pill rounded-pill px-4 py-2 shadow d-flex justify-content-around align-items-center"
        style={{ width: '60vw', backgroundColor: 'black' }}
    >
        <NavLink
            activeClassName="bg-primary rounded-circle"
            to={`/trips/${tripId}/${source}/itinerary`}
            name={`/trips/${tripId}/${source}/itinerary`}
        >
            <span
                className="rounded-circle hover d-flex align-items-center justify-content-center"
                style={{
                    width: '7vh',
                    height: '7vh',
                    zIndex: '999'
                }}
            >
                <i className="far fa-calendar fa-2x text-light" />
            </span>
        </NavLink>

        <NavLink
            activeClassName="bg-primary rounded-circle"
            to={`/trips/${tripId}/${source}/documents`}
            name={`/trips/${tripId}/${source}/documents`}
        >
            <span
                className="rounded-circle hover d-flex align-items-center justify-content-center"
                style={{
                    width: '8vh',
                    height: '8vh'
                }}
            >
                <i className="far fa-folder fa-2x text-light" />
            </span>
        </NavLink>
        <NavLink
            activeClassName="bg-primary rounded-circle"
            to={`/trips/${tripId}/${source}/contacts`}
            name={`/trips/${tripId}/${source}/contacts`}
        >
            <span
                className="rounded-circle hover d-flex align-items-center justify-content-center"
                style={{
                    width: '8vh',
                    height: '8vh'
                }}
            >
                <i className="far fa-user fa-2x text-light" />
            </span>
        </NavLink>
    </span>
)
