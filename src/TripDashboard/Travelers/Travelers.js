import React, { Component } from 'react'
import { apiCall } from '../../util/api'
import AddTravelerForm from './Actions/AddTravelerForm'
import ImportBulkForm from './Actions/ImportBulkForm'
import Alert from '../../util/otherComponents/Alert'
import Traveler from './Travelers/Traveler'
import TravelerList from './Travelers/TravelerList'
import CreateEmailForm from './Actions/CreateEmailForm'
import CreateTextForm from './Actions/CreateTextForm'
import Select from 'react-select'
import ChangeStatusForm from './Actions/ChangeStatusForm';

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
        showAlert: false,
        filters: ['INVITED', 'CONFIRMED', 'ON-TRIP', 'POST-TRIP']
    }

    constructor(props) {
        super(props)
        this.getShowAlertAndSetState()
        this.getAndSetTravelers()
    }

    getShowAlertAndSetState = async () => {
        const { _id } = this.props.currentUser
        const coordinator = await apiCall('get', `/api/coordinators/${_id}`)
        if (coordinator.showAlerts.itinerary === 'true') {
            this.setState({
                showAlert: true
            })
        }
    }

    closeAlert = async () => {
        const { _id } = this.props.currentUser
        await apiCall('put', `/api/coordinators/${_id}`, {
            showAlerts: { itinerary: false }
        })
        this.setState({
            showAlert: false
        })
    }

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
        await apiCall('put', `/api/travelers/${travelerId}`, updateObject)
        this.getAndSetTravelers()
    }

    removeTraveler = async travelerId => {
        setTimeout(() => {
            console.log(travelerId)
        }, 1000)
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
                        selected: !prevState.allSelected,
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

    filterTravelers = selectedFilters => {
        let filters = selectedFilters ? selectedFilters.map(f => f.value) : this.state.filters
        this.setState(prevState => {
            return {
                ...prevState,
                filteredTravelers: prevState.travelers.filter(traveler => filters.includes(traveler.status))
            }
        })
    }

    render() {
        let { filteredTravelers, showAlert } = this.state
        let alert = showAlert ? (
            <Alert
                text='This is where you manage the travelers on your trip.  Click "ADD TRAVELER" to add a single traveler or "IMPORT BULK" to upload a csv file with all of your travelers.'
                closeAlert={this.closeAlert}
            />
        ) : null

        const customStyles = {
            container: (provided, state) => ({
                ...provided,
                width: '400px',
            }),
            select: (provided, state) => ({
                ...provided,
                background: 'white'
            })
        }

        return (
            <div className="mt-3 mx-3">
                <div className="row">
                    <div className="col-md-12 d-none d-md-block">{alert}</div>
                </div>
                <div className="row">
                    <div className="col-md-12 mt-4 mx-3 pr-5">
                        <div className="row justify-content-between mb-4">
                            <h2 className="text-black d-inline">
                                Travelers on This Trip
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
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    styles={customStyles}
                                    placeholder='Filter by status'
                                    onChange={this.filterTravelers}
                                />
                            </div>
                            <div className="col-md-6">
                                <div className="d-flex d-row justify-content-end">
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
                                        submit={this.emailSelectedTravelers}
                                        travelers={filteredTravelers}
                                    />
                                </div>
                            </div>

                        </div>
                        <div className="card row d-flex flex-row no-gutters justify-content-around shadow mb-3 py-3 align-items-center px-3 px-md-0">
                            <div className="col-md-1">
                                <input
                                    onClick={this.toggleAll}
                                    type="checkbox"
                                    className="ml-3"
                                    checked={this.state.allSelected}
                                />
                            </div>
                            <div className="col-md-2 d-none d-md-block">
                            </div>
                            <div className="d-none d-md-flex col-md-2">
                                {' '}
                                NAME{' '}
                            </div>
                            <div className="col-4 col-md-3">EMAIL</div>
                            <div className="col-4 col-md-2"> STATUS</div>
                            <div className="col-4 col-md-1" />
                        </div>
                        <TravelerList
                            items={filteredTravelers}
                            C={Traveler}
                            update={this.updateTraveler}
                            toggle={this.toggle}
                            submit={this.addTraveler}
                            remove={this.removeTraveler}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Travelers
