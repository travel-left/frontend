import React, { Component } from 'react'
import { apiCall } from '../../util/api'
import AddTravelerForm from './Actions/AddTravelerForm'
import ImportBulkForm from './Actions/ImportBulkForm'
import TravelerList from './Travelers/TravelerList'
import CreateEmailForm from './Actions/CreateEmailForm'
import CreateTextForm from './Actions/CreateTextForm'
import Select from 'react-select'
import ChangeStatusForm from './Actions/ChangeStatusForm'
import TravelerInfo from './Travelers/TravelerInfo'
import Checkbox from '../../util/forms/Checkbox'
import './Travelers.css'
import ReactGA from 'react-ga'
function initializeReactGA() {
    ReactGA.initialize('UA-145382520-1')
    ReactGA.pageview('/managetravelers')
}


const stati = [
    { value: 'INVITED', label: 'Invited' },
    { value: 'CONFIRMED', label: 'Confirmed' },
    { value: 'ON-TRIP', label: 'On trip' },
    { value: 'POST-TRIP', label: 'Post trip' },
    { value: 'DOCS DUE', label: 'Docs due' },
    { value: 'MONEY DUE', label: 'Money due' },
    { value: 'OTHER', label: 'Other' }
]

class Travelers extends Component {
    currentTripId = this.props.currentTrip._id
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
        selectedTraveler: {},
        travelers: []
    }

    constructor(props) {
        super(props)
        if (process.env.NODE_ENV === 'production') {
            initializeReactGA()
        }
        this.getTravelers()
    }

    getTravelers = async () => {
        const travelers = await apiCall(
            'get',
            `/api/trips/${this.currentTripId}/travelers`
        )
        const travelerIds = travelers.map(traveler => traveler._id)

        this.setSelectedTraveler(travelerIds[0])
        this.setState({ travelers })
    }

    addTraveler = async traveler => {
        await apiCall(
            'post',
            `/api/trips/${this.currentTripId}/travelers`,
            traveler
        )

        this.getTravelers()
    }

    addTravelersCSV = async travelers => {
        await apiCall(
            'post',
            `/api/trips/${this.currentTripId}/travelers/csv`,
            travelers
        )

        this.getTravelers()
    }

    updateTraveler = async (travelerId, updateObject) => {
        await apiCall(
            'put',
            `/api/trips/${this.currentTripId}/travelers/${travelerId}`,
            updateObject
        )

        this.getTravelers()
    }

    removeTraveler = async travelerId => {
        await apiCall(
            'delete',
            `/api/trips/${this.currentTripId}/travelers/${travelerId}`
        )

        this.getTravelers()
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

    emailSelectedTravelers = email => {
        const { selected, travelers } = this.state
        let travelersEmails = []
        for (const { _id, email } of travelers) {
            if (selected[_id]) {
                travelersEmails.push(email)
            }
        }

        apiCall('post', '/api/communicate/email', {
            subject: email.subject,
            body: email.body,
            emails: travelersEmails
        })
    }

    changeStatusOfSelectedTravelers = async ({ status }) => {
        const { selected, travelers } = this.state
        let travelerStatuses = []

        for (const traveler of travelers) {
            if (selected[traveler._id]) {
                travelerStatuses.push({ _id: traveler._id, update: { status } })
            }
        }

        await apiCall(
            'put',
            `/api/trips/${this.currentTripId}/travelers`,
            travelerStatuses
        )
        this.getTravelers()

    }

    textSelectedTravelers = text => {
        const { travelers } = this.props.currentTrip
        const { selected } = this.state
        let travelersPhones = []
        for (const { _id, phone } of travelers) {
            if (selected[_id]) {
                travelersPhones.push(phone)
            }
        }

        apiCall('post', '/api/communicate/text', {
            body: text.body,
            phones: travelersPhones
        })
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

    render() {
        let { selected, allSelected, filters, selectedTraveler, travelers } = this.state

        const filteredTravelers = travelers.filter(traveler =>
            filters.includes(traveler.status)
        )

        const customStyles = {
            container: (provided, state) => ({
                ...provided,
                height: '50px',
                width: '180px',
                boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.3)',
                border: 'none',
                borderRadius: '3px'
            }),
            control: (provided, state) => ({
                ...provided,
                border: 'none'
            }),
            select: provided => ({
                ...provided,
                background: 'white',
                height: 'auto',
                border: 'none'
            }),
            valueContainer: (provided, state) => ({
                ...provided,
                minHeight: '50px',
                border: 'none'
            }),
            placeholder: (provided) => ({
                ...provided,
                color: '#333333',
                fontFamily: 'Roboto',
                fontWeight: '600'
            })
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
                    <div className="col-md-8 mt-4 px-4">
                        <h4 className="Itinerary-title">Travelers on This Trip </h4>
                        <div className="row mx-0 my-4">
                            <div className="col-md-12">
                                <div className="row justify-content-between">
                                    <Select
                                        isMulti
                                        name="colors"
                                        options={stati}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        styles={customStyles}
                                        placeholder="All Status"
                                        onChange={
                                            this.handleFilterChange
                                        }
                                    />
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
                                    <ImportBulkForm
                                        key={3}
                                        submit={this.addTravelersCSV}
                                    />
                                    <AddTravelerForm
                                        key={4}
                                        submit={this.addTraveler}
                                    />
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
                    <div className="col-md-4 pr-0 left-shadow-blur">
                        {this.state.selectedTraveler && this.state.selectedTraveler.name && travelerInfo}
                    </div>
                </div>
            </div>
        )
    }
}

export default Travelers
