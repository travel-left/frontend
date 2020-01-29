import React, { Component } from 'react'
import { apiCall } from '../util/api'
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
import ShareCover from './ShareCover'
import { withStyles } from '@material-ui/core'

function initializeReactGA() {
    ReactGA.initialize('UA-145382520-1')
    ReactGA.pageview('/share')
}

const styles = theme => ({
    tabsContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    tabs: {
        backgroundColor: theme.palette.primary.main,
        borderRadius: theme.spacing(1),
        color: "white", width: theme.spacing(60),
        boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.4), 0px 2px 2px 0px rgba(0,0,0,0.2), 0px 1px 5px 0px rgba(0,0,0,0.22)',
        zIndex: 10,
        marginTop: theme.spacing(2)
    },
    tab: {
        fontSize: 10,
        fontWeight: 600
    },
    main: {
        padding: theme.spacing(2)
    },
    itinerary: {
        marginTop: theme.spacing(4)
    }
})

class Share extends Component {
    tripId = this.props.match.params.tripId
    source = this.props.match.path.includes('preview') ? 'preview' : 'share'

    state = {
        trip: {},
        route: 0,
        token: null
    }

    constructor(props) {
        super(props)
        if (process.env.NODE_ENV === 'production') {
            initializeReactGA()
        }
        this.getTripInfo()
        this.checkForRegistrationToken()
    }

    getTripInfo = async () => {
        let trip = await apiCall('get', `/api/trips/${this.tripId}/share`)

        let org = await apiCall('get', `/api/organization/${trip.coordinators[0].organization}/name`)
        trip.orgName = org.name
        this.setState({
            trip
        })
    }

    checkForRegistrationToken = async () => {
        //strange behavior where local storage returns null if not await'd 
        let token = await localStorage.getItem('travelerRegistrationId')
        this.setState({ token })
    }


    render() {
        const { trip, route } = this.state
        const { classes } = this.props

        return (
            <div >
                <ShareCover trip={trip} source={this.source} token={this.state.token} />
                <div className={classes.tabsContainer}>
                    <Tabs
                        value={route}
                        onChange={(e, route) => this.setState({ route })}
                        variant="fullWidth"
                        indicatorColor="secondary"
                        className={classes.tabs}
                    >
                        <Tab icon={<CalendarTodayIcon fontSize="large" />} label="ITINERARY" className={classes.tab} />
                        <Tab icon={<InfoIcon fontSize="large" />} label="INFO" className={classes.tab} />
                        <Tab icon={<PermContactCalendarIcon fontSize="large" />} label="CONTACTS" className={classes.tab} />
                    </Tabs>
                </div>
                <div className={classes.main}>
                    {route === 0 && (
                        <div className={classes.itinerary}>
                            {trip._id && <Itinerary
                                currentTrip={trip}
                                share={true}
                            />}
                        </div>
                    )
                    }
                    {route === 1 &&
                        <>
                            <TripDates tripId={this.tripId} dateStart={trip.dateStart} share={true} />
                            <Resources tripId={this.tripId} share={true} ></Resources>
                        </>
                    }
                    {route === 2 &&
                        <>
                            <Coordinators tripId={this.tripId} share={true}></Coordinators>
                            <Contacts tripId={this.tripId} share={true}></Contacts>
                        </>
                    }
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Share)
