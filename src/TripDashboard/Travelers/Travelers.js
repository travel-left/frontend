import React, { Component } from 'react'
import TravelerList from './Travelers/TravelerList'
import { apiCall } from '../../util/api'
import AddTraveler from './Travelers/AddTraveler'
import Alert from '../../util/otherComponents/Alert'

class Travelers extends Component {
    tripId = this.props.currentTrip._id

    cohortId = this.props.currentCohort._id

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
        const { _id } = this.props.currentUser.user
        const coordinator = await apiCall('get', `/api/coordinators/${_id}`)
        if (coordinator.showAlerts.itinerary === 'true') {
            this.setState({
                showAlert: true
            })
        }
    }

    closeAlert = async () => {
        const { _id } = this.props.currentUser.user
        await apiCall('put', `/api/coordinators/${_id}`, { showAlerts: { itinerary: false } })
        this.setState({
            showAlert: false
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.currentCohort !== prevProps.currentCohort) {
            this.getAndSetTravelers()
        }
    }

    getAndSetTravelers = async () => {
        const travelers = await apiCall('get', `/api/trips/${this.tripId}/cohorts/${this.cohortId}/travelers`)
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
        const newTraveler = {
            ...traveler,
            accessType: 'user',
            password: 'password',
            currentTrip: this.props.currentTrip._id,
            currentCohort: this.props.currentTrip.cohorts[0]._id,
            firstName: traveler.name.split(' ')[0],
            lastName: traveler.name.split(' ')[1]
        }

        const trav = await apiCall('post', '/api/travelers', newTraveler)
        await apiCall('PUT', `/api/trips/${this.tripId}/cohorts/${this.cohortId}/travelers/${trav._id}`)
        this.getAndSetTravelers()
    }

    updateTraveler = async (travelerId, updateObject) => {
        await apiCall('put', `/api/travelers/${travelerId}`, updateObject)
        this.getAndSetTravelers()
    }

    toggle = travelerId => {
        this.setState(prevState => {
            return {
                ...prevState,
                travelers: prevState.travelers.map(traveler => {
                    return {
                        ...traveler,
                        selected: traveler._id === travelerId ? !traveler.selected : traveler.selected
                    }
                })
            }
        })
    }

    doSomethingWithSelectedTravelers = () => {
        this.state.travelers.forEach(traveler => {
            if (traveler.selected) {
                console.log(traveler)
            }
        })
    }

    render() {
        let { cohorts, travelers, showAlert } = this.state
        let alert = showAlert ? <Alert text='This is where you manage the travelers on your trip.  Click "ADD TRAVELER" to add a single traveler or "IMPORT BULK" to upload a csv file with all of your travelers.' closeAlert={this.closeAlert} /> : null

        return (
            <div className="mt-3 mx-3">
                <div className="row">
                    <div className="col-md-12 d-none d-md-block">{alert}</div>
                </div>
                <div className="row">
                    <div className="col-md-12 mt-4 mx-3 pr-5">
                        <div className="d-flex flex-row justify-content-between mb-4">
                            <h2 className="text-primary d-inline">People on this trip</h2>
                            <div>
                                <button className="btn btn-warning text-light btn-lg" onClick={this.doSomethingWithSelectedTravelers}>Do something</button>
                                <button className="btn btn-lg btn-secondary text-light mx-5">Import bulk</button>
                                <AddTraveler submit={this.addTraveler} />
                            </div>
                        </div>
                        <h4 className="d-block text-muted">Add travelers here who are coming on the trip</h4>
                        <div className="card row d-flex flex-row no-gutters justify-content-around shadow mb-3 py-3 align-items-center px-3 px-md-0">
                            <div className="col-md-1"></div>
                            <div className="col-md-2 d-none d-md-block"> Image </div>
                            <div className="d-none d-md-flex col-md-2"> Name </div>
                            <div className="col-4 col-md-3">Email</div>
                            <div className="col-4 col-md-2"> Status</div>
                            <div className="col-4 col-md-1"></div>
                        </div>
                        <TravelerList travelers={travelers} cohorts={cohorts} addTravelerToCohort={this.addTravelerToCohort} updateTraveler={this.updateTraveler} toggle={this.toggle} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Travelers
