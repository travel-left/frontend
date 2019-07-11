import React, { Component } from 'react'
import { apiCall } from '../../../util/api'
import TripCoordinator from './Coordinators/TripCoordinator'
import TripNameForm from './TripNameForm'
import NewCoordinatorForm from './Coordinators/NewCoordinatorForm'
import NewContactForm from './Contacts/NewContactForm'
import ContactList from './Contacts/ContactList'
import DocumentList from './Documents/DocumentList'
import AddDocument from './Documents/AddDocument'
import TripDatesList from './TripDates/TripDateList'
import AddTripDate from './TripDates/AddTripDate'
import Alert from '../../Other/Alert'
import { connect } from 'react-redux'
import { handleSetCurrentTrip } from '../../../store/actions/trip'
import { connect } from 'react-redux'

class TripInformation extends Component {
    currentTripId = this.props.currentTrip._id

    currentCohortId = this.props.currentCohort._id

    state = {
        coordinators: [],
        contacts: [],
        documents: [],
        tripDates: [],
        showAlert: false
    }

    constructor(props) {
        super(props)
        this.getShowAlertAndSetState()
        this.getCoordinators()
        this.getContacts()
        this.getDocuments()
        this.getTripDates()
    }

    getShowAlertAndSetState = async () => {
        const { _id } = this.props.currentUser.user
        const coordinator = await apiCall('get', `/api/coordinators/${_id}`)
        if (coordinator.showAlerts.tripDashboard === 'true') {
            this.setState({
                showAlert: true
            })
        }
    }

    closeAlert = async () => {
        const { _id } = this.props.currentUser.user
        await apiCall('put', `/api/coordinators/${_id}`, { showAlerts: { tripDashboard: false } })
        this.setState({
            showAlert: false
        })
    }

    updateTrip = async updateObject => {
        await apiCall('put', `/api/trips/${this.currentTripId}`, updateObject)
        let updatedTrip = await apiCall('get', `/api/trips/${this.currentTripId}`)
        this.props.handleSetCurrentTrip(updatedTrip)
    }

    // addCohort = async cohort => {
    //     await apiCall('post', `/api/trips/${this.props.currentTrip._id}/cohorts`, cohort)
    //     let cohorts = await apiCall('get', `/api/trips/${this.props.currentTrip._id}/cohorts`)
    //     this.props.setCurrentTrip({ ...this.props.currentTrip, cohorts })
    // }

    getCoordinators = async () => {
        let coordinators = await apiCall('get', `/api/trips/${this.currentTripId}/coordinators`)
        this.setState({ coordinators })
    }

    updateCoordinator = async (coordinatorId, updateObject) => {
        updateObject.firstName = updateObject.name.split(' ')[0]
        updateObject.lastName = updateObject.name.split(' ')[1]
        delete updateObject.name
        await apiCall('put', `/api/coordinators/${coordinatorId}`, updateObject)
        this.getCoordinators()
    }

    createCoordinator = async coordinator => {
        coordinator.firstName = coordinator.name.split(' ')[0]
        coordinator.lastName = coordinator.name.split(' ')[1]
        coordinator.organizationId = this.props.currentUser.user.organizationId
        coordinator.trip = this.props.currentTrip._id
        coordinator.password = 'password'
        delete coordinator.name

        await apiCall('post', '/api/auth/coordinators/signup', coordinator)
        this.getCoordinators()
    }

    getContacts = async () => {
        let contacts = await apiCall('get', `/api/trips/${this.currentTripId}/cohorts/${this.currentCohortId}/contacts`)
        this.setState({ contacts })
    }

    updateContact = async (contactId, updateObject) => {
        updateObject.firstName = updateObject.name.split(' ')[0]
        updateObject.lastName = updateObject.name.split(' ')[1]
        delete updateObject.name
        await apiCall('put', `/api/trips/${this.currentTripId}/cohorts/${this.currentCohortId}/contacts/${contactId}`, updateObject)
        this.getContacts()
    }

    createContact = async newContact => {
        newContact.firstName = newContact.name.split(' ')[0]
        newContact.lastName = newContact.name.split(' ')[1]
        await apiCall('post', `/api/trips/${this.currentTripId}/cohorts/${this.currentCohortId}/contacts`, newContact)
        this.getContacts()
    }

    getDocuments = async () => {
        let documents = await apiCall('get', `/api/trips/${this.currentTripId}/cohorts/${this.currentCohortId}/documents`)
        this.setState({ documents })
    }

    updateDocument = async (documentId, updateObject) => {
        await apiCall('put', `/api/trips/${this.currentTripId}/cohorts/${this.currentCohortId}/documents/${documentId}`, updateObject)
        this.getDocuments()
    }

    createDocument = doc => {
        apiCall('post', `/api/trips/${this.currentTripId}/cohorts/${this.currentCohortId}/documents`, doc)
            .then(() => this.getDocuments())
            .catch(err => {
                console.error(err)
            })
    }

    getTripDates = async () => {
        let tripDates = await apiCall('get', `/api/trips/${this.currentTripId}/tripDates`)
        this.setState({ tripDates })
    }

    updateTripDate = async (tripDateId, updateObject) => {
        await apiCall('put', `/api/trips/${this.currentTripId}/tripDates/${tripDateId}`, updateObject)
        this.getTripDates()
    }

    createTripDate = tripDate => {
        tripDate.type.toUpperCase()

        apiCall('post', `/api/trips/${this.currentTripId}/tripDates`, tripDate)
            .then(() => this.getTripDates())
            .catch(err => {
                console.error(err)
            })
    }

    render() {
        let { name } = this.props.currentTrip
        let { showAlert, coordinators, contacts, documents, tripDates } = this.state
        let coordinatorList = coordinators.length > 0 ? coordinators.map(c => <TripCoordinator key={c._id} coordinator={c} updateCoordinator={this.updateCoordinator} />) : null
        let contactsList = contacts.length > 0 ? <ContactList contacts={contacts} updateContact={this.updateContact} /> : null
        let documentsList = documents.length > 0 ? <DocumentList documents={documents} updateDocument={this.updateDocument} /> : null
        let tripDatesList = tripDates.length > 0 ? <TripDatesList tripDates={tripDates} updateTripDate={this.updateTripDate} /> : null
        let alert = showAlert ? <Alert text="This is your trip dashboard.  Here you can manage coordinators, documents, dates, and emergency contacts." closeAlert={this.closeAlert} /> : null

        return (
            <div className="mt-3 mx-3">
                <div className="row">
                    <div className="col-md-12 d-none d-md-block">{alert}</div>
                </div>
                <div className="row">
                    <div className="col-md-12 mt-4 ml-3">
                        <h4 className="text-dark">Trip Name</h4>
                        <h3 className="text-primary my-1 d-inline"> {name} </h3>
                        <TripNameForm name={name} submit={this.updateTrip} />
                        <h4 className="text-dark my-3">Trip Coordinators</h4>
                        <NewCoordinatorForm submit={this.createCoordinator} />
                        <div className="row">{coordinatorList}</div>
                        <h4 className="text-dark my-3">Trip Dates</h4>
                        <div className="row">
                            <div class="card shadow border-0 mb-3 col-md-4 mx-4">
                                {tripDatesList}
                                <AddTripDate submit={this.createTripDate} />
                            </div>
                        </div>
                        <h4 className="text-dark my-3">Trip Documents</h4>
                        <AddDocument submit={this.createDocument} />
                        <div className="row">{documentsList}</div>
                        <h4 className="text-dark my-3">Emergency Contacts</h4>
                        <NewContactForm submit={this.createContact} />
                        <div className="row">{contactsList}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    null,
    { handleSetCurrentTrip }
)(TripInformation)
