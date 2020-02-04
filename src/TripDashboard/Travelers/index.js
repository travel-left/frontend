import React, { Component } from 'react'
import { apiCall } from '../../util/api'
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined'
import TravelerList from './TravelerList'
import TravelerInfo from './TravelerInfo'
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
import ImportCsvForm from '../../Forms/ImportCsvForm'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import RegisterAccountModalForm from '../../Forms/RegisterAccountModalForm'
import CollectMoneyForm from '../../Forms/CollectMoneyForm'
import TravelerForm from '../../Forms/TravelerForm'
import TravelerRegistrationSettingsForm from '../../Forms/TravelerRegistrationSettingsForm'
import LeftButton from '../../util/otherComponents/LeftButton'
import { withStyles } from '@material-ui/core'
import TravelerListHeader from './TravelerListHeader'
import sizes from '../../styles/sizes'

function initializeReactGA() {
    ReactGA.initialize('UA-145382520-1')
    ReactGA.pageview('/managetravelers')
}

const styles = theme => ({
    container: {
        display: 'flex',
        width: '100%'
    },
    travelersSection: {
        padding: props => !props.currentTrip ? theme.spacing(0, 2) : theme.spacing(0, 2, 0, 0),
        margin: props => !props.currentTrip && theme.spacing(2, 0),
        [sizes.down("md")]: {
            paddingRight: props => props.currentTrip && "0 !important"
        }
    },
    buttonsContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        width: '100%',
        padding: theme.spacing(2, 0)
    },
    tinyButtonsContainer: {
        display: 'flex',
        [sizes.down("md")]: {
            width: '100%',
            justifyContent: 'center',
            margin: theme.spacing(2, 0)
        },
    },
    paperButton: {
        height: theme.spacing(6),
        width: theme.spacing(9),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: theme.spacing(0, 1)
    },
    orgButtons: {
        display: 'flex',
        flexDirection: 'column',
        [sizes.down("md")]: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%'
        }
    },
    newTraveler: {
        marginTop: theme.spacing(2),
        [sizes.down("md")]: {
            marginTop: theme.spacing(0)
        }
    },
    regButton: {
        marginTop: theme.spacing(2),
        [sizes.down("md")]: {
            marginTop: theme.spacing(0)
        }
    },
    filters: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        marginBottom: theme.spacing(2),
        [sizes.down("md")]: {
            marginBottom: theme.spacing(0),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            flexWrap: 'wrap'
        }
    },
    filterText: {
        display: 'block',
        width: '100%'
    }
})

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
        try {
            const account = await apiCall('GET', '/api/stripe/connect')
            this.setState({
                canRequestPayments: account.charges_enabled,
                madeStripeAccountRequest: true
            })
        } catch (err) {
            this.setState({
                canRequestPayments: false,
                madeStripeAccountRequest: true
            })
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
        const { classes, currentTrip, currentUser } = this.props
        const { allSelected, statusFiltersChecked, selectedTraveler, travelers, tripFiltersChecked, tripFilters } = this.state
        const csvUpload = <>
            <LeftButton onClick={this.toggleImportCsvModal} color="secondary">
                IMPORT FROM CSV
            </LeftButton>
            {this.state.isImportCsvOpen && <LeftModal
                isOpen={this.state.isImportCsvOpen}
                toggleModal={this.toggleImportCsvModal}
                title={`Import ${currentUser.words ? currentUser.words.whoPlural.toLowerCase() : 'Travelers'} from CSV file`}
                submit={this.addTravelersCSV}
                form={ImportCsvForm}
            />}
        </>

        const registrationForm = <>
            {this.state.madeStripeAccountRequest &&
                <div className={classes.regButton}>
                    <LeftButton onClick={this.toggleRegistrationModal}>
                        registration form
            </LeftButton>
                </div>
            }
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

        const newTravelerInOrg = <>
            <div className={classes.newTraveler}>
                <LeftButton onClick={this.openAddNewTravelerOrgModal} id="new-traveler-button">
                    NEW {currentUser.words ? currentUser.words.who.toUpperCase() : 'TRAVELER'}
                </LeftButton>
            </div>
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

        return (
            <Grid container className={classes.container}>
                <Grid item xs={12} md={8} className={classes.travelersSection}>
                    <Typography
                        className={classes.title}
                        variant="h2">
                        {currentTrip ?
                            `${currentUser.words ? currentUser.words.whoPlural : 'Travelers'} on this ${currentUser.words ? currentUser.words.what : 'Trip'}` :
                            `${currentUser.words ? currentUser.words.whoPlural : 'Travelers'} in your Organization`
                        }
                    </Typography>
                    <div className={classes.buttonsContainer}>
                        <div className={classes.filters}>
                            <Typography variant="h6" className={classes.filterText}>Filter by</Typography>
                            <LeftMultipleSelect
                                allValues={travelerStatus}
                                selectedValues={statusFiltersChecked}
                                onChange={this.handleStatusFilterChange}
                                label='Status'
                            ></LeftMultipleSelect>
                            {!currentTrip &&
                                <LeftMultipleSelect
                                    allValues={tripFilters}
                                    selectedValues={tripFiltersChecked}
                                    onChange={this.handleTripFilterChange}
                                    label='Trip'
                                ></LeftMultipleSelect>
                            }
                        </div>

                        <div className={classes.tinyButtonsContainer}>
                            <Paper className={classes.paperButton}>
                                <IconButton onClick={this.openChangeStatusModal}>
                                    <CreateOutlinedIcon fontSize="large" />
                                </IconButton>
                            </Paper>
                            {
                                this.state.isChangeStatusModalOpen && <LeftModal
                                    isOpen={this.state.isChangeStatusModalOpen}
                                    toggleModal={this.closeChangeStatusModal}
                                    title='Change status'
                                    submit={this.changeStatusOfSelectedTravelers}
                                    travelers={this.state.travelers}
                                    selectedTravelers={travelers.filter(t => t.selected && (statusFiltersChecked.length > 0 || tripFiltersChecked.length > 0 ? t.filtered : true))}
                                    form={ChangeTravelerStatusForm}
                                />
                            }
                            <Paper className={classes.paperButton}>
                                <IconButton onClick={this.openCommunicateModal}>
                                    <MessageOutlinedIcon fontSize="large" />
                                </IconButton>
                            </Paper>
                            {
                                this.state.isCommunicateModalOpen && <LeftModal
                                    isOpen={this.state.isCommunicateModalOpen}
                                    toggleModal={this.closeCommunicateModal}
                                    title='Communicate'
                                    submit={this.communicateWithSelectedTravelers}
                                    travelers={this.state.travelers}
                                    selectedTravelers={travelers.filter(t => t.selected && (statusFiltersChecked.length > 0 || tripFiltersChecked.length > 0 ? t.filtered : true))}
                                    form={CommunicateWithTravelersForm}
                                />
                            }
                            <Paper className={classes.paperButton}>
                                <IconButton aria-label="delete" onClick={this.toggleCollectMoneyModal}>
                                    <AttachMoneyIcon fontSize="large" />
                                </IconButton>
                            </Paper>
                            {this.state.isCollectMoneyModalOpen && <LeftModal
                                title="Collect money"
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
                        <div className={classes.orgButtons}>
                            {!currentTrip && csvUpload}
                            {currentTrip ? <>
                                <LeftButton onClick={this.openAddModal} id="add-traveler-button">
                                    ADD {currentUser.words ? currentUser.words.whoPlural : 'Travelers'}
                                </LeftButton>
                                {this.state.isAddModalOpen &&
                                    <LeftModal
                                        isOpen={this.state.isAddModalOpen}
                                        toggleModal={this.closeAddModal}
                                        title={`Add ${currentUser.words ? currentUser.words.whoPlural : 'Travelers'}`}
                                        submit={this.addTraveler}
                                        travelers={this.state.travelersNotOnTrip}
                                        form={AddTravelerToTripFromOrgForm}
                                    />
                                }
                            </> : newTravelerInOrg}
                            {this.props.currentTrip && registrationForm}
                        </div>
                    </div>
                    <TravelerListHeader
                        toggleAll={this.toggleAll}
                        allSelectd={allSelected}
                        showTrip={this.props.currentTrip}
                    ></TravelerListHeader>
                    <TravelerList
                        items={statusFiltersChecked.length > 0 || tripFiltersChecked.length > 0 ? travelers.filter(t => t.filtered === true) : travelers}
                        toggle={this.toggle}
                        doubleClick={this.setSelectedTraveler}
                        showTrip={this.props.currentTrip ? false : true}
                    />
                </Grid >
                <Grid item xs={12} md={4} >
                    {this.state.selectedTraveler && <TravelerInfo
                        traveler={selectedTraveler}
                        update={this.updateTraveler}
                        remove={this.props.currentTrip ? this.removeTraveler : this.removeTravelerFromOrg}
                    />}
                </Grid>

                {this.state.snack.show && <Snack open={this.state.snack.show} message={this.state.snack.message} variant={this.state.snack.variant} onClose={this.closeSnack}></Snack>}
            </Grid >
        )
    }
}

export default withStyles(styles)(Travelers)

const travelersInOrgNotOnTrip = (travelersOnTrip, traverlersInOrg) => {
    travelersOnTrip = travelersOnTrip.map(t => t._id)
    return traverlersInOrg.filter(traveler => !travelersOnTrip.includes(traveler._id))
}