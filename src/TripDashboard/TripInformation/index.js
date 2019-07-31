import React, { Component } from 'react'
// import Alert from '../../util/otherComponents/Alert'
import TripNameForm from './TripNameForm'
import Coordinator from './Coordinators/Coordinator'
import CreateCoordinatorForm from './Coordinators/CreateCoordinatorForm'
import TripDate from './TripDates/TripDate'
import CreateTripDateForm from './TripDates/CreateTripDateForm'
import Document from './Documents/Document'
import CreateDocumentForm from './Documents/CreateDocumentForm'
import Contact from './Contacts/Contact'
import CreateContactForm from './Contacts/CreateContactForm'
import ItemList from '../../util/ItemList'
import LeftCard from '../../util/LeftCard'
import { apiCall } from '../../util/api'

export default class TripInformation extends Component {
    currentTripId = this.props.currentTrip._id

    state = {
        coordinators: [],
        contacts: [],
        documents: [],
        tripDates: []
        // showAlert: false
    }

    constructor(props) {
        super(props)
        // this.getShowAlertAndSetState()
        this.getCoordinators()
        this.getContacts()
        this.getDocuments()
        this.getTripDates()
    }

    // getShowAlertAndSetState = async () => {
    //     const { _id } = this.props.currentUser
    //     const coordinator = await apiCall('get', `/api/coordinators/${_id}`)
    //     if (coordinator.showAlerts.tripDashboard === 'true') {
    //         this.setState({
    //             showAlert: true
    //         })
    //     }
    // }

    // closeAlert = async () => {
    //     const { _id } = this.props.currentUser
    //     await apiCall('put', `/api/coordinators/${_id}`, { showAlerts: { tripDashboard: false } })
    //     this.setState({
    //         showAlert: false
    //     })
    // }

    updateTrip = async updateObject => {
        await apiCall('put', `/api/trips/${this.currentTripId}`, updateObject)
        let updatedTrip = await apiCall(
            'get',
            `/api/trips/${this.currentTripId}`
        )
        this.props.setCurrentTrip(updatedTrip)
    }

    getCoordinators = async () => {
        let coordinators = await apiCall(
            'get',
            `/api/trips/${this.currentTripId}/coordinators`
        )
        this.setState({ coordinators })
    }

    updateCoordinator = async (coordinatorId, updateObject) => {
        await apiCall('put', `/api/coordinators/${coordinatorId}`, updateObject)
        this.getCoordinators()
    }

    createCoordinator = async coordinator => {
        coordinator.organizationId = this.props.currentUser.organizationId
        coordinator.trip = this.props.currentTrip._id
        coordinator.password = 'password'

        await apiCall('post', '/api/auth/signup', coordinator)
        this.getCoordinators()
    }

    deleteCoordinator = async coordinatorId => {
        await apiCall(
            'put',
            `/api/trips/${this.currentTripId}/coordinators/${coordinatorId}`
        )
        this.getCoordinators()
    }

    getContacts = async () => {
        let contacts = await apiCall(
            'get',
            `/api/trips/${this.currentTripId}/contacts`
        )
        this.setState({ contacts })
    }

    updateContact = async (contactId, updateObject) => {
        await apiCall(
            'put',
            `/api/trips/${this.currentTripId}/contacts/${contactId}`,
            updateObject
        )
        this.getContacts()
    }

    createContact = async newContact => {
        await apiCall(
            'post',
            `/api/trips/${this.currentTripId}/contacts`,
            newContact
        )
        this.getContacts()
    }

    deleteContact = async contactId => {
        await apiCall(
            'delete',
            `/api/trips/${this.currentTripId}/contacts/${contactId}`
        )
        this.getContacts()
    }

    getDocuments = async () => {
        let documents = await apiCall(
            'get',
            `/api/trips/${this.currentTripId}/documents`
        )
        this.setState({ documents })
    }

    updateDocument = async (documentId, updateObject) => {
        await apiCall(
            'put',
            `/api/trips/${this.currentTripId}/documents/${documentId}`,
            updateObject
        )
        this.getDocuments()
    }

    createDocument = async doc => {
        await apiCall('post', `/api/documents`, doc)
        this.getDocuments()
    }

    deleteDocument = async docId => {
        await apiCall(
            'delete',
            `/api/trips/${this.currentTripId}/documents/${docId}`
        )
        this.getDocuments()
    }

    getTripDates = async () => {
        let tripDates = await apiCall(
            'get',
            `/api/trips/${this.currentTripId}/tripDates`
        )
        this.setState({ tripDates })
    }

    updateTripDate = async (tripDateId, updateObject) => {
        await apiCall(
            'put',
            `/api/trips/${this.currentTripId}/tripDates/${tripDateId}`,
            updateObject
        )
        this.getTripDates()
    }

    createTripDate = async tripDate => {
        tripDate.type.toUpperCase()
        await apiCall(
            'post',
            `/api/trips/${this.currentTripId}/tripDates`,
            tripDate
        )
        this.getTripDates()
    }

    deleteTripDate = async tripDateId => {
        await apiCall(
            'delete',
            `/api/trips/${this.currentTripId}/tripDates/${tripDateId}`
        )
        this.getTripDates()
    }

    render() {
        let { name } = this.props.currentTrip
        let { coordinators, contacts, documents, tripDates } = this.state
        let coordinatorList =
            coordinators.length > 0 ? (
                <ItemList
                    C={Coordinator}
                    items={coordinators}
                    update={this.updateCoordinator}
                    remove={this.deleteCoordinator}
                />
            ) : null
        let contactsList =
            contacts.length > 0 ? (
                <ItemList
                    C={Contact}
                    items={contacts}
                    update={this.updateContact}
                    remove={this.deleteContact}
                />
            ) : null
        let documentsList =
            documents.length > 0 ? (
                <ItemList
                    C={Document}
                    items={documents}
                    update={this.updateDocument}
                    remove={this.deleteDocument}
                />
            ) : null
        let tripDatesList =
            tripDates.length > 0 ? (
                <ItemList
                    C={TripDate}
                    items={tripDates}
                    update={this.updateTripDate}
                    remove={this.deleteTripDate}
                />
            ) : null
        // let alert = showAlert ? <Alert text="This is your trip dashboard.  Here you can manage coordinators, documents, dates, and emergency contacts." closeAlert={this.closeAlert} /> : null

        return (
            <div className="mt-3 mx-3">
                {/* <div className="row">
                    <div className="col-md-12 d-none d-md-block">{alert}</div>
                </div> */}
                <div className="row">
                    <div className="col-md-12 mt-4 ml-3">
                        <h4 className="text-dark">Name</h4>
                        <h3 className="text-primary my-1 d-inline"> {name} </h3>
                        <TripNameForm name={name} submit={this.updateTrip} />
                        <h4 className="text-dark my-3">Coordinators</h4>
                        <CreateCoordinatorForm
                            submit={this.createCoordinator}
                        />
                        <div className="row">{coordinatorList}</div>
                        <h4 className="text-dark my-3">Dates</h4>
                        <CreateTripDateForm
                            formType="add"
                            submit={this.createTripDate}
                        />
                        <div className="row">
                            <LeftCard>{tripDatesList}</LeftCard>
                        </div>
                        <h4 className="text-dark my-3">Documents</h4>
                        <CreateDocumentForm submit={this.createDocument} />
                        <div className="row">{documentsList}</div>
                        <h4 className="text-dark my-3">Emergency Contacts</h4>
                        <CreateContactForm submit={this.createContact} />
                        <div className="row">{contactsList}</div>
                    </div>
                </div>
            </div>
        )
    }
}
