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
        await apiCall('put', `/api/coordinators/${coordinatorId}`, updateObject)
        this.getCoordinators()
    }

    createCoordinator = async coordinator => {
        coordinator.organization = this.props.currentUser.organization
        coordinator.password = 'goofyberry453'
        await apiCall('post', '/api/auth/signup', { coordinator, tripId: this.currentTripId })
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
                        <h4 className="mb-3">Trip Name</h4>
                        <div className='pb-2' style={{ borderBottom: '1.5px solid black', width: '20vw' }}>
                            <h3 className="text-primary my-1 d-inline"> {name} </h3>
                            <TripNameForm name={name} submit={this.updateTrip} />
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
                            <div className="col-md-6">

                            </div>

                            <div className='col-md-3'>
                                <CreateDocumentForm submit={this.createDocument} />
                            </div>
                        </div>
                        <div className="row mx-5">{documentsList}</div>
                        <h4 className="mt-5 mb-4">Trip Contacts</h4>
                        <div className="row mb-5">
                            {contactsList}
                            <div className="col-md-4 my-2 animated fadeIn d-flex justify-content-center align-items-center">
                                <CreateContactForm submit={this.createContact} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
