import React, { Component } from 'react'
import { apiCall } from '../util/api'
import AddTravelerForm from '../TripDashboard/Travelers/Actions/AddTravelerForm'
import ImportBulkForm from '../TripDashboard/Travelers/Actions/ImportBulkForm'
import TravelerList from '../TripDashboard/Travelers/Travelers/TravelerList'
import CreateEmailForm from '../TripDashboard/Travelers/Actions/CreateEmailForm'
import CreateTextForm from '../TripDashboard/Travelers/Actions/CreateTextForm'
import ChangeStatusForm from '../TripDashboard/Travelers/Actions/ChangeStatusForm'
import TravelerInfo from '../TripDashboard/Travelers/Travelers/TravelerInfo'
import { withStyles } from '@material-ui/core/styles'
import ReactGA from 'react-ga'
import Snack from '../util/Snack'
import Checkbox from '@material-ui/core/Checkbox'
import LeftMultipleSelect from '../util/forms/LeftMultipleSelect';

function initializeReactGA() {
    ReactGA.initialize('UA-145382520-1')
    ReactGA.pageview('/travelersdashboard')
}

const styles = {
    title: {
        fontFamily: 'Roboto',
        fontWeight: '600',
        fontSize: '30px',
        color: '#333333'
    },
    formControl: {
        margin: '0 1rem 1rem 1rem',
        minWidth: 180,
        maxWidth: 180,
    }
}

class Travelers extends Component {
    allFilters = [
        'INVITED',
        'CONFIRMED',
        'ON-TRIP',
        'POST-TRIP',
        'DOCS DUE',
        'MONEY DUE',
        'OTHER',
        'PAPERWORK NEEDED',
        'PAYMENT NEEDED'
    ]

    state = {
        selected: {},
        allSelected: false,
        filters: this.allFilters,
        filtersChecked: [
            'INVITED',
            'CONFIRMED',
            'ON-TRIP',
            'POST-TRIP'
        ],
        travelers: [],
        selectedTraveler: null,
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
    }

    closeSnack = () => (this.setState({ snack: { show: false } }))

    getTravelers = async () => {
        const travelers = await apiCall('get', '/api/organization/travelers')
        this.setState({ travelers, selectedTraveler: travelers[0] })
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
        try {
            await apiCall(
                'post',
                `/api/organization/travelers/csv`,
                newTravelers,
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

    handleFilterChange = filtersChecked => {
        filtersChecked = filtersChecked.target.value
        this.setState({ filtersChecked })
    }

    setSelectedTraveler = travelerId => {
        let newSelection = this.state.travelers.find(t => t._id === travelerId)
        this.setState({
            selectedTraveler: newSelection
        })
    }

    render() {
        let {
            selected,
            allSelected,
            filtersChecked,
            selectedTraveler,
            travelers
        } = this.state

        const { classes } = this.props

        const filteredTravelers = travelers.filter(traveler =>
            filtersChecked.includes(traveler.status)
        )

        let travelerInfo = selectedTraveler ? (
            <TravelerInfo
                traveler={selectedTraveler}
                update={this.updateTraveler}
                remove={this.removeTraveler}
            />
        ) : null

        return (
            <div className="col-md-12 ">
                <div className="row">
                    <div className="col-md-12 mt-4">
                        <h4 className={classes.title} >Travelers in Your Organization </h4>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-md-9 px-4">
                        <div className="row mx-0">
                            <div className="col-md-12">
                                <div className="row justify-content-between">
                                    <div className="left-shadow-sharp">
                                        <LeftMultipleSelect allValues={this.allFilters} selectedValues={this.state.filtersChecked} onChange={this.handleFilterChange} label='All Status'></LeftMultipleSelect>
                                    </div>
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
                                        <div className='px-3'>
                                            <ImportBulkForm
                                                key={3}
                                                submit={this.addTravelersCSV}
                                            />
                                        </div>

                                        <AddTravelerForm
                                            key={4}
                                            submit={this.addTraveler}
                                        />
                                    </div>
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
                                            color='primary'
                                        />
                                    </div>
                                    <div className="col-md-2"></div>
                                    <div className="col-md-3 Travelers-filter">NAME</div>
                                    <div className="col-md-3 Travelers-filter">CONTACT</div>
                                    <div className="col-md-3 Travelers-filter pr-0" style={{ paddingLeft: '32px' }}>STATUS</div>
                                </div>
                                <div className="row left-shadow-sharp mt-4" style={{ paddingBottom: '33vh', borderRadius: '3px' }}>
                                    <TravelerList
                                        items={filteredTravelers}
                                        selected={selected}
                                        toggle={this.toggle}
                                        doubleClick={this.setSelectedTraveler}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 left-shadow-sharp">
                        {this.state.selectedTraveler && this.state.selectedTraveler.name && travelerInfo}
                    </div>
                </div>
                {this.state.snack.show && <Snack open={this.state.snack.show} message={this.state.snack.message} variant={this.state.snack.variant} onClose={this.closeSnack}></Snack>}
            </div>
        )
    }
}

export default withStyles(styles)(Travelers)