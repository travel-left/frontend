import React, { Component } from 'react'
import TripNameForm from './TripNameForm'
import Coordinator from './Coordinators/Coordinator'
import CreateCoordinatorForm from './Coordinators/CreateCoordinatorForm'
import AddFromOrgForm from './Coordinators/AddFromOrgForm'
import TripDate from './TripDates/TripDate'
import CreateTripDateForm from './TripDates/CreateTripDateForm'
import Document from './Documents/Document'
import CreateDocumentForm from './Documents/CreateDocumentForm'
import Contact from './Contacts/Contact'
import CreateContactForm from './Contacts/CreateContactForm'
import ItemList from '../../util/ItemList'
import LeftCard from '../../util/LeftCard'
import { apiCall } from '../../util/api'
import './TripInfo.css'
import ReactGA from 'react-ga'
ReactGA.pageview('/tripinformation')

export default class TripInformation extends Component {
    currentTripId = this.props.currentTrip._id
    currentUserId = this.props.currentUser._id

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
        const createdCoordinator = await apiCall(
            'post',
            `/api/trips/${this.currentTripId}/coordinators`,
            coordinator
        )
        const { coordinators } = this.state
        coordinators.push(createdCoordinator)
        this.setState({ coordinators })
    }

    addFromOrg = async coordinatorIds => {
        const newCoordinators = await apiCall(
            'post',
            `/api/trips/${this.currentTripId}/coordinators/arrayofids`,
            coordinatorIds
        )
        let { coordinators } = this.state
        coordinators = [...coordinators, ...newCoordinators]
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
        let { name } = this.props.currentTrip
        let { coordinators, contacts, documents, tripDates } = this.state
        tripDates = tripDates.sort((f, s) => (f.date > s.date ? 1 : -1))
        let coordinatorList =
            coordinators.length > 0 ? (
                <ItemList
                    C={Coordinator}
                    currentUserId={this.currentUserId}
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

        return (
            <div className="col-md-12">
                <TripNameSection name={name} update={this.updateTrip} />
                <TripCoordinatorSection
                    list={coordinatorList}
                    create={this.createCoordinator}
                    addFromOrg={this.addFromOrg}
                    onTrip={coordinators}
                />
                <TripDateSection
                    list={tripDatesList}
                    create={this.createTripDate}
                />
                <TripDocumentSection
                    list={documentsList}
                    create={this.createDocument}
                />
                <TripContactsSection
                    list={contactsList}
                    create={this.createContact}
                />
            </div>
        )
    }
}

const TripNameSection = ({ name, update }) => {
    return (
        <div className="mb-4 col-12">
            <h4 className="mb-3 TripInfo-heading">Trip Name</h4>
            <div
                className="pb-2"
                style={{
                    borderBottom: '2px solid #475561',
                    width: '35vw'
                }}
            >
                {' '}
                <div className="d-flex align-items-center">
                    <TripNameForm name={name} submit={update} />
                </div>
            </div>
        </div>
    )
}

const TripCoordinatorSection = ({ list, create, addFromOrg, onTrip }) => {
    return (
        <TripSection name={'Trip Coordinators'}>
            <div className="row">
                {list}
                <div className="col-md-4 my-2 d-flex flex-column justify-content-around align-items-center">
                    <CreateCoordinatorForm submit={create} />
                    <AddFromOrgForm submit={addFromOrg} onTrip={onTrip} />
                </div>
            </div>
        </TripSection>
    )
}

const TripDateSection = ({ list, create }) => {
    return (
        <TripSection name="Trip Dates">
            <div className="row">
                <LeftCard>
                    {list}
                    <div className="mt-3 d-flex flex-row justify-content-center align-items-center">
                        <CreateTripDateForm formType="add" submit={create} />
                    </div>
                </LeftCard>
            </div>
        </TripSection>
    )
}

const TripDocumentSection = ({ list, create }) => {
    let header = (
        <div>
            Trip Documents{' '}
            <span className="pl-4">
                {' '}
                <CreateDocumentForm submit={create} />
            </span>
        </div>
    )
    return (
        <TripSection name={header}>
            <div className="row">{list}</div>
        </TripSection>
    )
}

const TripContactsSection = ({ list, create }) => {
    return (
        <TripSection name="Trip Contacts">
            <div className="row">
                {list}
                <div className="col-md-4 my-2 d-flex justify-content-center align-items-center">
                    <CreateContactForm submit={create} />
                </div>
            </div>
        </TripSection>
    )
}

const TripSection = props => (
    <div className="col-12" style={{ marginTop: '5.7rem' }}>
        <h4 className="mb-3 TripInfo-heading">{props.name}</h4>
        <div className="ml-3">{props.children}</div>
    </div>
)
