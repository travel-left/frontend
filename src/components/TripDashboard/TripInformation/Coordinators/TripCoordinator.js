import React, { Component } from 'react'
import Image from '../../../Other/Image'
import UpdateCoordinatorForm from './UpdateCoordinatorForm'

class TripCoordinator extends Component {
    handleUpdateCoordinator = updateObject => {
        this.props.updateCoordinator(this.props.coordinator._id, updateObject)
    }

    render() {
        let { email, img, firstName, lastName, _id, phone, title } = this.props.coordinator

        return (
            <div className="mb-3 col-md-5 border-0 shadow mx-4">
                <div className="row no-gutters d-flex justify-content-between">
                    <div className="col-md-3 d-flex flex-row align-items-center">
                        <Image src={img} diameter="75px" />
                    </div>
                    <div className="col-md-6">
                        <div className="ml-3">
                            <p className="text-bold my-1">{firstName + ' ' + lastName}</p>
                            <p className="my-1">{title}</p>
                            <p className="my-1">
                                <small class="text-muted">{email}</small>
                            </p>
                            <p className="my-1">
                                <small class="text-muted">{phone}</small>
                            </p>
                        </div>
                    </div>
                    <div className="col-md-2 d-flex d-row align-items-center">
                        <UpdateCoordinatorForm name={firstName + ' ' + lastName} image={img} email={email} id={_id} submit={this.handleUpdateCoordinator}></UpdateCoordinatorForm>
                    </div>
                </div>
            </div>
        )
    }
}

export default TripCoordinator
