import React, { Component } from 'react'
import moment from 'moment-timezone'
import { apiCall } from '../../util/api'
import Image from '../../util/otherComponents/Image'
import Map from '../Itinerary/Events/Map'
import { Switch, Route, withRouter, NavLink } from 'react-router-dom'
import { getIcon } from '../../util/file-icons'
import Event from '../Itinerary/Events/Event'
import './Share.css'
import ReactGA from 'react-ga'
function initializeReactGA() {
    ReactGA.initialize('UA-145382520-1')
    ReactGA.pageview('/share')
}

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
        if (process.env.NODE_ENV === 'production') {
            initializeReactGA()
        }
        this.getTripInfo()
    }

    getTripInfo = async () => {
        let trip = await apiCall(
            'get',
            `/api/trips/${this.tripId}/share?tz=${this.tz}`
        )

        let events = trip.events
        let days = []
        for (const event of events) {
            if (!days.includes(event.start.split('T')[0])) days.push(event.start.split('T')[0])
        }

        events = events.map(event => ({
            ...event,
            start: moment(event.start).tz(this.localTimezone),
            end: moment(event.end).tz(this.localTimezone)
        }))

        let orgName = await apiCall(
            'get',
            `/api/organization/${trip.coordinators[0].organization}/name`
        )

        this.setState({
            trip: trip,
            events: events,
            days,
            selectedDay: events[0].start,
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
                    className={`mx-4 d-flex flex-column align-items-center hover ${activeClass} Share-date`}
                    onClick={() => this.setSelectedDay(day)}
                >
                    <span>{moment(day).format('dd')}</span>
                    <span className="h6">{moment(day).format('DD')}</span>
                </div>
            )
        })

        const eventList = events.map(event => {
            event.share = true
            if (event.start === selectedDay) {
                return <Event event={event} />
            }
        })

        const tripDateList = this.state.trip.tripDates ? this.state.trip.tripDates.map(tripDate => <ShareTripDate tripDate={tripDate} />) : null

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
                        <span className="Share-title p-2">{trip.name}</span>
                        <span className="Share-title p-2">{orgName}</span>
                    </div>
                    <ShareCover trip={trip} source={this.source} />
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
                                    <h4 className="mb-3 Share-title">
                                        Trip Information
                                    </h4>
                                    <div className="row d-flex mb-4">
                                        <div className="mt-4 px-5 py-3" style={{
                                            background: '#FFFFFF',
                                            boxShadow: '0 0 50px 0 rgba(0,0,0,0.10)',
                                            borderRadius: '8px',
                                            border: 'none',
                                            minHeight: '100px',
                                            width: '340px'
                                        }}>
                                            <span className='Share-Trip-Dates-title'>Trip Dates</span>
                                            {tripDateList}
                                        </div>

                                    </div>
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
                                    <h4 className="mb-3 Share-title">
                                        Trip Contacts
                                    </h4>
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
                                    <h4 className="mb-3 Share-title">
                                        Itinerary:{' '}
                                        {moment(trip.dateStart).format('MMM DD')}{' '}
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

const date_sort_asc = function (date1, date2) {
    if (date1 > date2) return 1
    if (date1 < date2) return -1
    return 0
}

const ShareDocument = ({ doc }) => {
    const linkImg = getIcon(doc.link)
    return (
        <div className="col-md-12 p-4 my-3 Document">
            <div className="row d-flex justify-content-between px-3">
                <span className="Document-title">{doc.name}</span>
            </div>
            <p className="Document-description my-4">{doc.description}</p>
            <div className="row">
                <div className="col-md-12">
                    <div className="Document-card">
                        <div className="row no-gutters">
                            <div className="Document-icon d-flex justify-content-center align-items-center">
                                <a
                                    className="hover"
                                    href={doc.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                        src={linkImg}
                                        alt=""
                                        className='Document-image'
                                        style={{ objectFit: 'cover' }}
                                    />
                                </a>
                            </div>
                            <div className="card-body d-flex flex-column justify-content-around">
                                <a
                                    className="hover"
                                    href={doc.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className='Document-open-text pr-1'>
                                        Download
                                        </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ShareContact = ({ contact }) => {
    let { image, name, phone, email } = contact
    return (
        <div className="animated fadeIn my-4">
            <div className="row align-items-center justify-content-around" style={{
                background: '#FFFFFF',
                boxShadow: '0 0 50px 0 rgba(0,0,0,0.10)',
                borderRadius: '8px',
                border: 'none',
                height: '100px',
                width: '280px'
            }}>
                <div className="row justify-content-around align-items-center">
                    <Image src={image} diameter="48px" name={name} />
                    <div className="d-flex flex-column pl-4">
                        {name && <span className="Contact-name">{name}</span>}
                        {phone && <span className="Contact-info">{phone}</span>}
                        {email && <span className="Contact-info">{email}</span>}
                    </div>
                </div>
            </div>
        </div>
    )
}

const ShareCover = ({ trip, source }) => {
    return (
        <div
            className="row d-flex flex-column justify-content-between p-4"
            style={{
                backgroundImage: `url(${trip.image})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                height: '20vh'
            }}
        >   {source === 'preview' && <a href={`/trips/${trip._id}/edit`}>
            <span
                className={`badge badge-secondary badge-pill text-uppercase hover d-flex align-items-center justify-content-center`}
                style={{
                    fontWeight: '500',
                    fontFamily: 'roboto',
                    fontSize: '12px',
                    padding: '.5rem .8rem',
                    width: '118px',
                    color: '#FFFFFF'
                }}
            >
                EXIT PREVIEW
                    <i class="material-icons pl-2" style={{ color: '#FFFFFF', fontSize: '16px' }}>
                    cancel
                    </i>
            </span></a >}

        </div >
    )
}

const ShareTripDate = ({ tripDate }) => {

    let { name, date, type } = tripDate
    let icon

    switch (type) {
        case 'TRAVEL':
            icon = <i class="material-icons d-flex justify-content-center align-items-center TripDate-Icon" style={{ backgroundColor: '#29CB97' }}>card_travel</i>
            break
        case 'PAPERWORK':
            icon = <i class="material-icons d-flex justify-content-center align-items-center TripDate-Icon" style={{ backgroundColor: '#FEC400' }}>folder_open</i>
            break
        case 'MONEY':
            icon = <i class="material-icons d-flex justify-content-center align-items-center TripDate-Icon" style={{ backgroundColor: '#B558F6' }}>attach_money</i>
            break
        case 'OTHER':
            icon = <i class="material-icons d-flex justify-content-center align-items-center TripDate-Icon" style={{ backgroundColor: '#FFABAA' }}>calendar_today</i>
            break
        default:
            icon = <i class="material-icons d-flex justify-content-center align-items-center TripDate-Icon" style={{ backgroundColor: '#FFABAA' }}>calendar_today</i>
            break
    }

    const dateWithoutTimeorTZ = date.split('T')[0]

    return (
        <div className="row py-3 align-items-center justify-content-between px-2">
            <div className="d-flex align-items-center justify-content-between">
                {icon}
                <div className="d-flex flex-column justify-content-center align-items-start ml-4">
                    <span className="" style={{
                        fontFamily: 'Roboto',
                        fontSize: '14px',
                        color: '#31394D',
                        letterSpacing: 0
                    }}>{name}</span>
                    <span className="" style={{
                        fontFamily: 'Roboto',
                        fontSize: '12px',
                        color: '#748AA1',
                        letterSpacing: 0
                    }}>{moment(dateWithoutTimeorTZ).format('MMMM DD')}</span>
                </div>
            </div>
        </div>
    )
}

const Navigation = ({ tripId, source }) => (
    <div className='d-flex Share-Nav left-shadow-sharp'>
        <NavLink
            activeClassName="Share-Nav-active"
            className='btn Share-Nav-btn Share-Nav-left'
            to={`/trips/${tripId}/${source}/itinerary`}
            name={`/trips/${tripId}/${source}/itinerary`}
        >
            <i class="material-icons-outlined px-4" style={{ color: '#000000', fontSize: '28px' }}>calendar_today</i>
        </NavLink>

        <NavLink
            activeClassName="Share-Nav-active"
            className='btn Share-Nav-btn Share-Nav-center'
            to={`/trips/${tripId}/${source}/documents`}
            name={`/trips/${tripId}/${source}/documents`}
        >
            <i class="material-icons-outlined px-4" style={{ color: '#000000', fontSize: '28px' }}>info</i>
        </NavLink>
        <NavLink
            activeClassName="Share-Nav-active"
            className='btn Share-Nav-btn Share-Nav-right'
            to={`/trips/${tripId}/${source}/contacts`}
            name={`/trips/${tripId}/${source}/contacts`}
        >
            <i class="material-icons-outlined px-4" style={{ color: '#000000', fontSize: '28px' }} > person</i>
        </NavLink>
    </div>
)
