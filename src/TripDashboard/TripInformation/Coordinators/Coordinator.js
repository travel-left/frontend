import React, { Component } from 'react'
import Image from '../../../util/otherComponents/Image'
import LeftCard from '../../../util/LeftCard'
import RemoveCoordinator from './RemoveCoordinator'

class Coordinator extends Component {
    handleEdit = updateObject => {
        this.props.update(this.props._id, updateObject)
    }

    handleDelete = () => {
        this.props.remove(this.props._id)
    }

    render() {
        let {
            email,
            image,
            name,
            phone,
            title,
            currentUserId,
            _id
        } = this.props

        const removeButton =
            currentUserId !== _id ? (
                <RemoveCoordinator submit={this.handleDelete} />
            ) : null

        return (
            <LeftCard>
                <div className="row">
                    <div className="col-md-3 d-flex align-items-center">
                        <Image src={image} diameter="55px" name={name} />
                    </div>
                    <div className="col-md-7 d-flex flex-column justify-content-center">
                        {name && <p className="m-0">{name}</p>}
                        {title && <p className="m-0">{title}</p>}
                        {email && (
                            <p className="m-0">
                                <small className="text-muted">{email}</small>
                            </p>
                        )}
                        {phone && (
                            <p className="m-0">
                                <small className="text-muted">{phone}</small>
                            </p>
                        )}
                    </div>
                    <div className="col-2 d-flex justify-content-center align-items-center">
                        {removeButton}
                    </div>
                </div>
            </LeftCard>
        )
    }
}

export default Coordinator
