import React, { Component } from 'react'
import Image from '../../../util/otherComponents/Image'
import UpdateContactForm from './UpdateContactForm'
import LeftCard from '../../../util/LeftCard'
import './Contact.css'

class Contact extends Component {
    handleEdit = updateObject => {
        this.props.update(this.props._id, updateObject)
    }

    handleDelete = () => {
        this.props.remove(this.props._id)
    }

    render() {
        let { name, phone, email, image } = this.props

        return (
            <LeftCard>
                <Image src={image} diameter="48px" name={name} />
                <div className="d-flex flex-column justify-content-center">
                    {name && <span className="Contact-name">{name}</span>}
                    {phone && <span className="Contact-info">{phone}</span>}
                    {email && <span className="Contact-info">{email}</span>}
                </div>
                <UpdateContactForm submit={this.handleDelete} />
            </LeftCard>
        )
    }
}

export default Contact
