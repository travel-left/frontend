import React, { Component } from 'react'
import Image from '../../../util/otherComponents/Image'
import UpdateCoordinatorForm from './UpdateCoordinatorForm'

class TripCoordinator extends Component {
    handleUpdateCoordinator = updateObject => {
        this.props.updateCoordinator(this.props.coordinator._id, updateObject)
    }

    handleRemoveCoordinator = () => {
        this.props.remove(this.props.coordinator._id)
    }

    render() {
        let { email, img, firstName, lastName, _id, phone, title } = this.props.coordinator

        return (
            <div className="mb-3 col-md-4 border-0 shadow mx-4">
                <div className="row no-gutters d-flex justify-content-between py-3">
                    <div className="col-md-3 d-flex flex-row align-items-center">
                        <Image src={img} diameter="55px" />
                    </div>
                    <div className="col-md-6">
                        <p className="text-bold my-1">{firstName + ' ' + lastName}</p>
                        <p className="my-1">{title}</p>
                        <p className="my-1">
                            <small className="text-muted">{email}</small>
                        </p>
                        <p className="my-1">
                            <small className="text-muted">{phone}</small>
                        </p>
                    </div>
                    <div className="col-md-3 d-flex flex-column justify-content-around">
                        <UpdateCoordinatorForm name={firstName + ' ' + lastName} image={img} email={email} id={_id} phone={phone} submit={this.handleUpdateCoordinator}></UpdateCoordinatorForm>
                        <button class="btn btn-danger " onClick={this.handleRemoveCoordinator}>remove</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default TripCoordinator
