import React, { Component } from 'react'
import { apiCall } from '../util/api'
import TravelerList from '../TripDashboard/Travelers/Travelers/TravelerList'
import CreateEmailForm from '../TripDashboard/Travelers/Actions/CreateEmailForm'
import CreateTextForm from '../TripDashboard/Travelers/Actions/CreateTextForm'
import ChangeStatusForm from '../TripDashboard/Travelers/Actions/ChangeStatusForm'
import TravelerInfo from '../TripDashboard/Travelers/Travelers/TravelerInfo'
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles'
import ReactGA from 'react-ga'
import Snack from '../util/Snack'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import LeftMultipleSelect from '../util/forms/LeftMultipleSelect';
import { travelerStatus } from '../util/globals'
import Card from '@material-ui/core/Card';
import ImportCsvModalForm from './ImportCsvModalForm';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import AddNewTravelerModalForm from './AddNewTravelerModalForm'
import CollectMoneyModalForm from './CollectMoneyModalForm';
import RegisterAccountModalForm from './RegisterAccountModalForm'
import Paper from '@material-ui/core/Paper'

function initializeReactGA() {
    ReactGA.initialize('UA-145382520-1')
    ReactGA.pageview('/travelersdashboard')
}

const styles = {
    title: {
        fontFamily: 'Roboto',
        fontWeight: '600',
        fontSize: '30px',
        color: '#333333',
        marginBottom: '2rem'
    },
    formControl: {
        margin: '0 1rem 1rem 1rem',
        minWidth: 180,
        maxWidth: 180,
    },
    card: {
        width: '100%'
    },
    sideColumn: {
        height: '120vh'
    }
}

class Travelers extends Component {
    state = {
        selected: {},
        allSelected: false,
        statusFilters: travelerStatus,
        statusFiltersChecked: [],
        tripFilters: [],
        tripFiltersChecked: [],
        travelers: [],
        selectedTravelers: [],
        selectedTraveler: null,
        isImportCsvOpen: false,
        isAddTravelerOpen: false,
        isCollectMoneyModalOpen: false,
        isRegisterAccountModalOpen: false,
        canRequestPayments: false,
        snack: {
            show: false,
            variant: '',
            message: ''
        },

    }

    constructor(props) {
        super(props)
        if (process.env.NODE_ENV === 'production') {
            initializeReactGA()
        }
        this.getTravelers()
        this.getTrips()
        this.getStripeAccount()
    }

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
        const travelers = await apiCall('get', '/api/organization/travelers')
        this.setState({ travelers, selectedTraveler: travelers[0] })
    }

    getTrips = async () => {
        const trips = await apiCall('get', '/api/organization/trips')
        trips.push('none')
        this.setState({ tripFilters: trips, tripFiltersChecked: [] })
    }

    getStripeAccount = async () => {
        const account = await apiCall('GET', '/api/stripe/connect')
        this.setState({ canRequestPayments: account.charges_enabled })
    }

    addTraveler = async traveler => {
        try {
            await apiCall(
                'post',
                '/api/organization/travelers',
                traveler,
                true
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

    updateTraveler = async (travelerId, updateObject) => {
        try {
            await apiCall(
                'put',
                `/api/travelers/${travelerId}`,
                updateObject,
                true
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

    removeTraveler = async travelerId => {
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

    toggle = travelerId => {
        const { selectedTravelers, travelers } = this.state
        this.setState(prevState => {
            const { selected } = prevState
            selected[travelerId] = !selected[travelerId]
            return {
                ...prevState,
                allSelected: false,
                selected
            }
        })

        if (selectedTravelers.filter(t => t._id === travelerId)[0] == null) {
            this.setState(prevState => {
                return {
                    ...prevState,
                    selectedTravelers: [travelers.filter(t => t._id === travelerId)[0], ...prevState.selectedTravelers]
                }
            })
        }
        else {
            this.setState(prevState => {
                return {
                    ...prevState,
                    selectedTravelers: prevState.selectedTravelers.filter(t => t._id !== travelerId)
                }
            })
        }
    }

    toggleAll = () => {
        this.setState(prevState => {
            const { travelers } = this.state
            const newAllSelected = !prevState.allSelected
            let selected = {}
            if (newAllSelected) {
                for (const { _id } of travelers) {
                    selected[_id] = newAllSelected
                }
            }
            return {
                ...prevState,
                allSelected: newAllSelected,
                selected
            }
        })
    }

    emailSelectedTravelers = async email => {
        const { selected, travelers } = this.state
        let travelersEmails = []
        for (const { _id, email } of travelers) {
            if (selected[_id]) {
                travelersEmails.push(email)
            }
        }

        try {
            await apiCall('post', '/api/communicate/email', {
                subject: email.subject,
                body: email.body,
                emails: travelersEmails
            }, true)
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

    changeStatusOfSelectedTravelers = async ({ status }) => {
        const { selected, travelers } = this.state
        let travelerStatuses = []
        const newTravelers = []
        for (const traveler of travelers) {
            if (selected[traveler._id]) {
                travelerStatuses.push({ _id: traveler._id, update: { status } })
            } else {
                newTravelers.push(traveler)
            }
        }

        try {
            await apiCall(
                'put',
                '/api/travelers',
                travelerStatuses,
                true
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

    textSelectedTravelers = async text => {
        const { selected, travelers } = this.state
        let travelersPhones = []
        for (const { _id, phone } of travelers) {
            if (selected[_id]) {
                travelersPhones.push(phone)
            }
        }

        try {
            await apiCall('post', '/api/communicate/text', {
                body: text.body,
                phones: travelersPhones
            }, true)
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
        this.setState({ statusFiltersChecked })
    }

    handleTripFilterChange = tripFiltersChecked => {
        tripFiltersChecked = tripFiltersChecked.target.value
        this.setState({ tripFiltersChecked })
    }

    setSelectedTraveler = travelerId => {
        let newSelection = this.state.travelers.find(t => t._id === travelerId)
        this.setState({
            selectedTraveler: newSelection
        })
    }

    registerAccount = async () => {
        let link = await apiCall('POST', '/api/stripe/connect')
        var win = window.open(link.url, '_blank');
        win.focus()
    }

    collectMoneyFromTravelers = (travelers, amount, message) => {
        console.log(travelers)
        console.log(amount)
        console.log(message)
    }

    render() {
        let {
            selected,
            allSelected,
            statusFiltersChecked,
            selectedTraveler,
            travelers,
            tripFilters,
            tripFiltersChecked
        } = this.state

        const { classes } = this.props

        let filteredTravelers = []

        if ((statusFiltersChecked.length > 0) && (tripFiltersChecked.length > 0)) {
            filteredTravelers = travelers.filter(traveler =>
                statusFiltersChecked.includes(traveler.status) && tripFiltersChecked.includes(traveler.trip)
            )
        }
        else if ((statusFiltersChecked.length > 0 && tripFiltersChecked.length === 0)) {
            filteredTravelers = travelers.filter(traveler =>
                statusFiltersChecked.includes(traveler.status)
            )
        }
        else if ((statusFiltersChecked.length === 0 && tripFiltersChecked.length > 0)) {
            filteredTravelers = travelers.filter(traveler =>
                tripFiltersChecked.includes(traveler.trip)
            )
        }
        else if ((statusFiltersChecked.length === 0 && tripFiltersChecked.length === 0)) {
            filteredTravelers = travelers
        }

        let travelerInfo = selectedTraveler ? (
            <TravelerInfo
                traveler={selectedTraveler}
                update={this.updateTraveler}
                remove={this.removeTraveler}
            />
        ) : null

        return (
            <div className="col-md-12 px-0">
                <div className="row">
                    <div className="col-md-9 mt-4">
                        <h4 className={classes.title} >Travelers in Your Organization </h4>
                        <div className="row mx-0">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-12 px-0">
                                        <div className="d-flex flex-row justify-content-between mb-3">
                                            <div className="d-flex flex-row">
                                                <div className="mr-3">
                                                    <LeftMultipleSelect allValues={travelerStatus} selectedValues={statusFiltersChecked} onChange={this.handleStatusFilterChange} label='All Status'></LeftMultipleSelect>
                                                </div>
                                                <LeftMultipleSelect allValues={tripFilters} selectedValues={tripFiltersChecked} onChange={this.handleTripFilterChange} label='All Trips'></LeftMultipleSelect>
                                            </div>
                                            <div className="d-flex flex-row">
                                                <div className='px-3'>
                                                    <Button size="large" variant="contained" color="primary" style={{ width: '180px', height: '50px' }} onClick={this.toggleImportCsvModal}>
                                                        IMPORT FROM CSV
                                                    </Button>
                                                    {this.state.isImportCsvOpen && <ImportCsvModalForm
                                                        isOpen={this.state.isImportCsvOpen}
                                                        toggleModal={this.toggleImportCsvModal}
                                                        submit={this.addTravelersCSV}
                                                    >
                                                    </ImportCsvModalForm>}
                                                </div>
                                                <Button size="large" variant="contained" color="primary" style={{ width: '180px', height: '50px' }} onClick={this.toggleAddTravelerModal}>
                                                    ADD NEW TRAVELER
                                                    </Button>
                                                {this.state.isAddTravelerOpen && <AddNewTravelerModalForm
                                                    isOpen={this.state.isAddTravelerOpen}
                                                    toggleModal={this.toggleAddTravelerModal}
                                                    submit={this.addTraveler}
                                                >
                                                </AddNewTravelerModalForm>}
                                            </div>
                                        </div>

                                    </div>
                                    <div className="d-flex flex-row">
                                        <ChangeStatusForm
                                            submit={this.changeStatusOfSelectedTravelers}
                                            travelers={filteredTravelers}
                                            selected={selected}
                                        />
                                        <CreateTextForm
                                            key={1}
                                            submit={
                                                this.textSelectedTravelers
                                            }
                                            travelers={filteredTravelers}
                                            selected={selected}
                                        />
                                        <CreateEmailForm
                                            key={2}
                                            submit={
                                                this.emailSelectedTravelers
                                            }
                                            travelers={filteredTravelers}
                                            selected={selected}
                                        />
                                        <Paper style={{ height: '50px', width: '72px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                                        {this.state.isRegisterAccountModalOpen && <RegisterAccountModalForm
                                            isOpen={this.state.isRegisterAccountModalOpen}
                                            toggleModal={this.toggleRegisterAccontModal}
                                            submit={this.registerAccount}
                                        >
                                        </RegisterAccountModalForm>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mx-0 my-4">
                            <Card className={classes.card}>
                                <div className="row justify-content-around py-3 align-items-center" style={{ paddingLeft: '15px', paddingRight: '15px' }}>
                                    <div className="col-md-1 Travelers-filter">
                                        <Checkbox
                                            onChange={this.toggleAll}
                                            className=""
                                            checked={allSelected}
                                            label="noshow"
                                            color='primary'
                                        />
                                    </div>
                                    <div className="col-md-3 Travelers-filter">NAME</div>
                                    <div className="col-md-3 Travelers-filter">CONTACT</div>
                                    <div className="col-md-2 Travelers-filter" >STATUS</div>
                                    <div className="col-md-2 Travelers-filter">TRIP</div>
                                    <div className="col-md-1"></div>
                                </div>
                            </Card>
                            <div className="col-12 px-0 mt-3">
                                <Card className={classes.card}>
                                    <div className="row mt-4">
                                        <TravelerList
                                            items={filteredTravelers}
                                            selected={selected}
                                            toggle={this.toggle}
                                            doubleClick={this.setSelectedTraveler}
                                            showTrip
                                        />
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3 px-0" style={{ minHeight: '120vh' }}>
                        <Card className={classes.sideColumn}>
                            {this.state.selectedTraveler && this.state.selectedTraveler.name && travelerInfo}
                        </Card>
                    </div>
                </div>
                {this.state.snack.show && <Snack open={this.state.snack.show} message={this.state.snack.message} variant={this.state.snack.variant} onClose={this.closeSnack}></Snack>}
            </div>
        )
    }
}

export default withStyles(styles)(Travelers)