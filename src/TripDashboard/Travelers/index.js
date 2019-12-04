import React, { Component } from 'react'
import { apiCall } from '../../util/api'
import AddTravelerForm from './Actions/AddTravelerForm'
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined'
import TravelerList from './Travelers/TravelerList'
import Card from '@material-ui/core/Card'
import TravelerInfo from './Travelers/TravelerInfo'
import Checkbox from '@material-ui/core/Checkbox'
import './Travelers.css'
import ReactGA from 'react-ga'
import AddTravelerToTripFromOrgForm from './Travelers/AddTravelerToTripFromOrgForm'
import Snack from '../../util/Snack'
import LeftMultipleSelect from '../../util/forms/LeftMultipleSelect'
import { travelerStatus } from '../../util/globals'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import LeftModal from '../../util/otherComponents/LeftModal'
import ChangeTravelerStatusForm from './ChangeTravelerStatusForm'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CommunicateWithTravelersForm from './CommunicateWithTravelersForm'
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined'
import Button from '@material-ui/core/Button'
import ImportCsvForm from '../../OrganizationDashboard/ImportCsvForm'
import AddNewTravelerModalForm from '../../OrganizationDashboard/AddNewTravelerModalForm'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import CollectMoneyModalForm from '../../OrganizationDashboard/CollectMoneyModalForm'
import RegisterAccountModalForm from '../../OrganizationDashboard/RegisterAccountModalForm'

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
        isAddModalOpen: false,
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
            // this.getStripeAccount()
        }

    }

    closeChangeStatusModal = () => (this.setState({ isChangeStatusModalOpen: false }))
    openChangeStatusModal = () => (this.setState({ isChangeStatusModalOpen: true }))
    closeCommunicateModal = () => (this.setState({ isCommunicateModalOpen: false }))
    openCommunicateModal = () => (this.setState({ isCommunicateModalOpen: true }))
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


    getTravelers = async () => {
        if (!this.props.currentTrip) {
            this.getOrgTravelers()
        } else {
            const travelers = await apiCall('get', `/api/trips/${this.currentTripId}/travelers`)
            const travelersInOrg = await apiCall('get', '/api/organization/travelers')
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
        const travelers = await apiCall('get', '/api/organization/travelers')
        this.setState({
            travelers,
            selectedTraveler: travelers[0],
            allSelected: false,
            statusFiltersChecked: []
        })
    }

    getTrips = async () => {
        const trips = await apiCall('get', '/api/organization/trips')
        trips.push('none')
        this.setState({ tripFilters: trips, tripFiltersChecked: [] })
    }

    getStripeAccount = async () => {
        const account = await apiCall('GET', '/api/stripe/connect')
        if (account.id === 'acct_1F9D9wISOcFp9WE7') {
            this.setState({ canRequestPayments: false })
        } else {
            this.setState({ canRequestPayments: account.charges_enabled })
        }
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
        console.log(newTravelers)
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

    collectMoneyFromTravelers = async (travelers, amount, message, sendAs) => {
        //create form, if form created successfully
        let form
        try {
            form = await apiCall('post', '/api/coordinators/paymentForm', {
                travelers: travelers.map(t => t._id),
                amount,
                message,
                sendAs
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


        let travelersPhones = []
        let travelersEmails = []

        for (const { phone, email } of travelers) {
            travelersPhones.push(phone)
            travelersEmails.push(email)
        }

        try {
            let data = await apiCall('post', `/api/paymentForms/${form.paymentFormId}`, {
                emails: travelersEmails,
                phones: travelersPhones,
                sendAs: sendAs
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
                    message: 'An error occurred sending your payment requests'
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
            <Button size="large" variant="contained" color="primary" style={{ width: '180px', height: '50px' }} onClick={this.toggleImportCsvModal}>
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

        const newTravelerInOrg = (
            <>
                <Button size="large" variant="contained" color="primary" style={{ width: '180px', height: '50px', marginTop: 16, marginBottom: 16 }} onClick={this.toggleAddTravelerModal}>
                    ADD NEW TRAVELER
                </Button>
                {this.state.isAddTravelerOpen && <AddNewTravelerModalForm
                    isOpen={this.state.isAddTravelerOpen}
                    toggleModal={this.toggleAddTravelerModal}
                    submit={this.addTravelerToOrg}
                >
                </AddNewTravelerModalForm>}
            </>
        )
        return (
            <div className="d-flex row" style={{ paddingLeft: 24, paddingRight: 16, marginTop: 16 }}>
                <div className="col-12 col-lg-8 p-0">
                    <Grid item xs={12} style={{ marginRight: 16 }}>
                        <Typography variant="h2">{this.props.currentTrip ? 'Travelers on this Trip' : 'Travelers in your Organization'}</Typography>
                        <div className="d-flex justify-content-between row mx-0" style={{ marginTop: 16 }}>
                            <LeftMultipleSelect allValues={travelerStatus} selectedValues={statusFiltersChecked} onChange={this.handleStatusFilterChange} label='All Status'></LeftMultipleSelect>
                            {!this.props.currentTrip && <LeftMultipleSelect allValues={tripFilters} selectedValues={tripFiltersChecked} onChange={() => console.log('changing trip filter')} label='All Trips'></LeftMultipleSelect>}
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
                                        selectedTravelers={travelers.filter(t => t.selected && (statusFiltersChecked.length > 0 ? t.filtered : true))}
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
                                        selectedTravelers={travelers.filter(t => t.selected && (statusFiltersChecked.length > 0 ? t.filtered : true))}
                                        form={CommunicateWithTravelersForm}
                                    />
                                }
                                {!this.props.currentTrip && (
                                    <>
                                        <Paper style={{ height: '50px', width: '72px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: 8, marginRight: 8 }}>
                                            <IconButton aria-label="delete" onClick={this.toggleCollectMoneyModal}>
                                                <AttachMoneyIcon fontSize="large" />
                                            </IconButton>
                                        </Paper>
                                        {this.state.isCollectMoneyModalOpen && <CollectMoneyModalForm
                                            isOpen={this.state.isCollectMoneyModalOpen}
                                            toggleModal={this.toggleCollectMoneyModal}
                                            submit={this.collectMoneyFromTravelers}
                                            allTravelers={this.state.travelers}
                                            selectedTravelers={this.state.selectedTravelers}
                                        >
                                        </CollectMoneyModalForm>}
                                        {this.state.isRegisterAccountModalOpen && <LeftModal
                                            isOpen={this.state.isRegisterAccountModalOpen}
                                            toggleModal={this.toggleRegisterAccontModal}
                                            title="Register your account to collect payments"
                                            submit={this.registerAccount}
                                            form={RegisterAccountModalForm}
                                        >
                                        </LeftModal>}
                                    </>
                                )}
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
                                <Grid item xs={3} className="d-none d-xl-flex">
                                    <Typography variant="h6">
                                        CONTACT
                                </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="h6">
                                        STATUS
                                </Typography>
                                </Grid>
                                <Grid item xs={1}></Grid>
                            </div>
                        </Paper>

                        <TravelerList
                            items={statusFiltersChecked.length > 0 ? travelers.filter(t => t.filtered === true) : travelers}
                            toggle={this.toggle}
                            doubleClick={this.setSelectedTraveler}
                            showTrip={false}
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