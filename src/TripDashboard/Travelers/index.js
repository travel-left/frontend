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

const stati = [
    { value: 'INVITED', label: 'Invited' },
    { value: 'CONFIRMED', label: 'Confirmed' },
    { value: 'ON-TRIP', label: 'On trip' },
    { value: 'POST-TRIP', label: 'Post trip' }
]

class Travelers extends Component {
    state = {
        selected: {},
        allSelected: false,
        filters: ['INVITED', 'CONFIRMED', 'ON-TRIP', 'POST-TRIP'],
        selectedTraveler: this.props.currentTrip.travelers[0]
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
            : this.state.filters
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
                ...provided
            }),
            select: provided => ({
                ...provided,
                background: 'white',
                height: 'auto'
            }),
            valueContainer: (provided, state) => ({
                ...provided,
                minHeight: '50px'
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
            <div className="col-12 mt-3 ml-2 pr-0">
                <div className="row">
                    <div className="col-md-8">
                        <div className="row justify-content-between mb-4 align-items-center pr-3">
                            <h2 className="text-black d-inline">
                                Travelers on This Trip
                            </h2>
                            <ImportBulkForm
                                key={3}
                                submit={this.addTravelersCSV}
                            />
                            <AddTravelerForm
                                key={4}
                                submit={this.addTraveler}
                            />
                        </div>
                        <div className="row no-gutters mb-3 py-3">
                            <div className="col-md-12">
                                <div className="shadow card">
                                    <div className="row justify-content-between mx-3 py-3">
                                        <div className="col-md-7">
                                            <Select
                                                isMulti
                                                name="colors"
                                                options={stati}
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                                styles={customStyles}
                                                placeholder="Filter by status"
                                                onChange={this.handleFilterChange}
                                            />
                                        </div>
                                        <div className="col-md-1"></div>
                                        <div className="d-flex col-md-4 justify-content-around align-items-center">
                                            <ChangeStatusForm
                                                submit={this.changeStatusOfSelectedTravelers}
                                                travelers={filteredTravelers}
                                                selected={selected}
                                            />
                                            <CreateTextForm
                                                key={1}
                                                submit={this.textSelectedTravelers}
                                                travelers={filteredTravelers}
                                                selected={selected}
                                            />
                                            <CreateEmailForm
                                                key={2}
                                                submit={this.emailSelectedTravelers}
                                                travelers={filteredTravelers}
                                                selected={selected}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card row d-flex flex-row no-gutters justify-content-around shadow mb-3 py-3 align-items-center px-3 px-md-0">
                                    <div className="col-md-3 d-flex">
                                        <Checkbox
                                            onChange={this.toggleAll}
                                            className="ml-3 h6"
                                            checked={allSelected}
                                            label="noshow"
                                        />
                                    </div>
                                    <div className="col-md-2 h6 d-flex justify-content-center">
                                        NAME
                                    </div>
                                    <div className="col-4 col-md-4 h6 d-flex justify-content-center">
                                        CONTACT
                                    </div>
                                    <div className="col-4 col-md-2 h6 d-flex justify-content-center">
                                        {' '}
                                        STATUS
                                    </div>
                                </div>
                                <TravelerList
                                    items={filteredTravelers}
                                    selected={selected}
                                    toggle={this.toggle}
                                    doubleClick={this.setSelectedTraveler}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">{travelerInfo}</div>
                </div>
            </div>
        )
    }
}

export default Travelers
