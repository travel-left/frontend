import React, { Component } from 'react'
import { apiCall } from '../../util/api'
import { connect } from 'react-redux'
import TripList from './TripList'
import TripInfo from './TripInfo'
import { setCurrentTrip } from '../../util/redux/actions/trip'
import SideNavItem from '../../util/otherComponents/SideNavItem'
import ReactGA from 'react-ga'
import TripsListHeader from './TripsListHeader'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import { withRouter } from 'react-router-dom'
import LeftModal from '../../util/otherComponents/LeftModal'
import CreateTripForm from '../../Forms/CreateTripForm'
import Snack from '../../util/otherComponents/Snack'
import { withStyles } from '@material-ui/core'
import styles from '../../styles/tripsHome'

function initializeReactGA() {
    ReactGA.initialize('UA-145382520-1')
    ReactGA.pageview('/tripsdashboard')
}

class Trips extends Component {
    state = {
        trips: [],
        filteredTrips: [],
        filter: `ALL ${this.props.currentUser.words ? this.props.currentUser.words.whatPlural.toUpperCase() : 'TRIPS'}`,
        selectedTrip: null,
        tripStatusCounts: {
            LEFT: 0,
            COMPLETED: 0,
            PLANNING: 0,
            PAST: 0,
            ARCHIVED: 0
        },
        snack: {
            show: false,
            variant: '',
            message: ''
        },
        isOpen: false,
    }

    constructor(props) {
        super(props)
        if (process.env.NODE_ENV === 'production') {
            initializeReactGA()
        }

        this.getAllTripsAndSetState()
    }

    closeSnack = () => (this.setState({ snack: { show: false } }))
    toggleModal = () => (this.setState(prevState => ({ isOpen: !prevState.isOpen })))

    getAllTripsAndSetState = async () => {
        const trips = await apiCall('get', '/api/trips')
        this.setStatusesAndState(trips)
    }

    setStatusesAndState = trips => {
        const { tripStatusCounts } = this.state
        if (trips && trips.length) {
            for (const trip of trips) {
                if (trip.status) {
                    tripStatusCounts[trip.status]++
                }
            }
        }

        this.filterTripsAndSetState(trips, `ALL ${this.props.currentUser.words ? this.props.currentUser.words.whatPlural.toUpperCase() : 'TRIPS'}`, {
            tripStatusCounts
        })
    }

    editTrip = async tripId => {
        const [selectedTrip] = this.state.trips.filter(t => t._id === tripId)

        await this.props.setCurrentTrip(selectedTrip)
        this.props.history.push(`/trips/${tripId}/edit`)
    }

    addTrip = async trip => {
        const { trips, tripStatusCounts } = this.state

        try {
            const createdTrip = await apiCall('post', '/api/trips', trip)
            this.setState({
                snack: {
                    show: true,
                    variant: 'success',
                    message: 'Success!'
                }
            })
            trips.push(createdTrip)
            tripStatusCounts[createdTrip.status]++
            this.filterTripsAndSetState(trips, `ALL ${this.props.currentUser.words ? this.props.currentUser.words.whatPlural.toUpperCase() : 'TRIPS'}`, {
                selectedTrip: createdTrip,
                tripStatusCounts
            })
        } catch (err) {
            this.setState({
                snack: {
                    show: true,
                    variant: 'error',
                    message: 'An error occurred.'
                }
            })
        }
    }

    copyTrip = async tripId => {
        const { trips, tripStatusCounts } = this.state
        const { currentUser } = this.props

        try {
            const createdTrip = await apiCall('post', `/api/trips/${tripId}/copy`)
            this.setState({
                snack: {
                    show: true,
                    variant: 'success',
                    message: `Duplicated ${currentUser.words ? currentUser.words.what : 'Trip'}!`
                }
            })
            trips.push(createdTrip)
            tripStatusCounts[createdTrip.status]++
            this.filterTripsAndSetState(trips, `ALL ${currentUser.words ? currentUser.words.whatPlural.toUpperCase() : 'TRIPS'}`, {
                selectedTrip: createdTrip,
                tripStatusCounts
            })
        } catch (err) {
            this.setState({
                snack: {
                    show: true,
                    variant: 'error',
                    message: 'An error occurred.'
                }
            })
        }
    }

    archiveTrip = async id => {
        const { trips, filter } = this.state
        try {
            const updatedTrip = await apiCall('put', `/api/trips/${id}`, {
                status: 'ARCHIVED'
            }, true)
            const updatedIndex = trips.findIndex(e => e._id.toString() === id)
            const { status } = trips[updatedIndex]
            trips[updatedIndex] = updatedTrip
            const newStatusCount = { ...this.state.tripStatusCounts }
            newStatusCount.ARCHIVED++
            newStatusCount[status]--
            this.setState({ trips })
            this.filterTripsAndSetState(trips, filter, {
                tripStatusCounts: newStatusCount
            })
            this.setState({
                snack: {
                    show: true,
                    variant: 'success',
                    message: 'Success!'
                }
            })
        } catch (err) {
            this.setState({
                snack: {
                    show: true,
                    variant: 'error',
                    message: 'An error occurred.'
                }
            })
        }
    }

    setSelectedTrip = tripId => {
        let newSelection = this.state.trips.filter(t => t._id === tripId)[0]
        this.setState({
            selectedTrip: newSelection
        })
    }

    onSideNavClick = tripFilter => {
        this.filterTripsAndSetState(this.state.trips, tripFilter.toUpperCase())
    }

    filterTripsAndSetState = (trips, filter, state = {}) => {
        const filteredTrips =
            filter === `ALL ${this.props.currentUser.words ? this.props.currentUser.words.whatPlural.toUpperCase() : 'TRIPS'}`
                ? trips.filter(t => t.status !== 'ARCHIVED')
                : trips.filter(t => t.status === filter)
        this.setState({
            trips,
            filteredTrips,
            filter,
            ...state,
            selectedTrip: state.selectedTrip
                ? state.selectedTrip
                : filteredTrips[0]
        })
    }

    render() {
        const {
            filteredTrips,
            selectedTrip,
            trips,
            tripStatusCounts,
            filter
        } = this.state

        const { classes, currentUser } = this.props

        const showTrips = filteredTrips.length > 0

        const tripList = showTrips ? (
            <TripList
                trips={filteredTrips}
                setSelectedTrip={this.setSelectedTrip}
                doubleClick={this.editTrip}
            />
        ) : null

        return (
            <Grid container>
                <Grid item xs={12} md={2}>
                    <div className={classes.leftGutter} >
                        <Button
                            variant="contained"
                            color="primary"
                            id="new-trip-button"
                            onClick={() => this.setState({ isOpen: true })}
                            className={classes.buttonBox}
                        >
                            ADD NEW {currentUser.words ? currentUser.words.what.toUpperCase() : 'TRIP'}
                        </Button>
                        {this.state.isOpen && <LeftModal
                            isOpen={this.state.isOpen}
                            title={`Add new ${currentUser.words ? currentUser.words.toLowerCase() : 'trip'}`}
                            toggleModal={this.toggleModal}
                            form={CreateTripForm}
                            submit={this.addTrip}
                        />}
                    </div>
                    <List component="div" className={classes.tripFilters}>
                        <SideNavItem
                            text={`All ${currentUser.words ? currentUser.words.whatPlural : 'Trips'}`}
                            total={trips.length - tripStatusCounts.ARCHIVED}
                            active={filter === `ALL ${currentUser.words ? currentUser.words.whatPlural.toUpperCase() : 'TRIPS'}`}
                            handleClick={this.onSideNavClick}
                        />
                        <SideNavItem
                            text="Planning"
                            total={tripStatusCounts.PLANNING}
                            active={filter === 'PLANNING'}
                            handleClick={this.onSideNavClick}
                            divider
                        />
                        <SideNavItem
                            text="Completed"
                            total={tripStatusCounts.COMPLETED}
                            active={filter === 'COMPLETED'}
                            handleClick={this.onSideNavClick}
                            divider
                        />
                        <SideNavItem
                            text="LEFT"
                            total={tripStatusCounts.LEFT}
                            active={filter === 'LEFT'}
                            handleClick={this.onSideNavClick}
                            divider
                        />
                        <SideNavItem
                            text="Past"
                            total={tripStatusCounts.PAST}
                            active={filter === 'PAST'}
                            handleClick={this.onSideNavClick}
                            divider
                        />
                        <SideNavItem
                            text="Archived"
                            total={tripStatusCounts.ARCHIVED}
                            active={filter === 'ARCHIVED'}
                            handleClick={this.onSideNavClick}
                            divider
                        />
                    </List>
                </Grid>
                <Grid container xs={12} md={10}>
                    <Grid item xs={12} md={8}>
                        <div className={classes.main}>
                            <TripsListHeader />
                            {tripList}
                        </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        {selectedTrip && <TripInfo
                            trip={selectedTrip}
                            edit={this.editTrip}
                            duplicateTrip={this.copyTrip}
                            archiveTrip={this.archiveTrip}
                        />}
                    </Grid>
                </Grid>
                {this.state.snack.show && <Snack open={this.state.snack.show} message={this.state.snack.message} variant={this.state.snack.variant} onClose={this.closeSnack}></Snack>}
            </Grid >
        )
    }
}

const mapStatetoProps = state => {
    return {
        currentUser: state.currentUser
    }
}

export default withRouter(connect(
    mapStatetoProps,
    { setCurrentTrip }
)(withStyles(styles, { withTheme: true })(Trips)))
