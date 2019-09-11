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
initializeReactGA()

const stati = [
    { value: 'INVITED', label: 'Invited' },
    { value: 'CONFIRMED', label: 'Confirmed' },
    { value: 'ON-TRIP', label: 'On trip' },
    { value: 'POST-TRIP', label: 'Post trip' },
    { value: 'PAYMENT NEEDED', label: 'Payment needed' },
    { value: 'PAPERWORK NEEDED', label: 'Paperwork needed' },
    { value: 'OTHER', label: 'Other' }
]

class Travelers extends Component {
    allFilters = [
        'INVITED',
        'CONFIRMED',
        'ON-TRIP',
        'POST-TRIP',
        'PAYMENT NEEDED',
        'PAPERWORK NEEDED',
        'OTHER'
    ]

    state = {
        selected: {},
        allSelected: false,
        filters: this.allFilters,
        selectedTraveler: {}
    }

    constructor(props) {
        super(props)
        this.getTravelers()
    }

    getTravelers = async () => {
        const { currentTrip, setCurrentTrip } = this.props
        const newTravelers = await apiCall(
            'get',
            `/api/trips/${currentTrip._id}/travelers`
        )
        const newTravelerIds = newTravelers.map(nt => nt._id)
        const travelerIds = currentTrip.travelers.map(t => t._id)

        let notEqual = false

        for (const id of newTravelerIds) {
            if (!travelerIds.includes(id)) {
                notEqual = true
                break
            }
        }

        for (const id of travelerIds) {
            if (!newTravelerIds.includes(id)) {
                notEqual = true
                break
            }
        }

        if (notEqual) {
            currentTrip.travelers = newTravelers
            setCurrentTrip(currentTrip)
        }

        this.setSelectedTraveler(travelerIds[0])
    }

    addTraveler = async traveler => {
        const { currentTrip, setCurrentTrip } = this.props
        const createdTraveler = await apiCall(
            'post',
            `/api/trips/${currentTrip._id}/travelers`,
            traveler
        )
        currentTrip.travelers.push(createdTraveler)
        setCurrentTrip(currentTrip)
    }

    addTravelersCSV = async travelers => {
        const { currentTrip, setCurrentTrip } = this.props
        const createdTravelers = await apiCall(
            'post',
            `/api/trips/${currentTrip._id}/travelers/csv`,
            travelers
        )
        currentTrip.travelers = [...currentTrip.travelers, ...createdTravelers]
        setCurrentTrip(currentTrip)
    }

    updateTraveler = async (travelerId, updateObject) => {
        const { currentTrip, setCurrentTrip } = this.props
        const updatedTraveler = await apiCall(
            'put',
            `/api/trips/${this.props.currentTrip._id}/travelers/${travelerId}`,
            updateObject
        )
        const index = currentTrip.travelers.findIndex(t => t._id === travelerId)
        currentTrip.travelers[index] = updatedTraveler
        setCurrentTrip(currentTrip)
    }

    removeTraveler = async travelerId => {
        const { currentTrip, setCurrentTrip } = this.props
        await apiCall(
            'delete',
            `/api/trips/${this.props.currentTrip._id}/travelers/${travelerId}`
        )
        currentTrip.travelers = currentTrip.travelers.filter(
            t => t._id !== travelerId
        )
        setCurrentTrip(currentTrip)
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
            const { travelers } = this.props.currentTrip
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
        const { travelers } = this.props.currentTrip
        const { selected } = this.state
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
        const { currentTrip, setCurrentTrip } = this.props
        const { selected } = this.state
        let travelerStatuses = []
        const newTravelers = []
        for (const traveler of currentTrip.travelers) {
            if (selected[traveler._id]) {
                travelerStatuses.push({ _id: traveler._id, update: { status } })
            } else {
                newTravelers.push(traveler)
            }
        }

        const updatedTravelers = await apiCall(
            'put',
            `/api/trips/${this.props.currentTrip._id}/travelers`,
            travelerStatuses
        )
        const allTravelers = [...newTravelers, ...updatedTravelers]
        currentTrip.travelers = allTravelers
        setCurrentTrip(currentTrip)
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
        let newSelection = this.props.currentTrip.travelers.find(
            t => t._id === travelerId
        )
        this.setState({
            selectedTraveler: newSelection
        })
    }

    render() {
        let { selected, allSelected, filters, selectedTraveler } = this.state
        let { travelers } = this.props.currentTrip

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
