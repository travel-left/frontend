import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setCurrentTrip } from '../../../store/actions/trip'
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

class TripInformation extends Component {

    state = {
        coordinators: [],
        contacts: [],
        documents: [],
        tripDates: []
    }
    constructor(props) {
        super(props)

        this.getCoordinators()
        this.getContacts()
        this.getDocuments()
        this.getTripDates()
    }

    updateTrip = async updateObject => {
        await apiCall('put', `/api/trips/${this.props.currentTrip._id}`, updateObject)
        let updatedTrip = await apiCall('get', `/api/trips/${this.props.currentTrip._id}`)
        this.props.setCurrentTrip({ ...updatedTrip })
    }

    // addCohort = async cohort => {
    //     await apiCall('post', `/api/trips/${this.props.currentTrip._id}/cohorts`, cohort)
    //     let cohorts = await apiCall('get', `/api/trips/${this.props.currentTrip._id}/cohorts`)
    //     this.props.setCurrentTrip({ ...this.props.currentTrip, cohorts })
    // }

    getCoordinators = async () => {
        let coordinators = await apiCall('get', `/api/trips/${this.props.currentTrip._id}/coordinators`)
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

        await apiCall('post', `/api/auth/coordinators/signup`, coordinator)
        this.getCoordinators()
    }

    getContacts = async () => {
        let contacts = await apiCall('get', `/api/trips/${this.props.currentTrip._id}/cohorts/${this.props.currentTrip.cohorts[0]._id}/contacts`)
        this.setState({ contacts })
    }

    updateContact = async (contactId, updateObject) => {
        updateObject.firstName = updateObject.name.split(' ')[0]
        updateObject.lastName = updateObject.name.split(' ')[1]
        delete updateObject.name
        await apiCall('put', `/api/trips/${this.props.currentTrip._id}/cohorts/${this.props.currentTrip.cohorts[0]._id}/contacts/${contactId}`, updateObject)
        this.getContacts()
    }

    createContact = async newContact => {
        newContact.firstName = newContact.name.split(' ')[0]
        newContact.lastName = newContact.name.split(' ')[1]
        await apiCall('post', `/api/trips/${this.props.currentTrip._id}/cohorts/${this.props.currentTrip.cohorts[0]._id}/contacts`, newContact)
        this.getContacts()
    }

    getDocuments = async () => {
        let documents = await apiCall('get', `/api/trips/${this.props.currentTrip._id}/cohorts/${this.props.currentTrip.cohorts[0]._id}/documents`)
        this.setState({ documents })
    }

    updateDocument = async (documentId, updateObject) => {
        await apiCall('put', `/api/trips/${this.props.currentTrip._id}/cohorts/${this.props.currentTrip.cohorts[0]._id}/documents/${documentId}`, updateObject)
        this.getDocuments()
    }

    createDocument = doc => {
        let tripId = this.props.currentTrip._id
        let cohortId = this.props.currentTrip.cohorts[0]._id

        apiCall('post', `/api/trips/${tripId}/cohorts/${cohortId}/documents`, doc)
            .then(() => this.getDocuments())
            .catch(err => {
                console.log(err)
            })
    }

    getTripDates = async () => {
        let tripDates = await apiCall('get', `/api/trips/${this.props.currentTrip._id}/tripDates`)
        this.setState({ tripDates })
    }

    updateTripDate = async (tripDateId, updateObject) => {
        await apiCall('put', `/api/trips/${this.props.currentTrip._id}/tripDates/${tripDateId}`, updateObject)
        this.getTripDates()
    }

    createTripDate = tripDate => {
        let tripId = this.props.currentTrip._id
        tripDate.type.toUpperCase()

        apiCall('post', `/api/trips/${tripId}/tripDates`, tripDate)
            .then(() => this.getTripDates())
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        let { name, description, status, image, dateStart, dateEnd } = this.props.currentTrip
        let coordinatorList = this.state.coordinators.length > 0 ? this.state.coordinators.map(c => <TripCoordinator coordinator={c} updateCoordinator={this.updateCoordinator}></TripCoordinator>) : null
        let contactsList = this.state.contacts.length > 0 ? <ContactList contacts={this.state.contacts} updateContact={this.updateContact} /> : null
        let documentsList = this.state.documents.length > 0 ? <DocumentList documents={this.state.documents} updateDocument={this.updateDocument} /> : null
        let tripDatesList = this.state.tripDates.length > 0 ? <TripDatesList tripDates={this.state.tripDates} updateTripDate={this.updateTripDate} /> : null

        return (
            <div className='mt-3 mx-3'>
                <div className="row">
                    <div className="col-md-12 mt-4 ml-3">
                        <h4 className='text-dark'>Trip Name</h4>
                        <h3 className='text-primary my-1 d-inline'> {name} </h3>
                        <TripNameForm name={name} submit={this.updateTrip}></TripNameForm>
                        <h4 className='text-dark my-3'>Trip Coordinators</h4>
                        <NewCoordinatorForm submit={this.createCoordinator} />
                        <div className="row">
                            {coordinatorList}
                        </div>
                        <h4 className='text-dark my-3'>Trip Dates</h4>
                        <div className="row">
                            <div class="card shadow border-0 mb-3 col-md-4 mx-4">
                                {tripDatesList}
                                <AddTripDate submit={this.createTripDate} />
                            </div>
                        </div>
                        <h4 className='text-dark my-3'>Trip Documents</h4>
                        <AddDocument submit={this.createDocument} />
                        <div className="row">
                            {documentsList}
                        </div>
                        <h4 className='text-dark my-3'>Emergency Contacts</h4>
                        <NewContactForm submit={this.createContact}></NewContactForm>
                        <div className="row">
                            {contactsList}
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        currentTrip: state.currentTrip
    }
}

export default connect(
    mapStateToProps,
    { setCurrentTrip }
)(TripInformation)
