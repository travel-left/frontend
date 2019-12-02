import React, { Component } from 'react'
import { apiCall } from '../../util/api'
import AddTravelerForm from './Actions/AddTravelerForm'
import ImportBulkForm from './Actions/ImportBulkForm'
import TravelerList from './Travelers/TravelerList'
import Card from '@material-ui/core/Card';
import CreateEmailForm from './Actions/CreateEmailForm'
import CreateTextForm from './Actions/CreateTextForm'
import { withStyles } from '@material-ui/core/styles'
import ChangeStatusForm from './Actions/ChangeStatusForm'
import TravelerInfo from './Travelers/TravelerInfo'
import Checkbox from '@material-ui/core/Checkbox'
import './Travelers.css'
import ReactGA from 'react-ga'
import AddFromOrg from './Travelers/AddFromOrg';
import Snack from '../../util/Snack'
import LeftMultipleSelect from '../../util/forms/LeftMultipleSelect'
import { travelerStatus } from '../../util/globals'


function initializeReactGA() {
    ReactGA.initialize('UA-145382520-1')
    ReactGA.pageview('/managetravelers')
}

const styles = {
    title: {
        fontFamily: 'Roboto',
        fontWeight: '600',
        fontSize: '30px',
        color: '#333333',
        paddingTop: '2rem',
        paddingBottom: '2rem'
    },
    sideColumn: {
        height: '120vh'
    }
}

class Travelers extends Component {
    currentTripId = this.props.currentTrip._id

    state = {
        selected: {},
        allSelected: false,
        selectedTraveler: {},
        statusFiltersChecked: [],
        travelers: [],
        travelersNotOnTrip: [],
        addModalIsOpen: false,
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
        this.getTravelers()
    }

    closeSnack = () => (this.setState({ snack: { show: false } }))

    getTravelers = async () => {
        const travelers = await apiCall('get', `/api/trips/${this.currentTripId}/travelers`)
        const travelersInOrg = await apiCall('get', '/api/organization/travelers')

        const travelersNotOnTrip = travelersInOrgNotOnTrip(travelers, travelersInOrg)

        this.setState({ travelers, selectedTraveler: travelers[0], travelersNotOnTrip })
    }

    handleStatusFilterChange = statusFiltersChecked => {
        statusFiltersChecked = statusFiltersChecked.target.value
        this.setState({ statusFiltersChecked })
    }

    addTraveler = async travelers => {
        try {
            await apiCall(
                'post',
                `/api/trips/${this.currentTripId}/travelers`,
                travelers,
                true
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

    addTravelersCSV = async travelers => {
        try {
            await apiCall(
                'post',
                `/api/trips/${this.currentTripId}/travelers/csv`,
                travelers,
                true
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
                `/api/trips/${this.currentTripId}/travelers/${travelerId}`,
                updateObject, true
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

    toggle = travelerId => {
        this.setState(prevState => {
            const { selected } = prevState
            selected[travelerId] = !selected[travelerId]
            return {
                ...prevState,
                allSelected: false,
                selected
            }
        })
    }

    toggleAll = () => {
        this.setState(prevState => {
            const { travelers } = prevState
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

    textSelectedTravelers = async text => {
        const { travelers, selected } = this.state
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


    changeStatusOfSelectedTravelers = async ({ status }) => {
        const { selected, travelers } = this.state
        let travelerStatuses = []

        for (const traveler of travelers) {
            if (selected[traveler._id]) {
                travelerStatuses.push({ _id: traveler._id, update: { status } })
            }
        }

        try {
            await apiCall(
                'put',
                `/api/trips/${this.currentTripId}/travelers`,
                travelerStatuses, true
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

    handleFilterChange = selectedFilters => {
        if (!Array.isArray(selectedFilters) || !selectedFilters.length) {
            //handles filters being cleared by clicking on the x, component returns empty array instead of null in this scenario
            selectedFilters = null
        }
        let filters = selectedFilters
            ? selectedFilters.map(f => f.value)
            : this.allFilters
        this.setState({ filters })
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
        const { selected, allSelected, filters, statusFiltersChecked, selectedTraveler, travelers } = this.state
        const { classes } = this.props
        let filteredTravelers = []

        if (statusFiltersChecked.length === 0) {
            filteredTravelers = travelers
        } else {
            filteredTravelers = travelers.filter(traveler =>
                statusFiltersChecked.includes(traveler.status)
            )
        }

        let travelerInfo = selectedTraveler ? (
            <TravelerInfo
                traveler={selectedTraveler}
                update={this.updateTraveler}
                remove={this.removeTraveler}
            />
        ) : null

        return (
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-8 pl-3">
                        <h4 className={classes.title} >Travelers on This Trip</h4>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="row mx-0">
                                    <div className="col-md-12">
                                        <div className="row justify-content-between">
                                            <LeftMultipleSelect allValues={travelerStatus} selectedValues={statusFiltersChecked} onChange={this.handleStatusFilterChange} label='All Status'></LeftMultipleSelect>

                                            <div className="d-flex flex-row">
                                                <ChangeStatusForm
                                                    submit={
                                                        this
                                                            .changeStatusOfSelectedTravelers
                                                    }
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
                                            </div>
                                            <button className="btn btn-primary btn-lg" onClick={this.toggleAddModal}>Add Traveler</button>
                                            {this.state.addModalIsOpen &&
                                                <AddFromOrg
                                                    submit={this.addTraveler}
                                                    toggleModal={this.toggleAddModal}
                                                    isOpen={this.state.addModalIsOpen}
                                                    travelers={this.state.travelersNotOnTrip}
                                                />
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="row mx-0 my-4">
                                    <div className="col-md-12">
                                        <div className="row justify-content-around left-shadow-sharp py-3 align-items-center">
                                            <div className="col-md-1 Travelers-filter">
                                                <Checkbox
                                                    onChange={this.toggleAll}
                                                    className=""
                                                    checked={allSelected}
                                                    label="noshow"
                                                    color="primary"
                                                />
                                            </div>
                                            <div className="col-md-1"></div>
                                            <div className="col-md-3 Travelers-filter">NAME</div>
                                            <div className="col-md-4 Travelers-filter">CONTACT</div>
                                            <div className="col-md-3 Travelers-filter pr-0" style={{ paddingLeft: '32px' }}>STATUS</div>
                                        </div>
                                        <div className="row left-shadow-sharp mt-4" style={{ borderRadius: '3px' }}>
                                            <TravelerList
                                                items={filteredTravelers}
                                                selected={selected}
                                                toggle={this.toggle}
                                                doubleClick={this.setSelectedTraveler}
                                                showTrip={false}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 px-0 mr-0" style={{ minHeight: '120vh' }}>
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

const travelersInOrgNotOnTrip = (travelersOnTrip, traverlersInOrg) => {
    travelersOnTrip = travelersOnTrip.map(t => t._id)
    return traverlersInOrg.filter(traveler => !travelersOnTrip.includes(traveler._id))
}