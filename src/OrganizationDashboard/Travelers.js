import React, { Component } from 'react'
import { apiCall } from '../util/api'
import AddTravelerForm from '../TripDashboard/Travelers/Actions/AddTravelerForm'
import ImportBulkForm from '../TripDashboard/Travelers/Actions/ImportBulkForm'
import TravelerList from '../TripDashboard/Travelers/Travelers/TravelerList'
import CreateEmailForm from '../TripDashboard/Travelers/Actions/CreateEmailForm'
import CreateTextForm from '../TripDashboard/Travelers/Actions/CreateTextForm'
import Select from 'react-select'
import ChangeStatusForm from '../TripDashboard/Travelers/Actions/ChangeStatusForm'
import TravelerInfo from '../TripDashboard/Travelers/Travelers/TravelerInfo'
import Checkbox from '../util/forms/Checkbox'
import ReactGA from 'react-ga'
ReactGA.pageview('/travelers')

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
        selectedTraveler: null,
        travelers: []
    }

    constructor(props) {
        super(props)
        this.getTravelers()
    }

    getTravelers = async () => {
        const travelers = await apiCall('get', '/api/travelers')
        this.setState({ travelers, selectedTraveler: travelers[0] })
    }

    addTraveler = async traveler => {
        const { travelers } = this.state
        const createdTraveler = await apiCall(
            'post',
            '/api/travelers',
            traveler
        )
        travelers.push(createdTraveler)
        this.setState({ travelers, selectedTraveler: createdTraveler })
    }

    addTravelersCSV = async newTravelers => {
        let { travelers } = this.state
        const createdTravelers = await apiCall(
            'post',
            `/api/travelers/csv`,
            newTravelers
        )
        travelers = [...travelers, ...createdTravelers]
        this.setState({ travelers })
    }

    updateTraveler = async (travelerId, updateObject) => {
        let { travelers } = this.state
        const updatedTraveler = await apiCall(
            'put',
            `/api/travelers/${travelerId}`,
            updateObject
        )
        const index = travelers.findIndex(t => t._id === travelerId)
        travelers[index] = updatedTraveler
        this.setState({ travelers })
    }

    removeTraveler = async travelerId => {
        let { travelers } = this.state
        await apiCall('delete', `/api/travelers/${travelerId}`)
        travelers = travelers.filter(t => t._id !== travelerId)
        this.setState({ travelers })
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
        const newTravelers = []
        for (const traveler of travelers) {
            if (selected[traveler._id]) {
                travelerStatuses.push({ _id: traveler._id, update: { status } })
            } else {
                newTravelers.push(traveler)
            }
        }

        const updatedTravelers = await apiCall(
            'put',
            '/api/travelers',
            travelerStatuses
        )
        const allTravelers = [...newTravelers, ...updatedTravelers]
        this.setState({ travelers: allTravelers })
    }

    textSelectedTravelers = text => {
        const { selected, travelers } = this.state
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
        let newSelection = this.state.travelers.find(t => t._id === travelerId)
        this.setState({
            selectedTraveler: newSelection
        })
    }

    render() {
        let {
            selected,
            allSelected,
            filters,
            selectedTraveler,
            travelers
        } = this.state

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
            <div className="col-12">
                <div className="row">
                    <div className="col-md-8">
                        <div className="row justify-content-between mb-4 align-items-center pr-3">
                            <h2 className="text-black d-inline pl-3">
                                Travelers in Your Organization
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
                                                onChange={
                                                    this.handleFilterChange
                                                }
                                            />
                                        </div>
                                        <div className="col-md-1" />
                                        <div className="d-flex col-md-4 justify-content-around align-items-center">
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
