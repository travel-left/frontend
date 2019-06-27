import React, { Component } from 'react'
import Alert from '../../Other/Alert'
import DashboardHeader from '../../Other/DashboardHeader'
import UpdateTripForm from './UpdateTripForm'
import { connect } from 'react-redux'
import { setCurrentTrip } from '../../../store/actions/trip'
import { apiCall } from '../../../util/api'
import Moment from 'react-moment'
import CohortList from '../Travelers/Cohorts/CohortList';
import CohortForm from '../Travelers/Cohorts/CohortForm';
import TripCoordinator from './TripCoordinator';
import TripDatesForm from '../Cover/TripDatesForm';
import TripDates from './TripDates'
import TripNameForm from './TripNameForm';
import Documents from './Documents/Documents';
import NewCoordinatorForm from './NewCoordinatorForm';
import Communicate from '../Communicate/Communicate';
import Contact from '../Communicate/Contact';

class TripInformation extends Component {

    state = {
        coordinators: [],
        contacts: []
    }
    constructor(props) {
        super(props)

        this.getCoordinators()
        this.getContacts()
    }

    updateTrip = async updateObject => {
        await apiCall('put', `/api/trips/${this.props.currentTrip._id}`, updateObject)
        let updatedTrip = await apiCall('get', `/api/trips/${this.props.currentTrip._id}`)
        this.props.setCurrentTrip({ ...updatedTrip })
    }

    // addCohort = async cohort => {
    //     await apiCall('post', `/api/trips/${this.props.currentTrip._id}/cohorts`, cohort)
    //     let cohorts = await apiCall('get', `/api/trips/${this.props.currentTrip._id}/cohorts`)
    //     this.props.setCurrentTrip({ ...this.props.currentTrip, cohorts })
    // }

    getCoordinators = async () => {
        let coordinators = await apiCall('get', `/api/trips/${this.props.currentTrip._id}/coordinators`)
        this.setState({ coordinators })
    }

    updateCoordinator = async (coordinatorId, updateObject) => {
        updateObject.firstName = updateObject.name.split(' ')[0]
        updateObject.lastName = updateObject.name.split(' ')[1]
        delete updateObject.name
        await apiCall('put', `/api/coordinators/${coordinatorId}`, updateObject)
        this.getCoordinators()
    }

    createCoordinator = async coordinator => {
        coordinator.firstName = coordinator.name.split(' ')[0]
        coordinator.lastName = coordinator.name.split(' ')[1]
        let organizationId = ''
        delete coordinator.name
        await apiCall('post', `/api/signup`, coordinator)
        this.getCoordinators()
    }

    getContacts = async () => {
        let contacts = await apiCall('get', `/api/trips/${this.props.currentTrip._id}/cohorts/${this.props.currentTrip.cohorts[1]._id}/contacts`)
        this.setState({ contacts })
    }

    updateContact = async (contactId, updateObject) => {
        updateObject.firstName = updateObject.name.split(' ')[0]
        updateObject.lastName = updateObject.name.split(' ')[1]
        delete updateObject.name
        await apiCall('put', `/api/trips/${this.props.currentTrip._id}/cohorts/${this.props.currentTrip.cohorts[1]._id}/contacts/${contactId}`, updateObject)
        this.getContacts()
    }

    render() {
        let { name, description, status, image, dateStart, dateEnd } = this.props.currentTrip
        let coordinatorList = this.state.coordinators.length > 0 ? this.state.coordinators.map(c => <TripCoordinator coordinator={c} updateCoordinator={this.updateCoordinator}></TripCoordinator>) : null
        let contactsList = this.state.contacts.length > 0 ? this.state.contacts.map(c => <Contact updateContact={this.updateContact} id={c._id} name={c.firstName + ' ' + c.lastName} phone={c.phone} email={c.email} photo={c.photo} key={c._id}></Contact>) : null
        return (
            <div className='mt-3 mx-3'>
                <div className="row">
                    <div className="col-md-8 mt-4 ml-3">
                        <h4 className='text-dark'>Trip Name</h4>
                        <h3 className='text-primary my-1 d-inline'> {name} </h3>
                        <TripNameForm name={name} submit={this.updateTrip}></TripNameForm>
                        <h4 className='text-dark my-3'>Trip Coordinators</h4>
                        <NewCoordinatorForm></NewCoordinatorForm>
                        <div className="row">
                            {coordinatorList}
                        </div>
                        <h4 className='text-dark my-3'>Trip Dates</h4>
                        <div className="row">
                            <TripDates></TripDates>
                        </div>
                        <h4 className='text-dark my-3'>Trip Documents</h4>
                        <Documents currentTrip={this.props.currentTrip}></Documents>
                        <h4 className='text-dark my-3'>Emergency Contacts</h4>
                        <div className="row">
                            {contactsList}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentTrip: state.currentTrip
    }
}

export default connect(
    mapStateToProps,
    { setCurrentTrip }
)(TripInformation)
