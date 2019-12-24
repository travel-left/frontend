import React, { Component } from 'react'
import { apiCall } from '../util/api'
import Moment from 'react-moment'
import Typography from '@material-ui/core/Typography'
import ReactGA from 'react-ga'
import TripDates from '../TripDashboard/TripInformation/TripDates/TripDates'
import Resources from '../TripDashboard/TripInformation/Documents/Resources'
import Contacts from '../TripDashboard/TripInformation/Contacts/Contacts'
import Coordinators from '../TripDashboard/TripInformation/Coordinators/Coordinators'
import Itinerary from '../TripDashboard/Itinerary/index'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'
import InfoIcon from '@material-ui/icons/Info'
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Button from '@material-ui/core/Button'
import { withRouter } from 'react-router-dom';

function initializeReactGA() {
    ReactGA.initialize('UA-145382520-1')
    ReactGA.pageview('/share')
}

class Share extends Component {
    tripId = this.props.match.params.tripId
    source = this.props.match.path.includes('preview') ? 'preview' : 'share'

    state = {
        trip: {},
        route: 0
    }

    constructor(props) {
        super(props)
        if (process.env.NODE_ENV === 'production') {
            initializeReactGA()
        }
        this.getTripInfo()
    }

    getTripInfo = async () => {
        let trip = await apiCall('get', `/api/trips/${this.tripId}/share`)

        let org = await apiCall('get', `/api/organization/${trip.coordinators[0].organization}/name`)
        trip.orgName = org.name
        this.setState({
            trip
        })
    }

    render() {
        let { trip, route } = this.state

        return (
            <div className="container-fluid">
                <ShareCover trip={trip} source={this.source} />
                <div className="d-flex justify-content-center">
                    <Tabs
                        value={route}
                        onChange={(e, route) => this.setState({ route })}
                        variant="fullWidth"
                        indicatorColor="secondary"
                        style={{
                            backgroundColor: '#0A58CE', borderRadius: 8, color: "white", width: 480,
                            boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.4), 0px 2px 2px 0px rgba(0,0,0,0.2), 0px 1px 5px 0px rgba(0,0,0,0.22)',
                            zIndex: 10,
                            marginTop: 16
                        }}
                    >
                        <Tab icon={<CalendarTodayIcon fontSize="large" />} label="ITINERARY" style={{ fontSize: 10, fontWeight: 600 }} />
                        <Tab icon={<InfoIcon fontSize="large" />} label="INFO" style={{ fontSize: 10, fontWeight: 600 }} />
                        <Tab icon={<PermContactCalendarIcon fontSize="large" />} label="CONTACTS" style={{ fontSize: 10, fontWeight: 600 }} />
                    </Tabs>
                </div>
                {route === 0 &&
                    <div className="container" style={{ marginTop: 64 }}>
                        {trip._id && <Itinerary
                            currentTrip={trip}
                            share={true}
                        />}
                    </div>
                }
                {route === 1 &&
                    <div className="container">
                        <TripDates tripId={this.tripId} dateStart={trip.dateStart} share={true} />
                        <Resources tripId={this.tripId} share={true} ></Resources>
                    </div>
                }
                {route === 2 &&
                    <div className="container">
                        <Coordinators tripId={this.tripId} share={true}></Coordinators>
                        <Contacts tripId={this.tripId} share={true}></Contacts>
                    </div>
                }
            </div>
        )
    }
}

export default Share


const ShareCover = ({ trip, source }) => {
    return (
        <div
            className="d-flex flex-column justify-content-between Cover-image"
            style={{
                backgroundImage: `url(${trip.image})`,
                height: '183px',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                borderRadius: '3px',
                padding: 16,
                marginTop: 16
            }}
        >
            <div className="d-flex justify-content-between align-items-start" >
                <Typography variant="h1" style={{ color: 'white', display: 'inline' }}>{trip.orgName}</Typography>
                {trip.travelerRegistrationForm && trip.travelerRegistrationForm.hasPublish && <Button size="large" type="submit" variant="contained" color="primary" style={{ width: '180px', height: '50px' }} onClick={() => {
                    var win = window.open(`${process.env.REACT_APP_BASE_URL}/trips/${trip._id}/register`, '_blank');
                    win.focus()
                }}>
                    Register By{'\xa0'}<Moment date={trip.travelerRegistrationForm && trip.travelerRegistrationForm.dueDate.split('T')[0]} format="MMM DD" />
                </Button>}
            </div>
            <div className="d-flex justify-content-between align-items-end" >
                {source === 'preview' && <a href={`/trips/${trip._id}/edit`}>
                    <span
                        className={`badge badge-secondary badge-pill text-uppercase hover d-flex align-items-center justify-content-center`}
                        style={{
                            fontWeight: '500',
                            fontFamily: 'roboto',
                            fontSize: '12px',
                            padding: '.5rem .8rem',
                            width: '118px',
                            color: '#FFFFFF',
                            marginTop: 16
                        }}
                    >
                        EXIT PREVIEW
                    <i class="material-icons pl-2" style={{ color: '#FFFFFF', fontSize: '16px' }}> cancel</i>
                    </span></a >}
                <Typography variant="h1" style={{ color: 'white', display: 'inline' }}>{trip.name}</Typography>
                <div >
                    <Typography variant="h1" style={{ color: 'white', display: 'inline' }}>
                        <Moment date={trip.dateStart && trip.dateStart.split('T')[0]} format="MMMM DD" />{' - '}
                    </Typography>
                    <Typography variant="h1" style={{ color: 'white', display: 'inline' }}>
                        <Moment date={trip.dateEnd && trip.dateEnd.split('T')[0]} format="MMMM DD" />
                    </Typography>
                </div>
            </div>
        </div >
    )
}