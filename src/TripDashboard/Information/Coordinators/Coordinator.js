import React, { Component } from 'react'
import Image from '../../../util/otherComponents/Image'
import UpdateCoordinatorForm from './UpdateCoordinatorForm'
import LeftCard from '../../../util/LeftCard';

class Coordinator extends Component {
    handleUpdateCoordinator = updateObject => {
        this.props.update(this.props._id, updateObject)
    }

    handleRemoveCoordinator = () => {
        this.props.remove(this.props._id)
    }

    render() {
        let { email, img, firstName, lastName, _id, phone, title } = this.props

        return (
            <LeftCard>
                <div className="row">
                    <div className="col-md-3 d-flex align-items-center">
                        <Image src={img} diameter="55px" />
                    </div>
                    <div className="col-md-6 d-flex flex-column">
                        {firstName && lastName && <p className="m-0">{firstName + ' ' + lastName}</p>}
                        {title && <p className="m-0">{title}</p>}
                        {email && <p className="m-0">
                            <small className="text-muted">{email}</small>
                        </p>}
                        {phone &&
                            <p className="m-0">
                                <small className="text-muted">{phone}</small>
                            </p>}
                    </div>
                    <div className="col-md-3">
                        <UpdateCoordinatorForm name={firstName + ' ' + lastName} image={img} email={email} id={_id} phone={phone} submit={this.handleUpdateCoordinator} remove={this.handleRemoveCoordinator} />
                    </div>
                </div>
            </LeftCard>
        )
    }
}

export default Coordinator
