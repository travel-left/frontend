import React, { Component } from 'react'
import { apiCall } from '../../util/api'
import AddTravelerForm from './Actions/AddTravelerForm'
import ImportBulkForm from './Actions/ImportBulkForm'
// import Alert from '../../util/otherComponents/Alert'
import Traveler from './Travelers/Traveler'
import TravelerList from './Travelers/TravelerList'
import CreateEmailForm from './Actions/CreateEmailForm'
import CreateTextForm from './Actions/CreateTextForm'
import Select from 'react-select'
import ChangeStatusForm from './Actions/ChangeStatusForm'
import TravelerInfo from './TravelerInfo'
import Checkbox from '../../util/forms/Checkbox'

const stati = [
    { value: 'INVITED', label: 'Invited' },
    { value: 'CONFIRMED', label: 'Confirmed' },
    { value: 'ON-TRIP', label: 'On trip' },
    { value: 'POST-TRIP', label: 'Post trip' }
]

class Travelers extends Component {
    tripId = this.props.currentTrip._id

    state = {
        travelers: [],
        filteredTravelers: [],
        allSelected: false,
        // showAlert: false,
        filters: ['INVITED', 'CONFIRMED', 'ON-TRIP', 'POST-TRIP'],
        selectedTraveler: null
    }

    constructor(props) {
        super(props)
        // this.getShowAlertAndSetState()
        this.getAndSetTravelers()
    }

    // getShowAlertAndSetState = async () => {
    //     const { _id } = this.props.currentUser
    //     const coordinator = await apiCall('get', `/api/coordinators/${_id}`)
    //     if (coordinator.showAlerts.itinerary === 'true') {
    //         this.setState({
    //             showAlert: true
    //         })
    //     }
    // }

    // closeAlert = async () => {
    //     const { _id } = this.props.currentUser
    //     await apiCall('put', `/api/coordinators/${_id}`, {
    //         showAlerts: { itinerary: false }
    //     })
    //     this.setState({
    //         showAlert: false
    //     })
    // }

    getAndSetTravelers = async () => {
        const travelers = await apiCall(
            'get',
            `/api/trips/${this.tripId}/travelers`
        )
        this.setState({
            travelers,
            filteredTravelers: travelers.map(traveler => {
                return {
                    ...traveler,
                    selected: false
                }
            })
        })
    }

    addTraveler = async traveler => {
        await apiCall('post', `/api/trips/${this.tripId}/travelers`, traveler)
        this.getAndSetTravelers()
    }

    addTravelersCSV = async travelers => {
        console.log(travelers)
        await apiCall(
            'post',
            `/api/trips/${this.tripId}/travelers/csv`,
            travelers
        )
        this.getAndSetTravelers()
    }

    updateTraveler = async (travelerId, updateObject) => {
        await apiCall(
            'put',
            `/api/trips/${this.tripId}/travelers/${travelerId}`,
            updateObject
        )
        this.getAndSetTravelers()
    }

    removeTraveler = async travelerId => {
        await apiCall(
            'delete',
            `/api/trips/${this.tripId}/travelers/${travelerId}`
        )
        this.getAndSetTravelers()
    }

    toggle = travelerId => {
        this.setState(prevState => {
            return {
                ...prevState,
                allSelected: false,
                filteredTravelers: prevState.filteredTravelers.map(traveler => {
                    return {
                        ...traveler,
                        selected:
                            traveler._id === travelerId
                                ? !traveler.selected
                                : traveler.selected
                    }
                })
            }
        })
    }

    toggleAll = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                allSelected: !prevState.allSelected,
                filteredTravelers: prevState.filteredTravelers.map(traveler => {
                    return {
                        ...traveler,
                        selected: !prevState.allSelected
                    }
                })
            }
        })
    }

    emailSelectedTravelers = email => {
        let travelersEmails = []
        for (const traveler of this.state.filteredTravelers) {
            if (traveler.selected) {
                travelersEmails.push(traveler.email)
            }
        }

        apiCall('post', '/api/communicate/email', {
            subject: email.subject,
            body: email.body,
            emails: travelersEmails
        })
    }

    changeStatusOfSelectedTravelers = async ({ status }) => {
        let travelerStatuses = []
        const newTravelers = []
        for (const traveler of this.state.filteredTravelers) {
            if (traveler.selected) {
                travelerStatuses.push({ _id: traveler._id, update: { status } })
            } else {
                newTravelers.push(traveler)
            }
        }

        const updatedTravelers = await apiCall(
            'put',
            `/api/trips/${this.tripId}/travelers`,
            travelerStatuses
        )
        const allTravelers = [...newTravelers, ...updatedTravelers]
        this.filterTravelers(null, allTravelers)
    }

    textSelectedTravelers = text => {
        let travelersPhones = []
        for (const traveler of this.state.filteredTravelers) {
            if (traveler.selected) {
                travelersPhones.push(traveler.phone)
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
        this.filterTravelers(filters)
    }

    filterTravelers = (filters, allTravelers) => {
        this.setState(prevState => {
            const travelers =
                allTravelers && allTravelers !== []
                    ? allTravelers
                    : prevState.travelers
            const filteredTravelers = travelers.filter(traveler =>
                filters.includes(traveler.status)
            )
            return {
                ...prevState,
                travelers,
                filteredTravelers
            }
        })
    }

    setSelectedTraveler = travelerId => {
        let newSelection = this.state.travelers.filter(
            t => t._id === travelerId
        )[0]
        this.setState({
            selectedTraveler: newSelection
        })
    }

    render() {
        let { filteredTravelers, allSelected } = this.state
        // let alert = showAlert ? (
        //     <Alert
        //         text='This is where you manage the travelers on your trip.  Click "ADD TRAVELER" to add a single traveler or "IMPORT BULK" to upload a csv file with all of your travelers.'
        //         closeAlert={this.closeAlert}
        //     />
        // ) : null

        const customStyles = {
            container: (provided, state) => ({
                ...provided,
                width: '400px'
            }),
            select: (provided, state) => ({
                ...provided,
                background: 'white'
            })
        }

        let travelerInfo = this.state.selectedTraveler ? (
            <div className="col-md-4 shadow px-0 bg-light">
                <TravelerInfo
                    traveler={this.state.selectedTraveler}
                    update={this.updateTraveler}
                />
            </div>
        ) : null
        const selectedTravelerClass = this.state.selectedTraveler
            ? 'col-md-8'
            : 'col-12'
        return (
            <div className="mt-3 mx-3">
                {/* <div className="row">
                    <div className="col-md-12 d-none d-md-block">{alert}</div>
                </div> */}
                <div className="row">
                    <div className={`${selectedTravelerClass} mt-4 pr-5`}>
                        <div className="row justify-content-between mb-4 ml-2">
                            <h2 className="text-black d-inline">
                                Manage Your Travelers
                            </h2>
                            <div>
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
                        <div className="row d-flex flex-row no-gutters mb-3 py-3 justify-content-between">
                            <div className="col-md-6">
                                <Select
                                    defaultValue={stati}
                                    isMulti
                                    name="colors"
                                    options={stati}
                                    className="basic-multi-select shadow"
                                    classNamePrefix="select"
                                    styles={customStyles}
                                    placeholder="Filter by status"
                                    onChange={this.handleFilterChange}
                                />
                            </div>
                            <div className="col-md-6">
                                <div className="d-flex d-row justify-content-end">
                                    <div className="shadow">
                                        <CreateTextForm
                                            key={1}
                                            submit={this.textSelectedTravelers}
                                            travelers={filteredTravelers}
                                        />
                                        <CreateEmailForm
                                            key={2}
                                            submit={this.emailSelectedTravelers}
                                            travelers={filteredTravelers}
                                        />
                                        <ChangeStatusForm
                                            submit={
                                                this
                                                    .changeStatusOfSelectedTravelers
                                            }
                                            travelers={filteredTravelers}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card row d-flex flex-row no-gutters justify-content-around shadow mb-3 py-3 align-items-center px-3 px-md-0">
                                    <div className="col-md-3">
                                        <Checkbox
                                            onChange={this.toggleAll}
                                            className="ml-3 h6"
                                            checked={allSelected}
                                            label="SELECT ALL"
                                        />
                                    </div>
                                    <div className="d-none d-md-flex col-md-2 h6">
                                        NAME
                                    </div>
                                    <div className="col-4 col-md-3 h6">
                                        EMAIL
                                    </div>
                                    <div className="col-4 col-md-2 h6">
                                        {' '}
                                        STATUS
                                    </div>
                                    <div className="col-4 col-md-1" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <TravelerList
                                    items={filteredTravelers}
                                    C={Traveler}
                                    update={this.updateTraveler}
                                    toggle={this.toggle}
                                    submit={this.addTraveler}
                                    remove={this.removeTraveler}
                                    doubleClick={this.setSelectedTraveler}
                                />
                            </div>
                        </div>
                    </div>
                    {travelerInfo}
                </div>
            </div>
        )
    }
}

export default Travelers
