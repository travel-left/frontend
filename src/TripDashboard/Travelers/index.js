import React, { Component } from 'react'
import { apiCall } from '../../util/api'
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined'
import TravelerList from './TravelerList'
import TravelerInfo from './TravelerInfo'
import Checkbox from '@material-ui/core/Checkbox'
import './Travelers.css'
import ReactGA from 'react-ga'
import AddTravelerToTripFromOrgForm from '../../Forms/AddTravelerToTripFromOrgForm'
import Snack from '../../util/otherComponents/Snack'
import LeftMultipleSelect from '../../Forms/LeftMultipleSelect'
import { travelerStatus } from '../../util/globals'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import LeftModal from '../../util/otherComponents/LeftModal'
import ChangeTravelerStatusForm from '../../Forms/ChangeTravelerStatusForm'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CommunicateWithTravelersForm from '../../Forms/CommunicateWithTravelersForm'
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined'
import Button from '@material-ui/core/Button'
import ImportCsvForm from '../../Forms/ImportCsvForm'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import RegisterAccountModalForm from '../../Forms/RegisterAccountModalForm'
import CollectMoneyForm from '../../Forms/CollectMoneyForm'
import TravelerForm from '../../Forms/TravelerForm'
import TravelerRegistrationSettingsForm from '../../Forms/TravelerRegistrationSettingsForm'


function initializeReactGA() {
    ReactGA.initialize('UA-145382520-1')
    ReactGA.pageview('/managetravelers')
}

class Travelers extends Component {
    currentTripId = this.props.currentTrip ? this.props.currentTrip._id : null

    state = {
        allSelected: false,
        selectedTraveler: {},
        statusFiltersChecked: [],
        tripFilters: [],
        tripFiltersChecked: [],
        travelers: [],
        travelersNotOnTrip: [],
        addModalIsOpen: false,
        isChangeStatusModalOpen: false,
        isCommunicateModalOpen: false,
        isAddNewTravelerOrgModalOpen: false,
        isAddModalOpen: false,
        isCollectMoneyModalOpen: false,
        isRegisterAccountModalOpen: false,
        isRegistrationModalOpen: false,
        canRequestPayments: false,
        madeStripeAccountRequest: false,
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
        if (props.currentTrip) {
            this.getTravelers()
        }
        else {
            this.getOrgTravelers()
            this.getTrips()
        }

        this.getStripeAccount()
    }

    closeChangeStatusModal = () => (this.setState({ isChangeStatusModalOpen: false }))
    openChangeStatusModal = () => (this.setState({ isChangeStatusModalOpen: true }))
    closeCommunicateModal = () => (this.setState({ isCommunicateModalOpen: false }))
    openCommunicateModal = () => (this.setState({ isCommunicateModalOpen: true }))
    closeAddNewTravelerOrgModal = () => (this.setState({ isAddNewTravelerOrgModalOpen: false }))
    openAddNewTravelerOrgModal = () => (this.setState({ isAddNewTravelerOrgModalOpen: true }))
    closeAddModal = () => (this.setState({ isAddModalOpen: false }))
    openAddModal = () => (this.setState({ isAddModalOpen: true }))
    closeSnack = () => (this.setState({ snack: { show: false } }))
    toggleImportCsvModal = () => (this.setState(prevState => ({ isImportCsvOpen: !prevState.isImportCsvOpen })))
    toggleAddTravelerModal = () => (this.setState(prevState => ({ isAddTravelerOpen: !prevState.isAddTravelerOpen })))
    toggleCollectMoneyModal = () => {
        if (!this.state.canRequestPayments) {
            this.setState(prevState => ({ isRegisterAccountModalOpen: !prevState.isRegisterAccountModalOpen }))
        }
        else {
            this.setState(prevState => ({ isCollectMoneyModalOpen: !prevState.isCollectMoneyModalOpen }))
        }
    }
    toggleRegisterAccontModal = () => (this.setState(prevState => ({ isRegisterAccountModalOpen: !prevState.isRegisterAccountModalOpen })))
    toggleRegistrationModal = () => (this.setState(prevState => ({ isRegistrationModalOpen: !prevState.isRegistrationModalOpen })))

    getTravelers = async () => {
        if (!this.props.currentTrip) {
            this.getOrgTravelers()
        } else {
            const travelers = await apiCall('get', `/api/trips/${this.currentTripId}/travelers`)
            const travelersInOrg = await apiCall('get', `/api/organization/${this.props.currentUser.organization}/travelers`)
            const travelersNotOnTrip = travelersInOrgNotOnTrip(travelers, travelersInOrg)

            this.setState({
                travelers,
                selectedTraveler: travelers[0],
                travelersNotOnTrip,
                allSelected: false,
                statusFiltersChecked: []
            })
        }
    }

    getOrgTravelers = async () => {
        const travelers = await apiCall('get', `/api/organization/${this.props.currentUser.organization}/travelers`)
        this.setState({
            travelers,
            selectedTraveler: travelers[0],
            allSelected: false,
            statusFiltersChecked: []
        })
    }

    getTrips = async () => {
        let trips = await apiCall('get', '/api/trips')
        trips = trips.map(trip => trip.name)
        trips.push('none')
        this.setState({ tripFilters: trips, tripFiltersChecked: [] })
    }

    getStripeAccount = async () => {
        const account = await apiCall('GET', '/api/stripe/connect')

        this.setState({
            canRequestPayments: account.charges_enabled,
            madeStripeAccountRequest: true
        })
    }

    addTravelerToOrg = async traveler => {
        try {
            await apiCall(
                'post',
                '/api/organization/travelers',
                traveler
            )
            this.getTravelers()
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

    addTravelersCSV = async newTravelers => {
        try {
            await apiCall(
                'post',
                `/api/organization/travelers/csv`,
                newTravelers,
            )
            this.getTravelers()
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

    handleStatusFilterChange = statusFiltersChecked => {
        statusFiltersChecked = statusFiltersChecked.target.value

        this.setState(prevState => {
            return {
                statusFiltersChecked,
                travelers: prevState.travelers.map(t =>
                    statusFiltersChecked.includes(t.status) ?
                        { ...t, filtered: true }
                        : { ...t, filtered: false }
                ),
            }
        })
    }

    handleTripFilterChange = tripFiltersChecked => {
        tripFiltersChecked = tripFiltersChecked.target.value

        this.setState(prevState => {
            return {
                tripFiltersChecked,
                travelers: prevState.travelers.map(t =>
                    tripFiltersChecked.includes(t.trip) ?
                        { ...t, filtered: true }
                        : { ...t, filtered: false }
                ),
            }
        })
    }

    addTraveler = async data => {
        try {
            await apiCall(
                'post',
                `/api/trips/${this.currentTripId}/travelers`,
                data.selectedTravelers
            )
            this.setState({
                snack: {
                    show: true,
                    variant: 'success',
                    message: 'Success!'
                }
            })
            this.getTravelers()
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

    updateTraveler = async (travelerId, updateObject) => {
        try {
            await apiCall(
                'put',
                `/api/travelers/${travelerId}`,
                // `/api/trips/${this.currentTripId}/travelers/${travelerId}`,
                updateObject
            )
            this.setState({
                snack: {
                    show: true,
                    variant: 'success',
                    message: 'Success!'
                }
            })
            this.getTravelers()
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

    removeTraveler = async travelerId => {
        try {
            await apiCall(
                'delete',
                `/api/trips/${this.currentTripId}/travelers/${travelerId}`
            )
            this.setState({
                snack: {
                    show: true,
                    variant: 'success',
                    message: 'Success!'
                }
            })
            this.getTravelers()
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

    removeTravelerFromOrg = async travelerId => {
        try {
            await apiCall('delete', `/api/travelers/${travelerId}/org`, true)
            this.getTravelers()
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

    toggle = clickedTravelerId => {
        this.setState(prevState => {
            this.setState({
                travelers: prevState.travelers.map(t =>
                    t._id == clickedTravelerId ?
                        { ...t, selected: t.selected ? false : true }
                        : t
                ),
                allSelected: false
            })
        })
    }

    toggleAll = () => {
        this.setState(prevState => {
            const isSelectingAll = !prevState.allSelected

            if (isSelectingAll) {//if user is trying to select all
                return {
                    travelers: prevState.travelers.map(t => ({ ...t, selected: true })),
                    allSelected: true
                }
            } else {//if user is trying to deselect all
                return {
                    travelers: prevState.travelers.map(t => ({ ...t, selected: false })),
                    allSelected: false
                }
            }
        })
    }

    communicateWithSelectedTravelers = async data => {
        const travelerContacts = data.messageType === "email" ?
            data.selectedTravelers.map(t => t.email) :
            data.selectedTravelers.map(t => t.phone)

        const communicationTypeEndpoint = data.messageType
        const requestBody = communicationTypeEndpoint === 'email' ?
            {
                subject: data.subject,
                body: data.message,
                emails: travelerContacts
            } :
            {
                body: data.message,
                phones: travelerContacts
            }

        try {
            await apiCall('post', `/api/communicate/${communicationTypeEndpoint}`, requestBody)
            this.setState({
                snack: {
                    show: true,
                    variant: 'success',
                    message: 'Success!'
                }
            })
            this.getTravelers()
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

    updateTripRegistrationForm = async data => {
        const updateObject = {
            travelerRegistrationFormSettings: {
                ...data
            }
        }

        console.log(updateObject)

        try {
            const updatedTrip = await apiCall(
                'put',
                `/api/trips/${this.currentTripId}`,
                updateObject
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

    changeStatusOfSelectedTravelers = async data => {
        try {
            await apiCall(
                'put',
                '/api/travelers',
                data.selectedTravelers.map(t => ({ _id: t._id, update: { status: data.status } }))
            )
            this.setState({
                snack: {
                    show: true,
                    variant: 'success',
                    message: 'Success!'
                }
            })
            this.getTravelers()
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

    registerAccount = async () => {
        let link = await apiCall('POST', '/api/stripe/connect')
        var win = window.open(link.url, '_blank');
        win.focus()
    }

    collectMoneyFromTravelers = async data => {
        const { selectedTravelers, amount, message, messageType } = data
        try {
            await apiCall('post', '/api/coordinators/paymentForm', {
                travelers: selectedTravelers.map(t => t._id),
                amount,
                message,
                messageType
            })

            this.setState({
                snack: {
                    show: true,
                    variant: 'success',
                    message: 'Your payment requests have been sent!'
                }
            })
        } catch (err) {
            this.setState({
                snack: {
                    show: true,
                    variant: 'error',
                    message: 'There was an error creating your form.'
                }
            })
        }
    }

    setSelectedTraveler = travelerId => {
        let newSelection = this.state.travelers.find(
            t => t._id === travelerId
        )
        this.setState({
            selectedTraveler: newSelection
        })
    }

    toggleAddModal = () => {
        this.setState(prevState => ({
            addModalIsOpen: !prevState.addModalIsOpen
        }))
    }

    render() {
        const { allSelected, statusFiltersChecked, selectedTraveler, travelers, tripFiltersChecked, tripFilters } = this.state
        const csvUpload = (<>
            <Button size="large" variant="contained" color="primary" style={{ width: '180px', height: '50px', marginBottom: 16 }} onClick={this.toggleImportCsvModal}>
                IMPORT FROM CSV
            </Button>
            {this.state.isImportCsvOpen && <LeftModal
                isOpen={this.state.isImportCsvOpen}
                toggleModal={this.toggleImportCsvModal}
                title='Import travelers from CSV file'
                submit={this.addTravelersCSV}
                form={ImportCsvForm}
            />}
        </>
        )

        const registrationForm = (
            <>
                {this.state.madeStripeAccountRequest && <Button size="large" variant="contained" color="primary" style={{ width: '180px', height: '50px', marginTop: 16 }} onClick={this.toggleRegistrationModal}>
                    registration form
                </Button>}
                {this.state.isRegistrationModalOpen && <LeftModal
                    isOpen={this.state.isRegistrationModalOpen}
                    toggleModal={this.toggleRegistrationModal}
                    title='Customize your traveler registration'
                    submit={this.updateTripRegistrationForm}
                    form={TravelerRegistrationSettingsForm}
                    settings={this.props.currentTrip.travelerRegistrationFormSettings}
                    canRequestPayments={this.state.canRequestPayments}
                />}
            </>
        )

        const newTravelerInOrg = (
            <>
                <Button size="large" variant="contained" color="primary" style={{ width: '180px', height: '50px', float: 'right' }} onClick={this.openAddNewTravelerOrgModal}>
                    NEW TRAVELER
                </Button>
                {
                    this.state.isAddNewTravelerOrgModalOpen &&
                    <LeftModal
                        isOpen={this.state.isAddNewTravelerOrgModalOpen}
                        toggleModal={this.closeAddNewTravelerOrgModal}
                        title='Add new traveler'
                        submit={this.addTravelerToOrg}
                        form={TravelerForm}
                    />
                }
            </>
        )
        return (
            <div className="d-flex row" style={{ paddingLeft: 24, paddingRight: 16, marginTop: 16 }}>
                <div className="col-12 col-lg-8 p-0">
                    <Grid item xs={12} style={{ marginRight: 16 }}>
                        <Typography variant="h2">{this.props.currentTrip ? 'Travelers on this Trip' : 'Travelers in your Organization'}</Typography>
                        <div className="d-flex justify-content-between row mx-0" style={{ marginTop: 16 }}>
                            <LeftMultipleSelect allValues={travelerStatus} selectedValues={statusFiltersChecked} onChange={this.handleStatusFilterChange} label='All Status'></LeftMultipleSelect>
                            {!this.props.currentTrip && <LeftMultipleSelect allValues={tripFilters} selectedValues={tripFiltersChecked} onChange={this.handleTripFilterChange} label='All Trips'></LeftMultipleSelect>}
                            <div className="d-flex flex-row" style={{ marginBottom: 16 }}>
                                <Paper style={{ height: '50px', width: '72px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: 8, marginRight: 8 }}>
                                    <IconButton onClick={this.openChangeStatusModal}>
                                        <CreateOutlinedIcon fontSize="large" />
                                    </IconButton>
                                </Paper>
                                {
                                    this.state.isChangeStatusModalOpen && <LeftModal
                                        isOpen={this.state.isChangeStatusModalOpen}
                                        toggleModal={this.closeChangeStatusModal}
                                        title='Change traveler status'
                                        submit={this.changeStatusOfSelectedTravelers}
                                        travelers={this.state.travelers}
                                        selectedTravelers={travelers.filter(t => t.selected && (statusFiltersChecked.length > 0 || tripFiltersChecked.length > 0 ? t.filtered : true))}
                                        form={ChangeTravelerStatusForm}
                                    />
                                }
                                <Paper style={{ height: '50px', width: '72px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: 8, marginRight: 8 }}>
                                    <IconButton onClick={this.openCommunicateModal}>
                                        <MessageOutlinedIcon fontSize="large" />
                                    </IconButton>
                                </Paper>
                                {
                                    this.state.isCommunicateModalOpen && <LeftModal
                                        isOpen={this.state.isCommunicateModalOpen}
                                        toggleModal={this.closeCommunicateModal}
                                        title='Communicate with your travelers'
                                        submit={this.communicateWithSelectedTravelers}
                                        travelers={this.state.travelers}
                                        selectedTravelers={travelers.filter(t => t.selected && (statusFiltersChecked.length > 0 || tripFiltersChecked.length > 0 ? t.filtered : true))}
                                        form={CommunicateWithTravelersForm}
                                    />
                                }
                                <Paper style={{ height: '50px', width: '72px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: 8, marginRight: 8 }}>
                                    <IconButton aria-label="delete" onClick={this.toggleCollectMoneyModal}>
                                        <AttachMoneyIcon fontSize="large" />
                                    </IconButton>
                                </Paper>
                                {this.state.isCollectMoneyModalOpen && <LeftModal
                                    title="Collect money from travelers"
                                    isOpen={this.state.isCollectMoneyModalOpen}
                                    toggleModal={this.toggleCollectMoneyModal}
                                    submit={this.collectMoneyFromTravelers}
                                    travelers={this.state.travelers}
                                    selectedTravelers={travelers.filter(t => t.selected && (statusFiltersChecked.length > 0 || tripFiltersChecked.length > 0 ? t.filtered : true))}
                                    form={CollectMoneyForm}
                                >
                                </LeftModal>}
                                {this.state.isRegisterAccountModalOpen && <LeftModal
                                    isOpen={this.state.isRegisterAccountModalOpen}
                                    toggleModal={this.toggleRegisterAccontModal}
                                    title="Register your account to collect payments"
                                    submit={this.registerAccount}
                                    form={RegisterAccountModalForm}
                                >
                                </LeftModal>}
                            </div>
                            <div className="d-flex flex-column">
                                {!this.props.currentTrip && csvUpload}
                                {this.props.currentTrip ? (
                                    <>
                                        <Button size="large" variant="contained" color="primary" style={{ width: '180px', height: '50px', }} onClick={this.openAddModal}>
                                            ADD TRAVELER
                                        </Button>
                                        {this.state.isAddModalOpen &&
                                            <LeftModal
                                                isOpen={this.state.isAddModalOpen}
                                                toggleModal={this.closeAddModal}
                                                title='Add travelers to this trip'
                                                submit={this.addTraveler}
                                                travelers={this.state.travelersNotOnTrip}
                                                form={AddTravelerToTripFromOrgForm}
                                            />
                                        }
                                    </>) : newTravelerInOrg}
                                {this.props.currentTrip && registrationForm}
                            </div>
                        </div>
                        <Paper style={{ marginTop: 16 }}>
                            <div className="d-flex flex-row justify-content-around align-items-center TripsListHeader">
                                <Grid item xs={1} >
                                    <Checkbox
                                        onChange={this.toggleAll}
                                        className=""
                                        checked={allSelected}
                                        label="noshow"
                                        color="primary"
                                    />
                                </Grid>
                                <Grid item xs={2} className="d-none d-xl-flex"></Grid>
                                <Grid item xs={2}>
                                    <Typography variant="h6">
                                        NAME
                                    </Typography>
                                </Grid>
                                <Grid item xs={!this.props.currentTrip ? 2 : 3} className="d-none d-xl-flex">
                                    <Typography variant="h6">
                                        CONTACT
                                    </Typography>
                                </Grid>
                                <Grid item xs={!this.props.currentTrip ? 2 : 3}>
                                    <Typography variant="h6">
                                        STATUS
                                    </Typography>
                                </Grid>
                                {!this.props.currentTrip &&
                                    <Grid item xs={2}>
                                        <Typography variant="h6">TRIP NAME</Typography>
                                    </Grid>
                                }<Grid item xs={1}></Grid>
                            </div>
                        </Paper>

                        <TravelerList
                            items={statusFiltersChecked.length > 0 || tripFiltersChecked.length > 0 ? travelers.filter(t => t.filtered === true) : travelers}
                            toggle={this.toggle}
                            doubleClick={this.setSelectedTraveler}
                            showTrip={this.props.currentTrip ? false : true}
                        />
                    </Grid >

                </div>
                <div className="col-12 col-lg-4 px-0">
                    {this.state.selectedTraveler && <TravelerInfo
                        traveler={selectedTraveler}
                        update={this.updateTraveler}
                        remove={this.removeTraveler}
                    />}
                </div>

                {this.state.snack.show && <Snack open={this.state.snack.show} message={this.state.snack.message} variant={this.state.snack.variant} onClose={this.closeSnack}></Snack>}
            </div >
        )
    }
}

export default Travelers

const travelersInOrgNotOnTrip = (travelersOnTrip, traverlersInOrg) => {
    travelersOnTrip = travelersOnTrip.map(t => t._id)
    return traverlersInOrg.filter(traveler => !travelersOnTrip.includes(traveler._id))
}