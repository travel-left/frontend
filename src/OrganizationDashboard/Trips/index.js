import React, { Component } from 'react'
import { apiCall } from '../../util/api'
import { connect } from 'react-redux'
import PaymentAlert from '../../util/otherComponents/PaymentAlert'
import TripList from './TripList'
import TripInfo from './TripInfo'
import { setCurrentTrip } from '../../util/redux/actions/trip'
import SideNavItem from '../../util/otherComponents/SideNavItem'
import ReactGA from 'react-ga'
import Dropzone from 'react-dropzone'
import TripsListHeader from './TripsListHeader'
import ChangeEmailAlert from '../../util/otherComponents/ChangeEmailAlert'
import Snack from '../../util/Snack'
import Button from '@material-ui/core/Button'
import CreateTripModalForm from './CreateTripModalForm'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List'

function initializeReactGA() {
    ReactGA.initialize('UA-145382520-1')
    ReactGA.pageview('/tripsdashboard')
}


class Trips extends Component {
    state = {
        trips: [],
        filteredTrips: [],
        filter: 'All Trips',
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

    uploadFiles = async () => {
        let files = [...this.state.files]
        for await (let file of files) {
            let formData = new FormData()
            formData.append('file', file)
            await apiCall('post', '/api/fileUploads/unAuth', formData, true)
        }
        this.setState({ files: ['Succesfully Uploaded'] })
    }

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

        this.filterTripsAndSetState(trips, 'ALL TRIPS', {
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
        trip.dateStart = trip.dates.startDate
        trip.dateEnd = trip.dates.endDate
        delete trip.dates
        try {
            const createdTrip = await apiCall('post', '/api/trips', trip, true)
            this.setState({
                snack: {
                    show: true,
                    variant: 'success',
                    message: 'Success!'
                }
            })
            trips.push(createdTrip)
            tripStatusCounts[createdTrip.status]++
            this.filterTripsAndSetState(trips, 'ALL TRIPS', {
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

    copyTrip = async trip => {
        const { trips, tripStatusCounts } = this.state

        try {
            const createdTrip = await apiCall('post', '/api/trips', trip, true)
            this.setState({
                snack: {
                    show: true,
                    variant: 'success',
                    message: 'Success!'
                }
            })
            trips.push(createdTrip)
            tripStatusCounts[createdTrip.status]++
            this.filterTripsAndSetState(trips, 'ALL TRIPS', {
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
            filter === 'ALL TRIPS'
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
        let {
            filteredTrips,
            selectedTrip,
            trips,
            tripStatusCounts,
            filter
        } = this.state

        const showTrips = filteredTrips.length > 0

        let tripList = showTrips ? (
            <TripList
                trips={filteredTrips}
                setSelectedTrip={this.setSelectedTrip}
                doubleClick={this.editTrip}
            />
        ) : null

        let tripInfo = selectedTrip ? (
            <TripInfo
                trip={selectedTrip}
                edit={this.editTrip}
                duplicateTrip={this.copyTrip}
                archiveTrip={this.archiveTrip}
            />
        ) : null

        let files = this.state.files
            ? this.state.files.map(file => <p>{file.name || file}</p>)
            : null

        return (
            <Grid container spacing={2} style={{ marginTop: 8 }}>
                <Grid item xs={12} md={2}>
                    <div className="px-0 py-5 d-flex justify-content-center">
                        <Button size="large" variant="contained" color="primary" style={{ width: '180px', height: '50px' }} onClick={() => this.setState({ isOpen: true })}>
                            ADD NEW TRIP
                        </Button>
                        {this.state.isOpen && <CreateTripModalForm
                            isOpen={this.state.isOpen}
                            title='Add New Trip'
                            toggleModal={this.toggleModal}
                            submit={this.addTrip}
                        />}
                    </div>
                    <List component="div" style={{ paddingTop: 0, paddingBottom: 0 }}>
                        <SideNavItem
                            text="All Trips"
                            total={trips.length - tripStatusCounts.ARCHIVED}
                            active={filter === 'ALL TRIPS'}
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
                    {/* <div className="py-4 px-3">
                            <Dropzone
                                onDrop={acceptedFiles =>
                                    this.setState({
                                        files: acceptedFiles
                                    })
                                }
                            >
                                {({ getRootProps, getInputProps }) => (
                                    <section>
                                        <div
                                            {...getRootProps()}
                                            className="d-flex flex-column jusity-content-center align-items-center hover"
                                        >
                                            <input {...getInputProps()} />
                                            <p className="text-center">
                                                Drag files or click here to
                                                upload to the LEFT cloud.
                                            </p>
                                            {files}
                                        </div>
                                    </section>
                                )}
                            </Dropzone> */}
                    {/* <div className="row justify-content-center align-items-center">
                                {files && (
                                    <button
                                        className="btn btn-primary"
                                        onClick={this.uploadFiles}
                                    >
                                        UPLOAD
                                    </button>
                                )}
                            </div>
                        </div> */}

                </Grid>
                <Grid container spacing={2} xs={12} md={10} style={{ paddingLeft: 8 }}>
                    <Grid item xs={12} md={8}>
                        {this.props.currentUser.cc.length > 4 ? <PaymentAlert user={this.props.currentUser}></PaymentAlert> : null}
                        <TripsListHeader />
                        {tripList}
                    </Grid>
                    <Grid item xs={12} md={4} style={{ paddingRight: 0 }}>
                        {(this.props.currentUser.needsPasswordChanged || this.props.currentUser.needsEmailChanged) && <ChangeEmailAlert user={this.props.currentUser}></ChangeEmailAlert>}
                        {tripInfo}
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

export default connect(
    mapStatetoProps,
    { setCurrentTrip }
)(Trips)
