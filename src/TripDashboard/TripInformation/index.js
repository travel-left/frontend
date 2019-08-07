import React, { Component } from 'react'
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
        const updatedTrip = await apiCall(
            'put',
            `/api/trips/${this.currentTripId}`,
            updateObject
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
        const updatedCoordinator = await apiCall(
            'put',
            `/api/coordinators/${coordinatorId}`,
            updateObject
        )
        const { coordinators } = this.state
        const index = coordinators.findIndex(d => d._id === coordinatorId)
        coordinators[index] = updatedCoordinator
        this.setState({ coordinators })
    }

    createCoordinator = async coordinator => {
        coordinator.organization = this.props.currentUser.organization
        coordinator.password = 'goofyberry453'
        const createdCoordinator = await apiCall('post', '/api/auth/signup', {
            coordinator,
            tripId: this.currentTripId
        })
        const { coordinators } = this.state
        coordinators.push(createdCoordinator)
        this.setState({ coordinators })
    }

    deleteCoordinator = async coordinatorId => {
        await apiCall(
            'delete',
            `/api/trips/${this.currentTripId}/coordinators/${coordinatorId}`
        )
        const { coordinators } = this.state
        const newCoordinators = coordinators.filter(
            d => d._id !== coordinatorId
        )
        this.setState({ coordinators: newCoordinators })
    }

    getContacts = async () => {
        let contacts = await apiCall(
            'get',
            `/api/trips/${this.currentTripId}/contacts`
        )
        this.setState({ contacts })
    }

    updateContact = async (contactId, updateObject) => {
        const updatedContact = await apiCall(
            'put',
            `/api/trips/${this.currentTripId}/contacts/${contactId}`,
            updateObject
        )
        const { contacts } = this.state
        const index = contacts.findIndex(d => d._id === contactId)
        contacts[index] = updatedContact
        this.setState({ contacts })
    }

    createContact = async newContact => {
        const createdContact = await apiCall(
            'post',
            `/api/trips/${this.currentTripId}/contacts`,
            newContact
        )
        const { contacts } = this.state
        contacts.push(createdContact)
        this.setState({ contacts })
    }

    deleteContact = async contactId => {
        await apiCall(
            'delete',
            `/api/trips/${this.currentTripId}/contacts/${contactId}`
        )
        const { contacts } = this.state
        const newContacts = contacts.filter(d => d._id !== contactId)
        this.setState({ contacts: newContacts })
    }

    getDocuments = async () => {
        let documents = await apiCall(
            'get',
            `/api/trips/${this.currentTripId}/documents`
        )
        this.setState({ documents })
    }

    updateDocument = async (documentId, updateObject) => {
        const updatedDocument = await apiCall(
            'put',
            `/api/trips/${this.currentTripId}/documents/${documentId}`,
            updateObject
        )
        const { documents } = this.state
        const index = documents.findIndex(d => d._id === documentId)
        documents[index] = updatedDocument
        this.setState({ documents })
    }

    createDocument = async doc => {
        const createdDocument = await apiCall(
            'post',
            `/api/trips/${this.currentTripId}/documents`,
            doc
        )
        const { documents } = this.state
        this.setState({ documents: [...documents, createdDocument] })
    }

    deleteDocument = async docId => {
        await apiCall(
            'delete',
            `/api/trips/${this.currentTripId}/documents/${docId}`
        )
        const { documents } = this.state
        const newDocuments = documents.filter(d => d._id !== docId)
        this.setState({ documents: newDocuments })
    }

    getTripDates = async () => {
        let tripDates = await apiCall(
            'get',
            `/api/trips/${this.currentTripId}/tripDates`
        )
        this.setState({ tripDates })
    }

    updateTripDate = async (tripDateId, updateObject) => {
        const updatedTripDate = await apiCall(
            'put',
            `/api/trips/${this.currentTripId}/tripDates/${tripDateId}`,
            updateObject
        )
        const { tripDates } = this.state
        const index = tripDates.findIndex(d => d._id === tripDateId)
        tripDates[index] = updatedTripDate
        this.setState({ tripDates })
    }

    createTripDate = async tripDate => {
        tripDate.type.toUpperCase()
        const createdTD = await apiCall(
            'post',
            `/api/trips/${this.currentTripId}/tripDates`,
            tripDate
        )
        const { tripDates } = this.state
        tripDates.push(createdTD)
        this.setState({ tripDates })
    }

    deleteTripDate = async tripDateId => {
        await apiCall(
            'delete',
            `/api/trips/${this.currentTripId}/tripDates/${tripDateId}`
        )
        const { tripDates } = this.state
        const newTripDates = tripDates.filter(d => d._id !== tripDateId)
        this.setState({ tripDates: newTripDates })
    }

    render() {
        let { name, _id } = this.props.currentTrip
        let { coordinators, contacts, documents, tripDates } = this.state
        tripDates = tripDates.sort((f, s) => (f.date > s.date ? 1 : -1))
        let coordinatorList =
            coordinators.length > 0 ? (
                <ItemList
                    C={Coordinator}
                    items={coordinators}
                    update={this.updateCoordinator}
                    remove={this.deleteCoordinator}
                    otherProps={{ currentUserId: this.props.currentUser._id }}
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
                <div className="row">
                    <div className="col-md-12 mt-4 ml-3">
                        <h4 className="mb-3">Trip Name</h4>
                        <div
                            className="pb-2"
                            style={{
                                borderBottom: '1.5px solid black',
                                width: '20vw'
                            }}
                        >
                            <h3 className="text-primary my-1 d-inline">
                                {' '}
                                {name}{' '}
                            </h3>
                            <TripNameForm
                                name={name}
                                submit={this.updateTrip}
                            />
                        </div>
                        <h4 className="mt-5 mb-4">Trip Coordinators</h4>
                        <div className="row">
                            {coordinatorList}
                            <div className="col-md-4 my-2 animated fadeIn d-flex justify-content-center align-items-center">
                                <CreateCoordinatorForm
                                    submit={this.createCoordinator}
                                />
                            </div>
                        </div>
                        <h4 className="mt-5 mb-4">Trip Dates</h4>

                        <div className="row">
                            <LeftCard>
                                {tripDatesList}
                                <div className="mt-4 animated fadeIn d-flex flex-row justify-content-start align-items-center">
                                    <CreateTripDateForm
                                        formType="add"
                                        submit={this.createTripDate}
                                    />
                                </div>
                            </LeftCard>
                        </div>
                        <div className="row mt-5 mb-4">
                            <div className="col-md-3">
                                <h4 className="">Trip Documents</h4>
                            </div>
                            <div className="col-md-6" />

                            <div className="col-md-3">
                                <CreateDocumentForm
                                    submit={this.createDocument}
                                />
                            </div>
                        </div>
                        <div className="row mx-5">{documentsList}</div>
                        <h4 className="mt-5 mb-4">Trip Contacts</h4>
                        <div className="row mb-5">
                            {contactsList}
                            <div className="col-md-4 my-2 animated fadeIn d-flex justify-content-center align-items-center">
                                <CreateContactForm
                                    submit={this.createContact}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
