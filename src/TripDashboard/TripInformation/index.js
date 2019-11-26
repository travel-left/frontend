import React, { Component } from 'react'
import TripNameForm from './TripNameForm'
import Coordinator from './Coordinators/Coordinator'
import AddCoordinatorToTripForm from './Coordinators/AddCoordinatorToTripForm'
import TripDate from './TripDates/TripDate'
import CreateTripDateForm from './TripDates/CreateTripDateForm'
import Contact from './Contacts/Contact'
import CreateContactForm from './Contacts/CreateContactForm'
import ItemList from '../../util/ItemList'
import { apiCall } from '../../util/api'
import './TripInfo.css'
import ReactGA from 'react-ga'
import Snack from '../../util/Snack'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import LeftModal from '../../util/otherComponents/LeftModal'
import Fab from '@material-ui/core/Fab'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import moment from 'moment'
import Resources from './Documents/Resources';

function initializeReactGA() {
    ReactGA.initialize('UA-145382520-1')
    ReactGA.pageview('/tripinformation')
}

export default class TripInformation extends Component {
    currentTripId = this.props.currentTrip._id
    currentUserId = this.props.currentUser._id

    state = {
        coordinators: [],
        coordinatorsFromOrg: [],
        contacts: [],
        tripDates: [],
        snack: {
            show: false,
            variant: '',
            message: ''
        },
        editTripNameModal: false,
        addNewCoordinator: false,
        addNewTripDate: false,
        editTripDate: false
    }

    constructor(props) {
        super(props)
        if (process.env.NODE_ENV === 'production') {
            initializeReactGA()
        }
        this.getCoordinators()
        this.getCoordinatorsFromOrg()
        this.getContacts()
        this.getTripDates()
    }

    closeSnack = () => (this.setState({ snack: { show: false } }))
    closeModal = modal => (this.setState({ [modal]: false }))
    openModal = modal => (this.setState({ [modal]: true }))

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

    getCoordinatorsFromOrg = async () => {
        let coordinatorsFromOrg = await apiCall(
            'get',
            `/api/trips/${this.currentTripId}/coordinators/org`
        )
        this.setState({ coordinatorsFromOrg })
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

    createCoordinator = async data => {
        if (data.fromOrg) {
            try {
                const coordinators = await apiCall(
                    'post',
                    `/api/trips/${this.currentTripId}/coordinators/add`,
                    data.coordinatorsToAdd.map(c => c._id)
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
        } else {
            let coordinator = data
            try {
                coordinator.organization = this.props.currentUser.organization
                const createdCoordinator = await apiCall(
                    'post',
                    `/api/trips/${this.currentTripId}/coordinators`,
                    coordinator
                )
                this.setState({
                    snack: {
                        show: true,
                        variant: 'success',
                        message: 'Success!'
                    }
                })

                this.setState(prevState => ({ coordinators: [...prevState.coordinators, createdCoordinator] }))

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

            this.getCoordinators()
            this.getCoordinatorsFromOrg()
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

    getTripDates = async () => {
        let tripDates = await apiCall(
            'get',
            `/api/trips/${this.currentTripId}/tripDates`
        )
        this.setState({ tripDates })
    }

    updateTripDate = async (tripDateId, updateObject) => {
        updateObject.type = updateObject.category.value.toUpperCase()
        try {
            const updatedTripDate = await apiCall(
                'put',
                `/api/trips/${this.currentTripId}/tripDates/${tripDateId}`,
                updateObject
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
            tripDate.type = tripDate.category.value.toUpperCase()
            const createdTD = await apiCall(
                'post',
                `/api/trips/${this.currentTripId}/tripDates`,
                tripDate
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
        let { name, dateStart } = this.props.currentTrip
        let { coordinators, contacts, documents, tripDates, coordinatorsFromOrg } = this.state
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
            <div className="" style={{ paddingTop: 16, paddingLeft: 16 }}>
                <div className="" style={{ marginBottom: 32 }}>
                    <Typography variant="h2">
                        Trip Name
                    </Typography>
                    <h3 className="text-primary TripInfo-name hover" onClick={() => this.openModal('editTripNameModal')} style={{ marginTop: 24 }}> {name} </h3>
                    {this.state.editTripNameModal && <LeftModal
                        isOpen={this.state.editTripNameModal}
                        toggleModal={() => this.closeModal('editTripNameModal')}
                        title='Change trip name'
                        submit={this.updateTrip}
                        form={TripNameForm}
                        name={name}
                    />}
                    <Divider style={{ width: '30vw', backgroundColor: '#475561', height: 2 }}></Divider>
                </div>
                <TripCoordinatorSection
                    list={coordinatorList}
                    create={this.createCoordinator}
                    addNewCoordinator={this.state.addNewCoordinator}
                    coordinators={coordinators}
                    coordinatorsFromOrg={coordinatorsFromOrg}
                    openModal={this.openModal}
                    closeModal={this.closeModal}
                />
                <TripDateSection
                    list={tripDatesList}
                    create={this.createTripDate}
                    openModal={this.openModal}
                    closeModal={this.closeModal}
                    addNewTripDate={this.state.addNewTripDate}
                    dateStart={dateStart}
                />
                <Resources tripId={this.currentTripId}></Resources>
                <TripContactsSection
                    list={contactsList}
                    create={this.createContact}
                    openModal={this.openModal}
                    closeModal={this.closeModal}
                />
                {this.state.snack.show && <Snack open={this.state.snack.show} message={this.state.snack.message} variant={this.state.snack.variant} onClose={this.closeSnack}></Snack>}
            </div>
        )
    }
}

const TripCoordinatorSection = ({ list, create, coordinators, coordinatorsFromOrg, addNewCoordinator, openModal, closeModal }) => {
    return (
        <TripSection name='Trip Coordinators'>
            <Grid container spacing={2}>
                {list}
                <Grid item  >
                    <Grid item className='d-flex justify-content-around align-items-center animated fadeIn' style={{ height: 100, width: 420, marginTop: 16, marginRight: 32, marginBottom: 16 }}>
                        <Fab onClick={() => openModal('addNewCoordinator')} color="secondary" variant="extended" style={{ width: 96, height: 32, fontSize: 12, fontWeight: 600, color: 'white' }}>
                            Add New
                        </Fab>
                    </Grid>
                </Grid>
                {
                    addNewCoordinator && <LeftModal
                        isOpen={addNewCoordinator}
                        toggleModal={() => closeModal('addNewCoordinator')}
                        title='Add a coordinator to this trip'
                        coordinators={coordinators}
                        coordinatorsFromOrg={coordinatorsFromOrg.filter(c => !coordinators.map(d => d._id).includes(c._id))}
                        submit={create}
                        form={AddCoordinatorToTripForm}
                    />
                }
            </Grid>
        </TripSection>
    )
}

const TripDateSection = ({ list, create, openModal, closeModal, addNewTripDate, dateStart }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6} lg={4}>
                <TripSection name="Trip Dates">
                    <Card>
                        {list}
                        <div className='d-flex justify-content-center' style={{ paddingBottom: 16 }}>
                            <Fab onClick={() => openModal('addNewTripDate')} color="secondary" variant="extended" style={{ width: 96, height: 32, fontSize: 12, fontWeight: 600, color: 'white' }}>
                                Add New
                            </Fab>
                            {
                                addNewTripDate && <LeftModal
                                    isOpen={addNewTripDate}
                                    toggleModal={() => closeModal('addNewTripDate')}
                                    title='Add a trip date'
                                    submit={create}
                                    date={moment(dateStart).format('MM-DD-YYYY')}
                                    form={CreateTripDateForm}
                                />
                            }
                        </div>
                    </Card>
                </TripSection>
            </Grid>
        </Grid>
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
    <div className="" style={{ marginTop: 32 }}>
        <Typography variant="h2" style={{ marginBottom: 16 }}>
            {props.name}
        </Typography>
        {props.children}
    </div>
)
