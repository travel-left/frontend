import React, { Component } from 'react'
import { apiCall } from '../../util/api'
import AddTravelerForm from './Actions/AddTravelerForm'
import ImportBulkForm from './Actions/ImportBulkForm'
import Alert from '../../util/otherComponents/Alert'
import Traveler from './Travelers/Traveler'
import TravelerList from './Travelers/TravelerList'
import CreateEmailForm from './Actions/CreateEmailForm'
import CreateTextForm from './Actions/CreateTextForm'

class Travelers extends Component {
    tripId = this.props.currentTrip._id

    state = {
        travelers: [],
        showAlert: false
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
            travelers: travelers.map(traveler => {
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
                travelers: prevState.travelers.map(traveler => {
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

    emailSelectedTravelers = email => {
        let travelersEmails = []
        for (const traveler of this.state.travelers) {
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
        for (const traveler of this.state.travelers) {
            if (traveler.selected) {
                travelersPhones.push(traveler.phone)
            }
        }

        apiCall('post', '/api/communicate/text', {
            body: text.body,
            phones: travelersPhones
        })
    }

    render() {
        let { travelers, showAlert } = this.state
        let alert = showAlert ? (
            <Alert
                text='This is where you manage the travelers on your trip.  Click "ADD TRAVELER" to add a single traveler or "IMPORT BULK" to upload a csv file with all of your travelers.'
                closeAlert={this.closeAlert}
            />
        ) : null

        return (
            <div className="mt-3 mx-3">
                <div className="row">
                    <div className="col-md-12 d-none d-md-block">{alert}</div>
                </div>
                <div className="row">
                    <div className="col-md-12 mt-4 mx-3 pr-5">
                        <div className="d-flex flex-row justify-content-between mb-4">
                            <h2 className="text-primary d-inline">
                                People on this trip
                            </h2>
                            <div>
                                <CreateTextForm
                                    key={1}
                                    submit={this.textSelectedTravelers}
                                    travelers={travelers}
                                />
                                <CreateEmailForm
                                    key={2}
                                    submit={this.emailSelectedTravelers}
                                    travelers={travelers}
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
                        <h4 className="d-block text-muted">
                            Add travelers here who are coming on the trip
                        </h4>
                        <div className="card row d-flex flex-row no-gutters justify-content-around shadow mb-3 py-3 align-items-center px-3 px-md-0">
                            <div className="col-md-1" />
                            <div className="col-md-2 d-none d-md-block">
                                {' '}
                                Image{' '}
                            </div>
                            <div className="d-none d-md-flex col-md-2">
                                {' '}
                                Name{' '}
                            </div>
                            <div className="col-4 col-md-3">Email</div>
                            <div className="col-4 col-md-2"> Status</div>
                            <div className="col-4 col-md-1" />
                        </div>
                        <TravelerList
                            items={travelers}
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
