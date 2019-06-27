import React, { Component } from 'react'
import UpdateCoordinatorForm from './UpdateCoordinatorForm';

class TripCoordinator extends Component {
    constructor(props) {
        super(props)
    }

    handleUpdateCoordinator = updateObject => {
        this.props.updateCoordinator(this.props.coordinator._id, updateObject)
    }

    render() {
        let { email, img, firstName, lastName, _id } = this.props.coordinator

        return (
            <div className="mb-3 col-md-5 border-0 shadow mx-4">
                <div className="row no-gutters d-flex justify-content-between">
                    <div className="col-md-3 d-flex flex-row align-items-center">
                        <img src={img} class="card-img rounded-circle px-2 py-2" alt="..."></img>
                    </div>
                    <div className="col-md-6">
                        <div className="ml-3">
                            <p className="text-bold my-1">{firstName + ' ' + lastName}</p>
                            {/* title/permission level <p className="my-1">Super Admin</p> */}
                            <p className="my-1"><small class="text-muted">{email}</small></p>
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