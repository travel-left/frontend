import React, { Component } from 'react'
import { apiCall } from '../../util/api'
import { connect } from 'react-redux'
import PaymentAlert from '../../util/otherComponents/PaymentAlert'
import TripList from './TripList'
import TripInfo from './TripInfo'
import { setCurrentTrip } from '../../util/redux/actions/trip'
import AddTrip from './AddTrip'
import SideNavItem from '../../util/otherComponents/SideNavItem'
import ReactGA from 'react-ga'
import Dropzone from 'react-dropzone'
import TripsListHeader from './TripsListHeader'
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
        }
    }

    constructor(props) {
        super(props)
        if (process.env.NODE_ENV === 'production') {
            initializeReactGA()
        }

        this.getAllTripsAndSetState()
    }

    uploadFiles = async () => {
        let files = [...this.state.files]
        for await (let file of files) {
            let formData = new FormData()
            formData.append('file', file)
            await apiCall('post', '/api/fileUploads/unAuth', formData)
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
        const createdTrip = await apiCall('post', '/api/trips', trip)
        const { trips, filter, tripStatusCounts } = this.state
        trips.push(createdTrip)
        tripStatusCounts[createdTrip.status]++
        this.filterTripsAndSetState(trips, 'ALL TRIPS', {
            selectedTrip: createdTrip,
            tripStatusCounts
        })
    }

    archiveTrip = async id => {
        const { trips, filter } = this.state
        const updatedTrip = await apiCall('put', `/api/trips/${id}`, {
            status: 'ARCHIVED'
        })
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
    }

    setSelectedTrip = tripId => {
        let newSelection = this.state.trips.filter(t => t._id === tripId)[0]
        this.setState({
            selectedTrip: newSelection
        })
    }

    onSideNavClick = e => {
        e.preventDefault()
        const filter = e.target.name.toUpperCase()
        this.filterTripsAndSetState(this.state.trips, filter)
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
                duplicateTrip={this.addTrip}
                archiveTrip={this.archiveTrip}
            />
        ) : null

        let files = this.state.files
            ? this.state.files.map(file => <p>{file.name || file}</p>)
            : null

        return (
            <div className="row">
                <div className="col-md-2 px-0" style={{
                    background: '#FFFFFF',
                    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.3)',
                    borderRadius: '3px'
                }}>
                    <div className="px-0 py-5 d-flex justify-content-center">
                        <AddTrip submit={this.addTrip} />
                    </div>
                    <div className="d-none d-sm-flex flex-column" >
                        <ul className="list-group col px-0 ">
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
                            />
                            <SideNavItem
                                text="Completed"
                                total={tripStatusCounts.COMPLETED}
                                active={filter === 'COMPLETED'}
                                handleClick={this.onSideNavClick}
                            />
                            <SideNavItem
                                text="LEFT"
                                total={tripStatusCounts.LEFT}
                                active={filter === 'LEFT'}
                                handleClick={this.onSideNavClick}
                            />
                            <SideNavItem
                                text="Past"
                                total={tripStatusCounts.PAST}
                                active={filter === 'PAST'}
                                handleClick={this.onSideNavClick}
                            />
                            <SideNavItem
                                text="Archived"
                                total={tripStatusCounts.ARCHIVED}
                                active={filter === 'ARCHIVED'}
                                handleClick={this.onSideNavClick}
                            />
                        </ul>
                        <div className="py-4 px-3">
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
                            </Dropzone>
                            <div className="row justify-content-center align-items-center">
                                {files && (
                                    <button
                                        className="btn btn-primary"
                                        onClick={this.uploadFiles}
                                    >
                                        UPLOAD
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-10 mt-3">
                    <div className="row">
                        <div className="col-md-8 px-0 px-md-3">
                            {/* <PaymentAlert user={this.props.currentUser}></PaymentAlert> */}
                            <TripsListHeader />
                            {tripList}
                        </div>
                        <div className="col-md-4 px-0">
                            {tripInfo}
                        </div>
                    </div>
                </div>
            </div>
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
