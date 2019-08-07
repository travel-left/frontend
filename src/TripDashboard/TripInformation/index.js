import React, { Component } from 'react'
import TripNameForm from './TripNameForm'
import Coordinator from './Coordinators/Coordinator'
import CreateCoordinatorForm from './Coordinators/CreateCoordinatorForm'
import TripDate from './TripDates/TripDate'
import CreateTripDateForm from './TripDates/CreateTripDateForm'
import Document from './Documents/Document'
import CreateDocumentForm from './Documents/CreateDocumentForm'
import Contact from './Contacts/Contact'
import CreateContactForm from './Contacts/CreateContactForm'
import ItemList from '../../util/ItemList'
import { apiCall } from '../../util/api'

export default class TripInformation extends Component {
    currentTripId = this.props.currentTrip._id
    currentUserId = this.props.currentUser._id

    updateTrip = async updateObject => {
        const updatedTrip = await apiCall(
            'put',
            `/api/trips/${this.currentTripId}`,
            updateObject
        )
        this.props.setCurrentTrip(updatedTrip)
    }

    render() {
        let { name } = this.props.currentTrip
        return (
            <div className="mt-3 mx-3">
                <div className="row">
                    <div className="col-md-12 mt-4 ml-3">
                        <h4 className="text-dark">Name</h4>
                        <h3 className="text-primary my-1 d-inline"> {name} </h3>
                        <TripNameForm name={name} submit={this.updateTrip} />
                        <ItemList
                            type="coordinators"
                            Component={Coordinator}
                            Create={CreateCoordinatorForm}
                            tripId={this.currentTripId}
                            name="Coordinators"
                            otherProps={{ currentUserId: this.currentUserId }}
                        />
                        <ItemList
                            type="tripDates"
                            Component={TripDate}
                            Create={CreateTripDateForm}
                            tripId={this.currentTripId}
                            name="Dates"
                        />
                        <ItemList
                            type="documents"
                            Component={Document}
                            Create={CreateDocumentForm}
                            tripId={this.currentTripId}
                            name="Documents"
                        />
                        <ItemList
                            type="contacts"
                            Component={Contact}
                            Create={CreateContactForm}
                            tripId={this.currentTripId}
                            name="Emergency Contacts"
                        />
                    </div>
                </div>
            </div>
        )
    }
}
