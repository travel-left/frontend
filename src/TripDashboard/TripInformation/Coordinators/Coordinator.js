import React, { Component } from 'react'
import Image from '../../../util/otherComponents/Image'
import LeftCard from '../../../util/LeftCard'
import RemoveCoordinator from './RemoveCoordinator'
import './Coordinator.css'


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
            ) : <span style={{ width: '54px' }}></span>

        return (
            <LeftCard>
                <Image src={image} diameter="48px" name={name} />
                <div className="d-flex flex-column justify-content-center">
                    {name && <span className="Coordinator-name">{name}</span>}
                    {title && <span className="Coordinator-info">{title}</span>}
                    {phone && <span className="Coordinator-info">{phone}</span>}
                </div>
                {removeButton}
            </LeftCard>
        )
    }
}

export default Coordinator
