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
import { apiCall } from '../../util/api'
import './TripInfo.css'
import ReactGA from 'react-ga'
import Snack from '../../util/Snack'

function initializeReactGA() {
    ReactGA.initialize('UA-145382520-1')
    ReactGA.pageview('/tripinformation')
}

export default class TripInformation extends Component {
    currentTripId = this.props.currentTrip._id
    currentUserId = this.props.currentUser._id

    state = {
        coordinators: [],
        contacts: [],
        documents: [],
        tripDates: [],
        snack: {
            show: false,
            variant: '',
            message: ''
        }
    }

    constructor(props) {
        super(props)
        if (process.env.NODE_ENV === 'production') {
            initializeReactGA()
        }
        this.getCoordinators()
        this.getContacts()
        this.getDocuments()
        this.getTripDates()
    }

    closeSnack = () => (this.setState({ snack: { show: false } }))

    updateTrip = async updateObject => {
        try {
            const updatedTrip = await apiCall(
                'put',
                `/api/trips/${this.currentTripId}`,
                updateObject, true
            )
            this.setState({
                snack: {
                    show: true,
                    variant: 'success',
                    message: 'Success!'
                }
            })
            this.props.setCurrentTrip(updatedTrip)
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

    getCoordinators = async () => {
        let coordinators = await apiCall(
            'get',
            `/api/trips/${this.currentTripId}/coordinators`
        )
        this.setState({ coordinators })
    }

    updateCoordinator = async (coordinatorId, updateObject) => {
        try {
            const updatedCoordinator = await apiCall(
                'put',
                `/api/coordinators/${coordinatorId}`,
                updateObject, true
            )
            this.setState({
                snack: {
                    show: true,
                    variant: 'success',
                    message: 'Success!'
                }
            })
            const { coordinators } = this.state
            const index = coordinators.findIndex(d => d._id === coordinatorId)
            coordinators[index] = updatedCoordinator
            this.setState({ coordinators })

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

    createCoordinator = async coordinator => {
        try {
            coordinator.organization = this.props.currentUser.organization
            const createdCoordinator = await apiCall(
                'post',
                `/api/trips/${this.currentTripId}/coordinators`,
                coordinator,
                true
            )
            this.setState({
                snack: {
                    show: true,
                    variant: 'success',
                    message: 'Success!'
                }
            })
            const { coordinators } = this.state
            coordinators.push(createdCoordinator)
            this.setState({ coordinators })

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

    addFromOrg = async coordinatorIds => {
        try {
            const coordinators = await apiCall(
                'post',
                `/api/trips/${this.currentTripId}/coordinators/add`,
                coordinatorIds,
                true
            )
            this.setState({
                snack: {
                    show: true,
                    variant: 'success',
                    message: 'Success!'
                }
            })

            this.setState({ coordinators })
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

    deleteCoordinator = async coordinatorId => {
        try {
            await apiCall(
                'delete',
                `/api/trips/${this.currentTripId}/coordinators/${coordinatorId}`, true
            )
            this.setState({
                snack: {
                    show: true,
                    variant: 'success',
                    message: 'Success!'
                }
            })
            const { coordinators } = this.state
            const newCoordinators = coordinators.filter(
                d => d._id !== coordinatorId
            )
            this.setState({ coordinators: newCoordinators })
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

    getContacts = async () => {
        let contacts = await apiCall(
            'get',
            `/api/trips/${this.currentTripId}/contacts`
        )
        this.setState({ contacts })
    }

    updateContact = async (contactId, updateObject) => {
        try {
            const updatedContact = await apiCall(
                'put',
                `/api/trips/${this.currentTripId}/contacts/${contactId}`,
                updateObject, true
            )
            this.setState({
                snack: {
                    show: true,
                    variant: 'success',
                    message: 'Success!'
                }
            })
            const { contacts } = this.state
            const index = contacts.findIndex(d => d._id === contactId)
            contacts[index] = updatedContact
            this.setState({ contacts })
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

    createContact = async newContact => {
        try {
            const createdContact = await apiCall(
                'post',
                `/api/trips/${this.currentTripId}/contacts`,
                newContact,
                true
            )
            this.setState({
                snack: {
                    show: true,
                    variant: 'success',
                    message: 'Success!'
                }
            })
            const { contacts } = this.state
            contacts.push(createdContact)
            this.setState({ contacts })
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

    deleteContact = async contactId => {
        try {
            await apiCall(
                'delete',
                `/api/trips/${this.currentTripId}/contacts/${contactId}`, true
            )
            this.setState({
                snack: {
                    show: true,
                    variant: 'success',
                    message: 'Success!'
                }
            })
            const { contacts } = this.state
            const newContacts = contacts.filter(d => d._id !== contactId)
            this.setState({ contacts: newContacts })
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

    getDocuments = async () => {
        let documents = await apiCall(
            'get',
            `/api/trips/${this.currentTripId}/documents`
        )
        this.setState({ documents })
    }

    updateDocument = async (documentId, updateObject) => {
        try {
            const updatedDocument = await apiCall(
                'put',
                `/api/trips/${this.currentTripId}/documents/${documentId}`,
                updateObject, true
            )
            this.setState({
                snack: {
                    show: true,
                    variant: 'success',
                    message: 'Success!'
                }
            })
            const { documents } = this.state
            const index = documents.findIndex(d => d._id === documentId)
            documents[index] = updatedDocument
            this.setState({ documents })
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

    createDocument = async doc => {
        try {
            const createdDocument = await apiCall(
                'post',
                `/api/trips/${this.currentTripId}/documents`,
                doc,
                true
            )
            this.setState({
                snack: {
                    show: true,
                    variant: 'success',
                    message: 'Success!'
                }
            })
            const { documents } = this.state
            this.setState({ documents: [...documents, createdDocument] })
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

    deleteDocument = async docId => {
        try {
            await apiCall(
                'delete',
                `/api/trips/${this.currentTripId}/documents/${docId}`, true
            )
            this.setState({
                snack: {
                    show: true,
                    variant: 'success',
                    message: 'Success!'
                }
            })
            const { documents } = this.state
            const newDocuments = documents.filter(d => d._id !== docId)
            this.setState({ documents: newDocuments })
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

    getTripDates = async () => {
        let tripDates = await apiCall(
            'get',
            `/api/trips/${this.currentTripId}/tripDates`
        )
        this.setState({ tripDates })
    }

    updateTripDate = async (tripDateId, updateObject) => {
        try {
            const updatedTripDate = await apiCall(
                'put',
                `/api/trips/${this.currentTripId}/tripDates/${tripDateId}`,
                updateObject, true
            )
            this.setState({
                snack: {
                    show: true,
                    variant: 'success',
                    message: 'Success!'
                }
            })
            const { tripDates } = this.state
            const index = tripDates.findIndex(d => d._id === tripDateId)
            tripDates[index] = updatedTripDate
            this.setState({ tripDates })
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

    createTripDate = async tripDate => {
        try {
            tripDate.type.toUpperCase()
            const createdTD = await apiCall(
                'post',
                `/api/trips/${this.currentTripId}/tripDates`,
                tripDate,
                true
            )
            this.setState({
                snack: {
                    show: true,
                    variant: 'success',
                    message: 'Success!'
                }
            })
            const { tripDates } = this.state
            tripDates.push(createdTD)
            this.setState({ tripDates })
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

    deleteTripDate = async tripDateId => {
        try {
            await apiCall(
                'delete',
                `/api/trips/${this.currentTripId}/tripDates/${tripDateId}`, true
            )
            this.setState({
                snack: {
                    show: true,
                    variant: 'success',
                    message: 'Success!'
                }
            })
            const { tripDates } = this.state
            const newTripDates = tripDates.filter(d => d._id !== tripDateId)
            this.setState({ tripDates: newTripDates })
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
            <div className="col-md-12 mt-4 p-3">
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
                {this.state.snack.show && <Snack open={this.state.snack.show} message={this.state.snack.message} variant={this.state.snack.variant} onClose={this.closeSnack}></Snack>}
            </div>
        )
    }
}

const TripNameSection = ({ name, update }) => {
    return (
        <div className="mb-4 col-12 px-0">
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
        <TripSection name='Trip Coordinators'>
            <div className="row mx-0">
                {list}
                <div className="col-md-4 animated fadeIn my-4 mx-3">
                    <div className="row align-items-center justify-content-around" style={{
                        borderRadius: '8px',
                        border: 'none',
                        height: '100px',
                    }}>
                        <CreateCoordinatorForm submit={create} />
                        <AddFromOrgForm submit={addFromOrg} onTrip={onTrip} />
                    </div>
                </div>

            </div>
        </TripSection>
    )
}

const TripDateSection = ({ list, create }) => {
    return (
        <TripSection name="Trip Dates">
            <div className="mt-5 px-5 py-3" style={{
                background: '#FFFFFF',
                boxShadow: '0 0 50px 0 rgba(0,0,0,0.10)',
                borderRadius: '8px',
                border: 'none',
                minHeight: '100px',
                width: '340px'
            }}>
                {list}
                <div className="my-3 d-flex flex-row justify-content-start align-items-center">
                    <CreateTripDateForm formType="add" submit={create} />
                </div>
            </div>
        </TripSection>
    )
}

const TripDocumentSection = ({ list, create }) => {
    return (
        <div className="col-md-10 px-0">
            <div className="col-12" style={{ marginTop: '5.7rem' }}>
                <div className="row d-flex justify-content-between mb-4">
                    <h4 className="TripInfo-heading">Trip Resources</h4>
                    <CreateDocumentForm submit={create} />
                </div>
                <div className="row">{list}</div>
            </div>
            <div className="col-5"></div>
        </div>
    )
}

const TripContactsSection = ({ list, create }) => {
    return (
        <TripSection name="Trip Contacts">
            <div className="row mx-0">
                {list}
                <div className="col-md-4 my-4 pr-5 d-flex flex-row justify-content-around align-items-center">
                    <CreateContactForm submit={create} />
                </div>
            </div>
        </TripSection>
    )
}

const TripSection = props => (
    <div className="col-12 px-0" style={{ marginTop: '5.7rem' }}>
        <h4 className="mb-4 TripInfo-heading">{props.name}</h4>
        {props.children}
    </div>
)
